# Git repo

Decentralized app to interact with a blockchain network.
Hyperledger Fabric Test Network should be already deployed in the local machine and should modify the variable 'fabricSamplesPath' on both servers (Server and Oracle) declared on the file 'src/providers/Configuration.ts'. 

If required, aslo modify the 'network' variable declared in the same file corresponding to the folder name where the network is initialized. By default, it is 'test-network'.



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

```
$ cd oracle
$ docker-compose up [ -d ]
```
-d backgorund

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

Another bash, start the oracle dev server:
```
$ cd client
$ npm run dev
  Starting the development server...
```


