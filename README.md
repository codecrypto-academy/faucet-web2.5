```docker run \
     --rm \
     -v ${PWD}:/data ethereum/client-go account \
     new --password /data/password.txt --datadir /data/data```

Cambiar parametros del generateGenesis utilizando la cuenta que ha sido creada (Faucet), además de incluir posteriormente las cuentas de nuestro metamask. **Importante no añadir el 0x delante**
```ts
generateGenesis(3333,
    "cuentaDelFaucet", BALANCE,
    [
        "cuentadelFaucet",
        "f6336be0205D2F03976878cc1c80E60C66C86C50", // Aquí parece que así funciona y con el 0x no
        "cuenta2",
        
    ], ".")```

```docker run \
   --rm \
   -v ${PWD}/data:/data \
   -v ${PWD}/genesis.json:/genesis.json \
   ethereum/client-go init \
   --datadir /data /genesis.json```


Cambiar las address de unlock y miner.etherbase por las del Faucet. Si es un entorno de windows quitar la parte de `--platform linux/amd64`

```docker run  -p 8545:8545 \
    --platform linux/amd64 \
    --rm \
    -d \
    --name eth-node1 \
    -v ${PWD}/data:/data \
    -v ${PWD}/password.txt:/password.txt \
    ethereum/client-go \
    --nodiscover  \
    --allow-insecure-unlock \
    --datadir /data \
    --http \
    --http.api personal,admin,eth,net,web3 \
    --http.addr 0.0.0.0 \
    --http.port 8545 \
    --http.corsdomain="*" \
    --unlock 37fae9ead39b4b5ad53ef7982f6b4e6cec8d9d3a \
    --password /password.txt   \
    --mine \
    --miner.etherbase 37fae9ead39b4b5ad53ef7982f6b4e6cec8d9d3a```