/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

import { Contract, Context} from 'fabric-contract-api';
import { stat } from 'fs';
import { stringify } from 'querystring';
import { Expense } from './asset';
import { ASSETS_LIST } from './assetsData';

async function savePrivateData(ctx: Context , assetKey: string) {
	const clientOrg: string = ctx.clientIdentity.getMSPID();
	const peerOrg: string = ctx.stub.getMspID();
	const collection: string = '_implicit_org_' + peerOrg;

	if (clientOrg === peerOrg) {
		const transientMap: Map<string, Uint8Array> = ctx.stub.getTransient();
		if (transientMap) {
			const properties: Uint8Array | undefined = transientMap.get('asset_properties');
			if (properties) {
				await ctx.stub.putPrivateData(collection, assetKey, properties);
			}
		}
	}
}

async function removePrivateData(ctx: Context , assetKey: string) {
	const clientOrg: string = ctx.clientIdentity.getMSPID();
	const peerOrg: string = ctx.stub.getMspID();
	const collection: string = '_implicit_org_' + peerOrg;

	if (clientOrg === peerOrg) {
		const propertiesBuffer: Uint8Array = await ctx.stub.getPrivateData(collection, assetKey);
		if (propertiesBuffer && propertiesBuffer.length > 0) {
			await ctx.stub.deletePrivateData(collection, assetKey);
		}
	}
}

async function addPrivateData(ctx: Context, assetKey: string, asset: any) {
	const clientOrg: string = ctx.clientIdentity.getMSPID();
	const peerOrg: string = ctx.stub.getMspID();
	const collection: string = '_implicit_org_' + peerOrg;;

	if (clientOrg === peerOrg) {
		const propertiesBuffer: Uint8Array = await ctx.stub.getPrivateData(collection, assetKey);
		if (propertiesBuffer && propertiesBuffer.length > 0) {
			const properties: any = JSON.parse(propertiesBuffer.toString());
			asset.asset_properties = properties;
		}
	}
}

async function readState(ctx: Context, id: string) {
	const assetBuffer: Uint8Array = await ctx.stub.getState(id); // get the asset from chaincode state
	if (!assetBuffer || assetBuffer.length === 0) {
		throw new Error(`The asset ${id} does not exist`);
	}
	const assetString: string = assetBuffer.toString();
	const asset: any = JSON.parse(assetString);

	return asset;
}

export class Draft extends Contract {
	balance: number;

    constructor() {
        super();
    }

	async AssetExists(ctx: Context, id: string) {
		// ==== Check if asset already exists ====
		let assetState = await ctx.stub.getState(id);
		return assetState && assetState.length > 0;
	}

	async Json(json:string){
		return JSON.parse(json);
	}

	// CreateAsset issues a new asset to the world state with given details.
	async CreateAsset(ctx: Context, id: string, amount: string, currency: string, type: string, concept: string,project: string,
		 owner: any, date: string, state: string = "PENDING", inspector: any = null, resolution: string = null): Promise<string | null> {
		
		const exists = await this.AssetExists(ctx, id);
		if (exists) {
			throw new Error(`The asset ${id} already exists`);
		}

		const expense: Expense = {
			ID: id,
			Amount: parseInt(amount),
			Concept: concept,
			Type: type,
			Project: project,
            Owner: owner,
			Currency: currency,
			Date: new Date(date),
			State: state,
			Resolution: resolution,
			Inspector: inspector,
		};
		await savePrivateData(ctx, id);
		const assetBuffer: Buffer = Buffer.from(JSON.stringify(expense));

		await ctx.stub.setEvent('CreateAsset', assetBuffer);
		if(state === "PENDING"){
			this.validateRequest(ctx, JSON.stringify(expense));
		}
		await ctx.stub.putState(id, assetBuffer);
		const indexName = "id~type~project~state";
		const indexKey = await ctx.stub.createCompositeKey(indexName, [expense.Owner, expense.Type, expense.Project, expense.State.toString()]); 
		await ctx.stub.putState(indexKey, Buffer.from('\u0000'));
		return assetBuffer.toString();
	}

	// TransferAsset updates the owner field of an asset with the given id in
	// the world state.
	async TransferAsset(ctx: Context, id: string, newOwner: string) {
		const asset: any = await readState(ctx, id);
		asset.Owner = newOwner;
		const assetBuffer: Buffer = Buffer.from(JSON.stringify(asset));
		await savePrivateData(ctx, id);

		ctx.stub.setEvent('TransferAsset', assetBuffer);
		return ctx.stub.putState(id, assetBuffer);
	}

	// ReadAsset returns the asset stored in the world state with given id.
	async ReadAsset(ctx: Context, id: string) {
		const asset = await readState(ctx, id);
		await addPrivateData(ctx, asset.ID, asset);

		return JSON.stringify(asset);
	}


	//UpdateAsset updates an existing asset in the world state with provided parameters.
	async ResolveAsset(ctx: Context, id: string, resolution: string, state: string, inspector: string): Promise<string| null>  {
		
		// if(roleType === "user"){
		// 	return null;
		// }
		const asset: any = await readState(ctx, id);
		asset.Resolution = resolution;
		asset.State = state;
		asset.Inspector = inspector;
		const assetBuffer: Buffer = Buffer.from(JSON.stringify(asset));
		await savePrivateData(ctx, id);

		ctx.stub.setEvent('UpdateAsset', assetBuffer);
		await ctx.stub.putState(id, assetBuffer);
		return assetBuffer.toString();
	}

