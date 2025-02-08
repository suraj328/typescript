import crypto from "crypto";
const passphrase = "your_passphrase_here";
// Generate RSA keys with a passphrase
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
    cipher: "aes-256-cbc",
    passphrase: passphrase,
  },
});
console.log("Public Key:", publicKey);
console.log("---------------");
console.log("Private Key:", privateKey);
