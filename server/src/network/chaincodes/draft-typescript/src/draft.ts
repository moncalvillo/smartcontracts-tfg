/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

import { Contract, Context} from 'fabric-contract-api';
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

	// CreateAsset issues a new asset to the world state with given details.
	async CreateAsset(ctx: Context, id: string, amount: string,type: string, concept: string,project: string, owner: string,   date: string) {
		
		
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
			Currency: "USD",
			Date: new Date(date),
			State: false,
		};
		await savePrivateData(ctx, id);
		const assetBuffer: Buffer = Buffer.from(JSON.stringify(expense));

		await ctx.stub.setEvent('CreateAsset', assetBuffer);
		// if(this.checkRequest(ctx, JSON.stringify(expense))){
		// 	ctx.stub.putState(id, assetBuffer);
		// }
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

	// UpdateAsset updates an existing asset in the world state with provided parameters.
	// async UpdateAsset(ctx: Context, id: string, color: string, size: string, owner: string, appraisedValue: string) {
	// 	const asset: any = await readState(ctx, id);
	// 	asset.Color = color;
	// 	asset.Size = size;
	// 	asset.Owner = owner;
	// 	asset.AppraisedValue = appraisedValue;
	// 	const assetBuffer: Buffer = Buffer.from(JSON.stringify(asset));
	// 	await savePrivateData(ctx, id);

	// 	ctx.stub.setEvent('UpdateAsset', assetBuffer);
	// 	return ctx.stub.putState(id, assetBuffer);
	// }

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
		queryString.selector.Owner = owner;
		if(type) queryString.selector.Type = type;
		if(project) queryString.selector.Project = project;
		if(state) queryString.selector.State = state==="true";
		return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString)); //shim.success(queryResults);
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

	checkRequest(ctx: Context, jsonObj: string): boolean {
		const obj: Expense = JSON.parse(jsonObj);
		if (!this.validateFields(obj)) {
			return false;
		}	
		if(!this.validateBalance()){
			return false
		}

		if(!this.validateType(obj)){
			return false
		}
		return true;
	}

	validateFields(obj: Expense): boolean {
		if (!obj.Amount || !obj.Concept || !obj.Type || !obj.Project || !obj.Owner || !obj.Date) {
			return false;
		}
		return true;
	}

	validateBalance(): boolean {
		return true;
	}

	validateType(expense: Expense): boolean {
		if(expense.Type == "Material"){
			if(expense.Amount > 2000){
				return false;
			}
		}else if( expense.Type == "Equipment"){
			if(expense.Amount > 5000){
				return false;
			}
		}
		return true;
	}

	validateDate(expense: Expense): boolean {
		if(expense.Date > new Date()){
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
				asset.Type,
				asset.Concept,
				asset.Project,
				asset.Owner,
				asset.Date.toISOString(),
			);
			expenses.push(JSON.parse(expense));
		}
		return expenses;
	}
	
}