	// DeleteAsset deletes an given asset from the world state.
	async DeleteAsset(ctx: Context, id: string) {
		const asset: any = await readState(ctx, id);
		const assetBuffer: Buffer = Buffer.from(JSON.stringify(asset));
		await removePrivateData(ctx, id);

		ctx.stub.setEvent('DeleteAsset', assetBuffer);
		return ctx.stub.deleteState(id);
	}


	async QueryAssetsByParams(ctx: Context,owner: string, type: string, project: string, state: string) {

		let queryString: any = {}
		queryString.selector = {};
		if(owner) queryString.selector.Owner = owner;
		if(type) queryString.selector.Type = type;
		if(project) queryString.selector.Project = project;
		if(state) queryString.selector.State = state;
		return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString)); //shim.success(queryResults);
	}

	async CountPending(ctx: Context) {
		let queryString: any = {}
		queryString.selector = {};
		queryString.selector.State = "PENDING";
		const result: any = await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString)); //shim.success(queryResults);
		return result.length;
	}

	async GetQueryResultForQueryString(ctx: Context, queryString: string) {

		let resultsIterator: any = await ctx.stub.getQueryResult(queryString);
		let results:{}[] = await this._GetAllResults(resultsIterator, false);

		return results;
	}

	async _GetAllResults(iterator: any, isHistory:boolean) {
		let allResults = [];
		let res = await iterator.next();
		while (!res.done) {
			if (res.value && res.value.value.toString()) {
				let jsonRes: {[key: string]: any} = {};
				console.log(res.value.value.toString('utf8'));
				if (isHistory && isHistory === true) {
					jsonRes.TxId = res.value.txId;
					jsonRes.Timestamp = res.value.timestamp;
					try {
						jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
					} catch (err) {
						console.log(err);
						jsonRes.Value = res.value.value.toString('utf8');
					}
				} else {
					jsonRes.Key = res.value.key;
					try {
						jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
					} catch (err) {
						console.log(err);
						jsonRes.Record = res.value.value.toString('utf8');
					}
				}
				allResults.push(jsonRes);
			}
			res = await iterator.next();
		}
		iterator.close();
		return allResults;
	}

	async _RequestExpense(expense: Expense): Promise<boolean>{
		await setTimeout(()=>{
		},60000);
		return true;
	}

	async GetAllAssets(ctx: Context): Promise<any> {
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        const allResults = await this._GetAllResults(iterator, false);
        return allResults;
	}

	async validateRequest(ctx: Context, jsonObj: string): Promise<string | null> {
		const obj: Expense = JSON.parse(jsonObj);
		
		const failedMsg: string[] = [];

		const b: Boolean = this.validateFields(obj, failedMsg) && this.validateBalance(obj,failedMsg) && this.validateType(obj,failedMsg)
		&& this.validateDate(obj,failedMsg);

		const SC: any = {
			inspector: "Smart Contract",
			name: "Draft",
		}

		if(b){
			return await this.ResolveAsset(ctx, obj.ID, "Asset pass all the requirements.", "APPROVED", JSON.stringify(SC));
		}else{
			return await this.ResolveAsset(ctx, obj.ID, failedMsg.join("\n "), "REJECTED", JSON.stringify(SC));
		}
	}

	validateFields(obj: Expense, failedMsg: string[]): boolean {
		if (!obj.Amount || !obj.Concept || !obj.Type || !obj.Project || !obj.Owner || !obj.Date) {
			failedMsg.push("Missing fields");
			return false;
		}
		return true;
	}

	validateBalance(obj: Expense, failedMsg: string[]): boolean {
		if(obj.Amount > this.balance){
			failedMsg.push("Insufficient balance");
			return false;
		}

		return true;
	}

	validateType(expense: Expense, failedMsg: string[]): boolean {
		if(expense.Type == "Material"){
			if(expense.Amount > 2000){
				failedMsg.push("Material expenses can't be greater than 2000");
			}
		}else if( expense.Type == "Equipment"){
			if(expense.Amount > 5000){
				failedMsg.push("Equipment expenses can't be greater than 5000");
			}
		}
		return true;
	}

	validateDate(expense: Expense,failedMsg: string[]): boolean {
		if(expense.Date > new Date()){
			failedMsg.push("Date can't be greater than today");
			return false;
		}
		return true;
	}
	



	async InitLedger(ctx: Context) {
		const expenses: Expense[] = [];
		for (const asset of ASSETS_LIST) {
			const expense: string = await this.CreateAsset(
				ctx,
				asset.ID,
				asset.Amount.toString(),
				asset.Currency,
				asset.Type,
				asset.Concept,
				asset.Project,
				asset.Owner,
				asset.Date.toISOString(),
				asset.State,
				asset.Inspector,
				asset.Resolution
			);
			
			expenses.push(JSON.parse(expense));
		}
		return expenses;
	}
	
}


