/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

import FabricCAServices from "fabric-ca-client";
import { Contract, Gateway, Identity, Network, Wallet, Wallets } from "fabric-network";

import fs from 'fs';
import path from 'path';
import config from "../providers/Configuration";
const fabricSamplePath = config.fabricSamplePath;
const networkPath = config.network
const contractName = config.contractName;

export const buildCCPOrg1 = () => {
	// load the common connection configuration file
	const ccpPath: string = path.join(fabricSamplePath,networkPath,'organizations','peerOrganizations','org1.example.com', 'connection-org1.json');
	const fileExists: boolean = fs.existsSync(ccpPath);
	if (!fileExists) {
		throw new Error(`no such file or directory: ${ccpPath}`);
	}
	const contents:string = fs.readFileSync(ccpPath, 'utf8');

	// build a JSON object from the file contents
	const ccp:any = JSON.parse(contents);

	console.log(`Loaded the network configuration located at ${ccpPath}`);
	return ccp;
};

export const buildCCPOrg2 = () => {
	// load the common connection configuration file
	const ccpPath: string = path.join(fabricSamplePath, networkPath,'organizations','peerOrganizations','org2.example.com', 'connection-org2.json');
	const fileExists = fs.existsSync(ccpPath);
	if (!fileExists) {
		throw new Error(`no such file or directory: ${ccpPath}`);
	}
	const contents = fs.readFileSync(ccpPath, 'utf8');

	// build a JSON object from the file contents
	const ccp = JSON.parse(contents);

	console.log(`Loaded the network configuration located at ${ccpPath}`);
	return ccp;
};

export const buildWallet = async ( walletPath: string) => {
	// Create a new  wallet : Note that wallet is for managing identities.
	let wallet;
	if (walletPath) {
		wallet = await Wallets.newFileSystemWallet(walletPath);
		console.log(`Built a file system wallet at ${walletPath}`);
	} else {
		wallet = await Wallets.newInMemoryWallet();
		console.log('Built an in memory wallet');
	}

	return wallet;
};

export const prettyJSONString = (inputString: string) => {
	if (inputString) {
		 return JSON.stringify(JSON.parse(inputString), null, 2);
	}
	else {
		 return inputString;
	}
}


const adminUserId = 'admin';
const adminUserPasswd = 'adminpw';

/**
 *
 * @param {*} FabricCAServices
 * @param {*} ccp
 */
export const buildCAClient = ( ccp: any, caHostName: string) => {
	// Create a new CA client for interacting with the CA.
	const caInfo = ccp.certificateAuthorities[caHostName]; //lookup CA details from config
	const caTLSCACerts = caInfo.tlsCACerts.pem;
	const caClient: FabricCAServices = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

	console.log(`Built a CA Client named ${caInfo.caName}`);
	return caClient;
};

export const enrollAdmin = async (caClient: FabricCAServices, wallet: Wallet, orgMspId: string) => {
	try {
		// Check to see if we've already enrolled the admin user.
		const identity = await wallet.get(adminUserId);
		if (identity) {
			throw new Error('An identity for the admin user already exists in the wallet');
		}

		// Enroll the admin user, and import the new identity into the wallet.
		const enrollment = await caClient.enroll({ enrollmentID: adminUserId, enrollmentSecret: adminUserPasswd });
		const x509Identity = {
			credentials: {
				certificate: enrollment.certificate,
				privateKey: enrollment.key.toBytes(),
			},
			mspId: orgMspId,
			type: 'X.509',
		};
		await wallet.put(adminUserId, x509Identity);
		console.log('Successfully enrolled admin user and imported it into the wallet');
        
        return wallet.get('admin');
	} catch (error: any) {
		console.error(`Failed to enroll admin user : ${error}`);
        throw new Error(error.message);
	}
};

export const registerAndEnrollUser = async (caClient: FabricCAServices, wallet: Wallet, orgMspId: string, userId:string, password:string, affiliation: string) => {
	try {
		// Check to see if we've already enrolled the user
		const userIdentity = await wallet.get(userId);
		if (userIdentity) {
			throw new Error(`An identity for the user ${userId} already exists in the wallet`);
		}

		// Must use an admin to register a new user
		const adminIdentity = await wallet.get(adminUserId);
		if (!adminIdentity) {
			throw new Error('An identity for the admin user does not exist in the wallet');
		}

		// build a user object for authenticating with the CA
		const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
		const adminUser = await provider.getUserContext(adminIdentity, adminUserId);

		// Register the user, enroll the user, and import the new identity into the wallet.
		// if affiliation is specified by client, the affiliation value must be configured in CA
		const secret = await caClient.register({
			affiliation: affiliation,
			enrollmentID: userId,
            enrollmentSecret: password,
			role: 'client'
		}, adminUser);
		const enrollment = await caClient.enroll({
			enrollmentID: userId,
			enrollmentSecret: secret
		});
		const x509Identity = {
			credentials: {
				certificate: enrollment.certificate,
				privateKey: enrollment.key.toBytes(),
			},
			mspId: orgMspId,
			type: 'X.509',
		};
		await wallet.put(userId, x509Identity);
		console.log(`Successfully registered and enrolled user ${userId} and imported it into the wallet`);
        return wallet.get(userId);
	} catch (error:any) {
        throw new Error(error.message);
	}
};


export const connectToContract = async (owner: string, channel: string) => {
	
	const ccp: any = buildCCPOrg1();
    const ccp2: any = buildCCPOrg2();
	const walletPath: string = path.join(fabricSamplePath, networkPath, 'wallets');
	const wallet: Wallet = await buildWallet(walletPath);

	const userIdentity: Identity | undefined = await wallet.get(owner);
	if (!userIdentity) {
		throw new Error(`An identity for the user ${owner} does not exist in the wallet`);
	}
	
	const gateway: any = new Gateway();
	await gateway.connect(ccp, { wallet,
		identity: userIdentity,
		discovery: { enabled: true, asLocalhost: true } 
	});
	const network: Network = await gateway.getNetwork(channel);

	const contract: Contract = network.getContract(contractName);

	return {contract, userIdentity, network, gateway, wallet, ccp};
}

