import bcrypt from "bcryptjs";
class PasswordHelper {
  private saltRound: number = 10;
  public async hashPassword(password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      bcrypt.hash(password, this.saltRound, (err, hash) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(hash);
      });
    });
  }
  public async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  }
}
export const passwordHelper: PasswordHelper = new PasswordHelper();
