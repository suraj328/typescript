export interface ValidState {
  valid: boolean;
  error: string;
}
// export class Validator {
  
// }



export class Validator {
  private error: string;
  private valid: boolean;
  private passwordRegex: RegExp;
  private emailRegex: RegExp;
  // valid extension array
  private validImageExtension: string[];
  private validSvgExtension: string[];
  private validAudioExtension: string[];
  private validCompressExtension: string[];
  private validArtWorkExtension: string[];
  // valid boder
  private validColor: string;
  private errorColor: string;
  private waningColor: string;
  // max file size
  private maxZipFileSize: number;
  constructor() {
    this.error = "";
    this.valid = false;
    this.passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.validImageExtension = ["image/jpg", "image/png", "image/jpeg"];
    this.validArtWorkExtension = ["image/jpg", "image/jpeg"];
    this.validSvgExtension = ["image/svg+xml"];
    this.validAudioExtension = ["audio/mpeg"];
    this.validCompressExtension = [
      "application/x-zip-compressed",
      "application/x-compressed",
    ];
    // valid color
    this.waningColor = "yellow";
    this.validColor = "green";
    this.errorColor = "red";
    // file size
    this.maxZipFileSize = 2048;
  }
  // getter for getting valid extension
  public getImageValidExtension = (): string[] => {
    return this.validImageExtension;
  };
  public getSvgValidExtension = (): string[] => {
    return this.validSvgExtension;
  };
  public getAudioValidExtension = (): string[] => {
    return this.validAudioExtension;
  };

  public getCompresValidExtension = (): string[] => {
    return this.validCompressExtension;
  };
  public getArtworkValidExtension = (): string[] => {
    return this.validArtWorkExtension;
  };

  // getter for validation color
  public getValidColor = (): string => {
    return this.validColor;
  };
  public getWarningColor = (): string => {
    return this.waningColor;
  };
  public getErrorColor = (): string => {
    return this.errorColor;
  };
  // get max allowed size
  public getMaxZipFileSize = (): number => {
    return this.maxZipFileSize;
  };

  //   method for setting resposne
  private response = (status: boolean, err: string): ValidState => {
    return {
      error: err,
      valid: status,
    };
  };

  public isNotEmptyField = (value: string, err: string): ValidState => {
    if (value.trim().length === 0) {
      this.error = err;
      this.valid = false;
    } else {
      this.error = "";
      this.valid = true;
    }
    return this.response(this.valid, this.error);
  };
  
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  public validInputLength(input: string | number, length: number): boolean {
    const str = String(input).trim();
    return str.length === length;
  }
  static containsSymbols(input: string): boolean {
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>/'";]/;
    return symbolRegex.test(input);
  }
  static containsOnlyNumbers(input: string): boolean {
    const numberRegex = /^[0-9]+$/;
    const str = String(input).trim();
    return numberRegex.test(str);
  }
  public containsOnlyLetters(input: string): boolean {
    const letterRegex = /^[a-zA-Z]+$/;
    return letterRegex.test(input);
  }
  public smallerThanValidInputLength(input: string | number, length: number): boolean {
    const str = String(input).trim();
  
    return str.length < length  ;
  }
  public isEmptyString(input: string): boolean {
    return String(input).trim() === "" ? true : false;
  }

  // static onlyLettersHavingLen(input: string): boolean {
  //   const letterRegex = /^[a-zA-Z]+$/;
  //   return letterRegex.test(input);
  // }

  // validate image
}
