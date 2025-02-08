import fs from "fs";
import path from "path";
import { Algorithm } from "jsonwebtoken";
export abstract class RSAHelper {
  protected privateKeyOne: any;
  protected publicKeyOne: any;
  protected privateKeyTwo: any;
  protected publicKeyTwo: any;
  protected readonly passphraseOne: string = process.env
    .PASSPHRASE_ONE as string;
  protected readonly passphraseTwo: string = process.env
    .PASSPHRASE_TWO as string;
  protected readonly rsaAlgo: Algorithm = "RS256";
  constructor() {
    if (!this.passphraseOne) {
      console.error(
        "password required for pem file need to attach in .env file"
      );
    }
    (async () => {
      const { privateKOne, publicKOne } = await this.loadRsaKeyOne();
      const { privateKTwo, publicKTwo } = await this.loadRsaKeyTwo();
      this.privateKeyOne = privateKOne;
      this.publicKeyOne = publicKOne;
      this.privateKeyTwo = privateKTwo;
      this.publicKeyTwo = publicKTwo;
    })();
  }
  // load public key and private key from local storage
  private loadRsaKeyOne(): Promise<{
    privateKOne: string;
    publicKOne: string;
  }> {
    return new Promise<{ privateKOne: any; publicKOne: any }>(
      (resolve, reject) => {
        try {
          const pemRelativePath: string = `${
            (process.env.ROOT_DIR as string) || "build"
          }/service/pem`;
          const pathToprivateKeyOne: string = path.join(
            process.cwd(),
            pemRelativePath,
            "privateKeyOne.pem"
          );
          const pathTopublicKeyOne: string = path.join(
            process.cwd(),
            pemRelativePath,
            "publicKeyOne.pem"
          );
          const privateKiOne: string = fs.readFileSync(
            pathToprivateKeyOne,
            "utf8"
          );
          const publicKiOne: string = fs.readFileSync(
            pathTopublicKeyOne,
            "utf8"
          );
          resolve({
            privateKOne: privateKiOne,
            publicKOne: publicKiOne,
          });
        } catch (err) {
          reject(err);
          console.error("Error loading private key:", err);
        }
      }
    );
  }
  // loading private key two .pem files from local storage
  private loadRsaKeyTwo(): Promise<{
    privateKTwo: string;
    publicKTwo: string;
  }> {
    return new Promise<{ privateKTwo: any; publicKTwo: any }>(
      (resolve, reject) => {
        try {
          const pemRelativePath: string = `${
            (process.env.ROOT_DIR as string) || "build"
          }/service/pem`;
          const pathToprivateKeyOne: string = path.join(
            process.cwd(),
            pemRelativePath,
            "privateKeyTwo.pem"
          );
          const pathTopublicKeyOne: string = path.join(
            process.cwd(),
            pemRelativePath,
            "publicKeyTwo.pem"
          );
          const privateKiTwo: string = fs.readFileSync(
            pathToprivateKeyOne,
            "utf8"
          );
          const publicKiTwo: string = fs.readFileSync(
            pathTopublicKeyOne,
            "utf8"
          );
          resolve({
            privateKTwo: privateKiTwo,
            publicKTwo: publicKiTwo,
          });
        } catch (err) {
          reject(err);
          console.error("Error loading private key:", err);
        }
      }
    );
  }
}
