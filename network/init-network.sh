#!/bin/sh

curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh
./install-fabric.sh --fabric-version 2.4.4 --ca-version 1.5.5
docker pull --platform linux/x86_64 hyperledger/fabric-nodeenv:2.4

cp -r Chaincodes/ ./fabric-samples/Chaincodes/

cd fabric-samples
cd Chaincodes/draft-typescript
npm install

cd ../../test-network
chmod +x network.sh

./network.sh down
./network.sh up createChannel -ca -s couchdb
./network.sh deployCC -ccn draft -ccp ../Chaincodes/draft-typescript/ -ccl typescript