# Git repo

Decentralized app to interact with a blockchain network using Truffle, React and Hyperledger Fabric.


## Installation

Start the react dev server.

```

$ cd server
$ npm run dev
  Server starting...
  Enabling CORS...
  Server listening to port 8080
```

Another bash:
```
$ cd client
$ npm start
  Starting the development server...
```

## FAQ

- __How do I use this with Ganache (or any other network)?__

  The Truffle project is set to deploy to Ganache by default. If you'd like to change this, it's as easy as modifying the Truffle config file! [Check out our documentation on adding network configurations](https://trufflesuite.com/docs/truffle/reference/configuration/#networks). From there, you can run `truffle migrate` pointed to another network, restart the React dev server, and see the change take place.

- __Where can I find more resources?__

  This Box is a sweet combo of [Truffle](https://trufflesuite.com) and [Create React App](https://create-react-app.dev). Either one would be a great place to start!
