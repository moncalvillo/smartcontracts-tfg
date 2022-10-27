# Git repo

Decentralized app to interact with a blockchain network.

In this repository, you can find a script under the "Network" folder which is going to download and launch the Hyperledger Fabric network and install the smart contract. You can use your own network but be sure to configure the .env files correctly for each service.
You can fill the .env-template and change its name.

# Network launch
If you want to launch a new Hyperledger Fabric test network, you need to access to Network folder, be sure there are only a script, a Chaincodes folder and the gitignore file, and execute the script.
```
$ cd network
$ ./init-network.sh
```
This script is going to download all the samples, binaries and docker images from Hyperledger Fabric. It will delete the exisiting network if it exists and deploy a new one,and install the chaincode defined in Chaincodes folder.

## Installation

Install all npm the dependencies:
```
$ cd server
$ npm install
```

```
$ cd client
$ npm install
```

```
$ cd oracle
$ npm install
```

## Deploy databases

```
$ cd server
$ docker-compose up [ -d ] 
```
-d background

## Start servers

Start server:
```
$ cd server
$ npm run dev
  Server starting...
  Enabling CORS...
  Server listening to port 8080
```

Another bash, start the react dev server:
```
$ cd client
$ npm start
  Starting the development server...
```
If you want to launch the react application with HTTPS to enable OAuth:
cmd.exe
```
$ set HTTPS=true&&npm start
  Starting the development server...
```
Powershell: 
```
$ ($env:HTTPS = "true") -and (npm start)
  Starting the development server...
```
Bash: 
```
$ HTTPS=true npm start
  Starting the development server...
```

Another bash, start the oracle dev server:
```
$ cd client
$ npm run dev
  Oracle starting
  Enabling CORS...
  Server listening to port 8081
```

The application will be launched at 


