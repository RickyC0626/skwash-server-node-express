import { HTTPRequest, HTTPResponse } from "../http";

export interface HTTPController {
  processRequest(request?: Partial<HTTPRequest>): Promise<HTTPResponse>;
}
