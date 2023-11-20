import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import apiRouter from "./routes";

const server = express();

server.use(cors());
server.use(helmet());
server.use(
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    skip: (req, res) => process.env.NODE_ENV === "test",
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/api", apiRouter);

server.get("/health", (req, res) => {
  res.status(200).send("Healthy!");
});

server.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    next(err);
  } else next();
});

export default server;
