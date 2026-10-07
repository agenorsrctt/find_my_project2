import { 
    createUpvoteService,
    findUpvoteService,
    deleteUpvoteService,
    countUpvoteService
} from "./upvote.service.js";
import type { Request, Response } from "express";
import { errorResponseGenerate } from "../utils/error.controller.js";

export async function createUpvoteController(req: Request, res: Response) {
    try {
        const {project_id} = req.body;
        const user_id = res.locals.user.id;
        const upvote =await createUpvoteService(project_id, user_id);
        res.status(201).json({
            message: "UpVote criado com sucesso!",
            upvote
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}

export async function findUpvoteController(req: Request, res: Response){
    try {
        const id = Number(req.params.id);
        const upvote = await findUpvoteService(id);
        res.status(200).json({
            message: "UpVote encontrado com sucesso!",
            upvote
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}

export async function deleteUpvoteController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const user_id = res.locals.user.id;
        const upvote = await deleteUpvoteService(user_id, id);
        res.status(200).json({
            message: "UpVote deletado com sucesso!",
            upvote
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}

export async function countUpvoteController(req: Request, res: Response){
    try {
        const upvotes = await countUpvoteService();
        res.status(200).json({
            message: "Upvotes contados: ",
            upvotes
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}