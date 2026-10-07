import { authentication } from "../../middleware/auth.js";
import { 
    createUpvoteController,
    findUpvoteController,
    deleteUpvoteController,
    countUpvoteController
} from "./upvote.controller.js";
import express from 'express';
const upvoteRouter = express.Router();

upvoteRouter.post("/", authentication, createUpvoteController);
upvoteRouter.get("/:id", findUpvoteController);
upvoteRouter.delete("/:id", authentication, deleteUpvoteController);
upvoteRouter.get("/", countUpvoteController);

export default upvoteRouter;