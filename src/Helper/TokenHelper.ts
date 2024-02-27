import jwt from "jsonwebtoken";
import { RSAHelper } from "./RSAHelper";
class TokenHelper extends RSAHelper {
  private readonly accesTokenExpTime: number = 600;
  private readonly refreshTokenExpTime: number = 60 * 60 * 24;
  constructor() {
    super();
  }
  //   --------------------Access Token---------------------------------------
  //   Generate access token
  public async generateAccessToken(
    payload: any
  ): Promise<{ accessToken: string; expiresTime: number }> {
    return new Promise<{ accessToken: string; expiresTime: number }>(
      async (resolve, reject) => {
        try {
          const rsaAlgo = this.rsaAlgo;
          const expiresTime = this.accesTokenExpTime;
          const privateKey: string = await this.privateKeyOne;
          const accessToken: any = jwt.sign(
            payload,
            { key: privateKey, passphrase: this.passphraseOne },
            { algorithm: rsaAlgo, expiresIn: expiresTime }
          );
          resolve({ accessToken, expiresTime });
        } catch (error) {
          reject(error);
        }
      }
    );
  }

  //   method for access token verification
  public async verifyAccessToken(token: string): Promise<boolean> {
    try {
      jwt.verify(token, await this.publicKeyOne, {
        algorithms: [this.rsaAlgo],
      });
      return true;
    } catch (err) {
      return false;
    }
  }
  //   method to get decode token data
  public async decodeAccessToken(token: string): Promise<any> {
    try {
      const decodedData: any = jwt.verify(token, await this.publicKeyOne, {
        algorithms: [this.rsaAlgo],
      });
      return decodedData;
    } catch (err) {
      return null;
    }
  }
  //   -----------------------------------refresh token------------------------------------------
  //   Generate refresh token
  public async generateRefreshToken(
    payload: any
  ): Promise<{ accessToken: string; expiresTime: number }> {
    return new Promise<{ accessToken: string; expiresTime: number }>(
      async (resolve, reject) => {
        try {
          const rsaAlgo = this.rsaAlgo;
          const expiresTime = this.refreshTokenExpTime;
          const privateKey: string = await this.privateKeyTwo;
          const accessToken: any = jwt.sign(
            payload,
            { key: privateKey, passphrase: this.passphraseTwo },
            { algorithm: rsaAlgo, expiresIn: expiresTime }
          );
          resolve({ accessToken, expiresTime });
        } catch (error) {
          reject(error);
        }
      }
    );
  }
  //   method for access token verification
  public async verifyRefreshToken(token: string): Promise<boolean> {
    try {
      jwt.verify(token, await this.publicKeyTwo, {
        algorithms: [this.rsaAlgo],
      });
      return true;
    } catch (err) {
      return false;
    }
  }
  public async decodeRefreshToken(token: string): Promise<any> {
    try {
      const decodedData: any = jwt.verify(token, await this.publicKeyTwo, {
        algorithms: [this.rsaAlgo],
      });
      return decodedData;
    } catch (err) {
      return null;
    }
  }
}

export const tokenHelper: TokenHelper = new TokenHelper();
