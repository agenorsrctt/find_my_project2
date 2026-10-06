import { 
    createUpvoteController,
    findUpvoteController,
    deleteUpvoteController
} from "./upvote.controller.js";
import express from 'express';
const upvoteRouter = express.Router();

upvoteRouter.post("/", createUpvoteController);
upvoteRouter.get("/:id", findUpvoteController);
upvoteRouter.delete("/:id", deleteUpvoteController);

export default upvoteRouter;