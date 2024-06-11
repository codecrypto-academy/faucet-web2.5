import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
const {ethereum} = window


function App() {
  const [cuenta, setCuenta] = useState(null)
  const [saldo, setSaldo] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function getSaldo(cuenta){ 
    const respuesta = await fetch(`http://localhost:3000/saldo/${cuenta}`)
    if (respuesta.status == "200"){
      const datos = parseFloat(await respuesta.text()) / 1e18;

      setSaldo(datos)
    }
  }
  
  async function enviarETH(){   
    setIsLoading(true)
    const respuesta = await fetch(`http://localhost:3000/enviar/${cuenta}`)
    if (respuesta.status == "200"){
      const datos = await respuesta.json() 
      await getSaldo(cuenta)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    ethereum.request({ method: 'eth_requestAccounts' }).then(cuentas => {
      setCuenta(cuentas[0])
      getSaldo(cuentas[0])
      ethereum.on("accountsChanged", (cuentas) => {
        setCuenta(cuentas[0])
        getSaldo(cuentas[0])
      })
    })
  }, [])

  return (
    <div className=" main-container text-center">
      <h1 className="text-primary display-1 pt-5" style={{ fontSize: '7rem' }}>
        Go Ethereum Local Network Faucet
      </h1>
      <div style={{ paddingTop: '6rem' }}>
        <h2 className="mb-3" style={{ fontSize: '2.8rem' }}>Connected Address</h2>
        <p className="h4">{cuenta}</p>
        <h2 className="mb-3" style={{ fontSize: '2.8rem' }}>Balance</h2>
        <p className="h4">{saldo} ETH</p>
        <button
          onClick={enviarETH}
          className="btn btn-primary btn-block btn-lg mt-4 p-3"
          disabled={isLoading}
        >
          {isLoading ? "Procesando transacción..." : "Send 10 ETH"}
        </button>
      </div>
    </div>
  )
}

export default App