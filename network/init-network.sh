#!/bin/sh

# ./install-fabric.sh --fabric-version 2.4.6 --ca-version 1.5.5


cd fabric-samples
cd Chaincodes/draft-typescript
npm install

cd ../../test-network
chmod +x network.sh
export PATH=/usr/network/fabric-samples/bin:$PATH
export FABRIC_CFG_PATH=/usr/network/fabric-samples/config/

./network.sh down
./network.sh up createChannel -ca -s couchdb
# ./network.sh deployCC -ccn draft -ccp ../Chaincodes/draft-typescript/ -ccl typescript