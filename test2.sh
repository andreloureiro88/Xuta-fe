#!/bin/bash

# script expects an optional keypair file to init a token mint
# if not provided, it will check if it exists under mint-keypair.json
# if not it will create a new keypair under mint-keypair.json

# then it creates a token mint
# 1- creates a token (default wallet is mint authority (~/.config/solana/id.json))
# 2- creates a token account for default wallet 
# 3- mints 1000000000 tokens to the token account


# arg 1: token mint keypair file
MINT_KEYPAIR_FILE=$1

#if file doesnt exist, create keypair
if [ ! -f "$MINT_KEYPAIR_FILE" ]; then
    echo "Keypair file not provided"
    MINT_KEYPAIR_FILE="mint-keypair.json"

fi

if [ ! -f "$MINT_KEYPAIR_FILE" ]; then
    echo "Keypair file does not exist, creating new keypair"
    solana-keygen new --outfile mint-keypair.json -s --no-bip39-passphrase
fi

MINT_ADDRESS=$(solana address -k $MINT_KEYPAIR_FILE)

# create a token mint
spl-token create-token $MINT_KEYPAIR_FILE --decimals 6 -ul 

# Create token account using the mint address
spl-token create-account $MINT_ADDRESS -ul

spl-token mint $MINT_ADDRESS 1000000000 -ul 