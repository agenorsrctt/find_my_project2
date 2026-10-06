import { 
    createProjeController,
    alterProjectController,
    deleteProjectController,
    findProjectController,
    listProjectController
} from "./project.controller.js";
import express from 'express';

const projectRoute = express.Router();

projectRoute.get("/", listProjectController);
projectRoute.get("/:id", findProjectController);
projectRoute.post("/", createProjeController);
projectRoute.patch("/:id", alterProjectController);
projectRoute.delete("/:id", deleteProjectController);

export default projectRoute;