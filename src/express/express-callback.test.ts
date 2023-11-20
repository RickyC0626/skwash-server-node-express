import request from "supertest";
import { Router } from "express";
import { HTTPController } from "../controllers/HTTPController";
import { HTTPResponse, HTTPStatus } from "../http";
import server from "../server";
import initExpressCallback from "./express-callback";

class MockHTTPController implements HTTPController {
  processRequest(): Promise<HTTPResponse> {
    throw new Error("Method not implemented.");
  }
}

describe("Express Callback (Route to Controller Mapper)", () => {
  let mockHTTPController: HTTPController;
  let router: Router;

  beforeEach(() => {
    jest.clearAllMocks();
    mockHTTPController = new MockHTTPController();
    router = Router().use(initExpressCallback(mockHTTPController));
    server.use(router);
  });

  describe("when controller throws error", () => {
    it("should return '500 Internal Server Error' with error message as payload", async () => {
      jest
        .spyOn(mockHTTPController, "processRequest")
        .mockRejectedValue(new Error("Server Error"));

      const response = await request(server).get("/");

      expect(response.statusCode).toBe(HTTPStatus.ServerError);
      expect(response.body.message).toBeDefined();
    });
  });
});
