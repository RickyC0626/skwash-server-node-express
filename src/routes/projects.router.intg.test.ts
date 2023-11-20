import { Router } from "express";
import request from "supertest";
import server from "../server";
import { HTTPStatus } from "../http";
import initProjectRouter from "./projects.router";
import { Project } from "../entities/Project";

describe("Project Routes (Integration Tests)", () => {
  let router: Router;

  beforeEach(() => {
    router = initProjectRouter();
    server.use(router);
  });

  describe("POST /projects", () => {
    it("should return '201 Created' with project id as payload", async () => {
      const response = await request(server).post("/");

      expect(response.statusCode).toBe(HTTPStatus.Created);
      expect(response.body.id).toBeDefined();
    });
  });

  describe("GET /projects", () => {
    it("should return '200 OK' with list of projects as payload", async () => {
      const response = await request(server).get("/");

      expect(response.statusCode).toBe(HTTPStatus.OK);
      expect(response.body).toBeInstanceOf(Array<Project>);
    });
  });

  describe("GET /projects/:id", () => {
    describe("when id does not exist", () => {
      it("should return '404 Not Found' with error message as payload", async () => {
        const response = await request(server).get("/invalid-id");

        expect(response.statusCode).toBe(HTTPStatus.NotFound);
        expect(response.body.message).toBeDefined();
      });
    });

    describe("when id exists", () => {
      it.todo("should return '200 OK' with project as payload");
    });
  });

  describe("PUT /projects/:id", () => {
    describe("when id does not exist", () => {
      it("should return '201 Created' with new id as payload", async () => {
        const response = await request(server).put("/invalid-id");

        expect(response.statusCode).toBe(HTTPStatus.Created);
        expect(response.body.id).toBeDefined();
      });
    });

    describe("when id exists", () => {
      it.todo("should return '200 OK'");
    });
  });

  describe("DELETE /projects/:id", () => {
    describe("when id does not exist", () => {
      it("should return '404 Not Found' with error message as payload", async () => {
        const response = await request(server).delete("/invalid-id");

        expect(response.statusCode).toBe(HTTPStatus.NotFound);
        expect(response.body.message).toBeDefined();
      });
    });

    describe("when id exists", () => {
      it.todo("should return '200 OK' with deleted project as payload");
    });
  });
});
