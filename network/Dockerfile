FROM ubuntu:latest
ENV NODE_VERSION=16.17.0

WORKDIR /usr/network 
## Install dependencies
RUN apt-get update  && apt-get install -y curl git docker docker.io docker-compose
RUN apt install -y build-essential

## Install Node
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

## Install Hyperledger Fabric Binaries
# RUN curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.4.6 1.5.5
COPY ./fabric-samples/ ./fabric-samples 

WORKDIR /usr/network
COPY ./Chaincodes/ ./fabric-samples/Chaincodes
## Install chaincode dependencies


WORKDIR /usr/network/fabric-samples/test-network
RUN ls -a
RUN chmod +x network.sh

WORKDIR /usr/network
COPY init-network.sh ./init-network.sh
RUN chmod +x init-network.sh
CMD ["./init-network.sh"]

