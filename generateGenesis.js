const fs = require("fs")
function generateGenesis(NETWORK_CHAINID, CUENTA, BALANCE, CUENTAS_ALLOC, NETWORK_DIR) {
    const timestamp = Math.round(((new Date()).getTime() / 1000)).toString(16)
    // leemos la plantilla del genesis
    let genesis = JSON.parse(fs.readFileSync('genesisbase.json').toString())

    // genesis.timestamp = `0x${timestamp}`
    genesis.config.chainId = NETWORK_CHAINID
    genesis.extraData = `0x${'0'.repeat(64)}${CUENTA}${'0'.repeat(130)}`


    genesis.alloc = CUENTAS_ALLOC.reduce((acc, item) => {
        acc[item] = { balance: BALANCE }
        return acc
    }, {})


    fs.writeFileSync(`${NETWORK_DIR}/genesis.json`, JSON.stringify(genesis))

}
const BALANCE = "0x200000000000000000000000000000000000000000000000000000000000000"
generateGenesis(8888,
    "501b767A6d3F0A7ec1Ea7A144F923bB41503dFF5", BALANCE,
    [
        "501b767A6d3F0A7ec1Ea7A144F923bB41503dFF5",
        "0x7F655e80165f08193386d97beFE06d3fA3c05fFD",
        "0xa56Ae8B9cFd6BC0D38DB7C6B840961668C24B0B3"
    ], ".")