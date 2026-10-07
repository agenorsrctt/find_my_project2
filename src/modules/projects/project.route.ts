import { authentication } from "../../middleware/auth.js";
import { 
    createProjeController,
    alterProjectController,
    deleteProjectController,
    findProjectController,
    listProjectController
} from "./project.controller.js";
import express from 'express';

const projectRoute = express.Router();

projectRoute.get("/", authentication, listProjectController);
projectRoute.get("/:id", authentication, findProjectController);
projectRoute.post("/", authentication, createProjeController);
projectRoute.patch("/:id", authentication, alterProjectController);
projectRoute.delete("/:id", authentication, deleteProjectController);

export default projectRoute;