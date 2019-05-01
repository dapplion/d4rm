#!/bin/bash

# Use this script to automatically deploy the contract on all testnets
# The account in the truffle config file must have test ETH on all testnets

for network in development ropsten kovan rinkeby goerli
do
   echo "Deploying at network $network"
   truffle exec deploy/keylessDeploy.js --network $network
done