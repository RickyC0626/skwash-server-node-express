import { Request, Response } from "express";
import { HTTPController } from "../controllers/HTTPController";
import { HTTPRequest, HTTPResponse, HTTPStatus } from "../http";

// Based on Dev Mastery's comments API, express callback
// https://github.com/dev-mastery/comments-api/blob/master/src/express-callback/index.js

export default function initExpressCallback(controller: HTTPController) {
  return async (req: Request, res: Response) => {
    // Convert Express request to framework-agnostic format
    const httpRequest: HTTPRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("Referer"),
        "User-Agent": req.get("User-Agent"),
      },
    };

    // Pass request data to HTTP controller for further processing
    await controller
      .processRequest(httpRequest)
      .then((httpResponse: HTTPResponse) => {
        // Send response back to client in JSON format
        // w/ proper headers, status code, and body payload
        if (httpResponse.headers) res.set(httpResponse.headers);
        res.type("application/json");
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch(() =>
        res.status(HTTPStatus.ServerError).send({
          message: "Internal Server Error has occurred.",
        })
      );
  };
}
