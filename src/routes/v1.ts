import express from "express";
import initProjectRouter from "./projects.router";

const router = express.Router();
const projectRouter = initProjectRouter();

router.use("/projects", projectRouter);

export default router;
