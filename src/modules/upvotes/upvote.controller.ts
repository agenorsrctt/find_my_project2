import { 
    createUpvoteService,
    deleteUpvoteService
} from "./upvote.service.js";
import type { Request, Response } from "express";
import { errorResponseGenerate } from "../utils/error.controller.js";
import { findUpvoteRepository } from "./upvote.repository.js";

export async function createUpvoteController(req: Request, res: Response) {
    try {
        const {project_id, user_id} = req.body;
        await createUpvoteService(project_id, user_id);
        res.status(201).json({
            message: "UpVote criado com sucesso!"
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}

export async function findUpvoteController(req: Request, res: Response){
    try {
        const id = Number(req.params.id);
        await findUpvoteRepository(id);
        res.status(200).json({
            message: "UpVote encontrado com sucesso!"
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}

export async function deleteUpvoteController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        await deleteUpvoteService(id);
        res.status(200).json({
            message: "UpVote deletado com sucesso!"
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}