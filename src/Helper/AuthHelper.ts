import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

class AuthHelper {
  private privateKey: any;
  private publicKey: any;
  private readonly passphrase =
    (process.env.PASSPHRASE as string) || "passphare here";
  private readonly accesTokenExpTime: number = 600;
  private rsaAlgo: string = "RS256";
  constructor() {
    (async () => {
      const { privateK, publicK } = await this.loadRsaKey();
      this.privateKey = privateK;
      this.publicKey = publicK;
    })();
  }
  public temp() {
    console.log(this.privateKey);
  }

  private loadRsaKey(): Promise<{ privateK: string; publicK: string }> {
    return new Promise<{ privateK: any; publicK: any }>((resolve, reject) => {
      try {
        const pemRelativePath: string = `${
          (process.env.ROOT_DIR as string) || "build"
        }/service/pem`;
        const pathToPrivateKey: string = path.join(
          process.cwd(),
          pemRelativePath,
          "privateKey.pem"
        );
        const pathToPublicKey: string = path.join(
          process.cwd(),
          pemRelativePath,
          "publicKey.pem"
        );
        const privateKi: string = fs.readFileSync(pathToPrivateKey, "utf8");
        const publicKi: string = fs.readFileSync(pathToPublicKey, "utf8");
        resolve({
          privateK: privateKi,
          publicK: publicKi,
        });
      } catch (err) {
        reject(err);
        console.error("Error loading private key:", err);
      }
    });
  }

  //   method to get access token
  public async signAccessToken(
    payload: any
  ): Promise<{ accessToken: string; expiresTime: number }> {
    return new Promise<{ accessToken: string; expiresTime: number }>(
      async (resolve, reject) => {
        try {
          const expiresTime = this.accesTokenExpTime;
          const privateKey: string = await this.privateKey;
          const accessToken: any = jwt.sign(
            payload,
            { key: privateKey, passphrase: this.passphrase },
            { algorithm: "RS256", expiresIn: expiresTime }
          );
          resolve({ accessToken, expiresTime });
        } catch (error) {
          reject(error);
        }
      }
    );
  }
  //   method for token verification
  public async verifyToken(token: string): Promise<boolean> {
    try {
      jwt.verify(token, await this.publicKey, {
        algorithms: ["RS256"],
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  //   method to get decode token
  public async decodeToken(token: string): Promise<any> {
    try {
      const decodedData: any = jwt.verify(token, await this.publicKey, {
        algorithms: ["RS256"],
      });
      return decodedData;
    } catch (err) {
      return null;
    }
  }
}

export const authHelper: AuthHelper = new AuthHelper();
