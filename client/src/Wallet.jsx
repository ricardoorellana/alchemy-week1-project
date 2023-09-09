import server from "./server";
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';
import { useEffect } from "react";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  function onChange(evt) {
    const privateKey = evt.target.value;

    setPrivateKey(privateKey);
    setAddress(toHex(secp256k1.getPublicKey(privateKey)).slice(-40));
  }

  useEffect(() => {
    const getBalance = async () => {
        if (address) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
        } else {
          setBalance(0);
        }
      }

      getBalance();
  }, [privateKey])

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key (dangerous only learning purpose)
        <input placeholder="Copy an past private key" value={privateKey} onChange={onChange}></input>
      </label>

      <p>Public address: {address.slice(0, 10)}...</p>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
