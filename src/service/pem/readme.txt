cmd to generate pem-key

	private:openssl genrsa -aes256 -out private-key.pem 2048
	public:openssl rsa -in private-key.pem -pubout -out public-key.pem


//generating using nodejs
import crypto from 'crypto';

const passphrase = 'your_passphrase_here';

// Generate RSA keys with a passphrase
private generateRsaKeyPair(
    passphrase: string
  ): Promise<{ privateKey: string; publicKey: string }> {
    // Generate RSA keys with the passphrase
    return new Promise<{ privateKey: any; publicKey: any }>(
      (resolve, reject) => {
        crypto.generateKeyPair(
          "rsa",
          {
            modulusLength: 2048,
            publicKeyEncoding: { type: "spki", format: "pem" },
            privateKeyEncoding: {
              type: "pkcs8",
              format: "pem",
              cipher: "aes-256-cbc",
              passphrase: passphrase,
            },
          },
          (err, publicKey, privateKey) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                privateKey: privateKey,
                publicKey: publicKey,
              });
            }
          }
        );
      }
    );
  }
