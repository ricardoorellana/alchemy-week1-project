const secp = require('ethereum-cryptography/secp256k1');
const utils = require('ethereum-cryptography/utils');

const createPrivateKey = () => {
  return utils.toHex(secp.secp256k1.utils.randomPrivateKey());
}

const getPublicKey = (privateKey) => {
  return utils.toHex(secp.secp256k1.getPublicKey(privateKey)).slice(-40);
}

const privateKey = createPrivateKey();
console.log(`Private key: ${privateKey}` );

const publicKey = getPublicKey(privateKey);
console.log(`Public key: ${publicKey}`);