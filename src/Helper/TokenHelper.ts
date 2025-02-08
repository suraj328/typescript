import jwt from "jsonwebtoken";
import { RSAHelper } from "./RSAHelper";
class TokenHelper extends RSAHelper {
  private readonly accesTokenExpTime: number = 3600000;
  private readonly refreshTokenExpTime: number = 1296000000;
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
          // console.log(accessToken);
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
  ): Promise<{ refreshToken: string; expiresTime: number }> {
    return new Promise<{ refreshToken: string; expiresTime: number }>(
      async (resolve, reject) => {
        try {
          const rsaAlgo = this.rsaAlgo;
          const expiresTime = this.refreshTokenExpTime;
          const privateKey: string = await this.privateKeyTwo;
          const refreshToken: any = jwt.sign(
            payload,
            { key: privateKey, passphrase: this.passphraseTwo },
            { algorithm: rsaAlgo, expiresIn: expiresTime }
          );
          resolve({ refreshToken, expiresTime });
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

  // validate token
  // public async validateToken({
  //   res,
  //   accessToken,
  //   refreshToken,
  // }: {
  //   res?: any;
  //   accessToken: string;
  //   refreshToken: string;
  // }): Promise<{
  //   status: boolean;
  //   naccessToken: string;
  //   nrefreshToken: string;
  //   role: string;
  // }> {
  //   return new Promise<{
  //     status: boolean;
  //     naccessToken: string;
  //     nrefreshToken: string;
  //     role: string;
  //   }>(async (resolve, reject) => {
  //     try {
  //       const validAccessToken: boolean = await this.verifyAccessToken(
  //         accessToken
  //       );
  //       const validRefreshToken: boolean = await this.verifyRefreshToken(
  //         refreshToken
  //       );
  //       if (validRefreshToken || validAccessToken) {
  //         var userId, userDetails;
  //         if (validAccessToken) {
  //           const { id } = await this.decodeAccessToken(accessToken);
  //           userId = id;
  //         }
  //         if (validRefreshToken) {
  //           const { id } = await this.decodeRefreshToken(refreshToken);
  //           userId = id;
  //         }
  //         // if (userId) {
  //         //   const systemUserService: SystemUserService =
  //         //     new SystemUserService();
  //         //   userDetails = await systemUserService.findByPk({ id: userId });
  //         // }
  //         // const roleArray: string[] =
  //         //   userDetails!.system_user_system_access!.map(
  //         //     (data) => data.system_role!.systemRoleName
  //         //   );
  //         const newAccessToken = await this.generateAccessToken({
  //           activeStatus: true,
  //           id: userId,
  //           role: "user",
  //           verificationStatus: true,
  //         });
  //         const newRefreshToken = await this.generateRefreshToken({
  //           id: userId,
  //           role: "user",
  //         });
  //         const { activeStatus, verificationStatus, role } =
  //           await this.decodeAccessToken(newAccessToken.accessToken);
  //         if (activeStatus && verificationStatus) {
  //           if (res) {
  //             await cookieHelper.setCookie({
  //               res: res,
  //               cookieName: "accessToken",
  //               cookieValue: newAccessToken.accessToken,
  //               expTime: this.accesTokenExpTime,
  //             });
  //             await cookieHelper.setCookie({
  //               res: res,
  //               cookieName: "refreshToken",
  //               cookieValue: newRefreshToken.refreshToken,
  //               expTime: this.refreshTokenExpTime,
  //             });
  //           }
  //           resolve({
  //             status: true,
  //             naccessToken: newAccessToken.accessToken,
  //             nrefreshToken: newRefreshToken.refreshToken,
  //             role: role,
  //           });
  //         }
  //         resolve({
  //           status: false,
  //           naccessToken: "",
  //           nrefreshToken: "",
  //           role: "",
  //         });
  //       } else {
  //         resolve({
  //           status: false,
  //           naccessToken: "",
  //           nrefreshToken: "",
  //           role: "",
  //         });
  //       }
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // }
}

export const tokenHelper: TokenHelper = new TokenHelper();
