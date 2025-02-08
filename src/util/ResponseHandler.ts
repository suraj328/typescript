import httpStatusCodes from "../config/httpConfig";
import Res from "./res";

export class ResponseHandler {
  public sendResponse({
    success,
    message,
    error,
    code,
    data,
    affectedId,
  }: Res): Res {
    const status: string =
      httpStatusCodes[code as keyof typeof httpStatusCodes];
    return { success, message, error, code, status, data, affectedId };
  }
}