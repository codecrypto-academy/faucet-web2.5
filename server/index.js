const ex = require("express")
const Web3 = require("web3")
require("dotenv").config() //Toma el fichero .env y crea variables accesibles por process.env.nombre_var
const cors = require("cors")

const ap = ex()
ap.use(cors())
const web3 = new Web3("http://localhost:8545")

ap.get("/ping", (req, res) =>{
    res.send({fecha: new Date().toISOString()})
})

ap.get("/saldo/:cuenta", async (req, res) =>{
    const saldo = await web3.eth.getBalance(req.params.cuenta)
    // res.send({ saldo })
    res.send(saldo)
})

ap.get("/enviar/:cuenta", async (req, res) =>{
    //Crear y firmar tx de ETH
    const tx = await web3.eth.accounts.signTransaction({
        to: req.params.cuenta,
        from: process.env.ADDRESS,
        value: 10E18, //10 ETH en GWEI
        gas: 2000000 //en GWEI
    }, '0x' + process.env.PRIVATE_KEY)
    //Enviar la tx al proveedor (http://localhost:8545)
    const txSended = await web3.eth.sendSignedTransaction(
        tx.rawTransaction
        )
    //Enviar el nuevo saldo
    const saldo = await web3.eth.getBalance(req.params.cuenta)
    res.send({ saldoActualizado:saldo })
})

ap.listen(3000, () => {
    console.log("listen")
})