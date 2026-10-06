import type { Request, Response } from "express";
import { alterUserService, createUserService, deleteUserService, findUserService, listUserService } from "./user.service.js";
import { errorResponseGenerate } from "../utils/error.controller.js";

export async function createUserController(req: Request, res: Response) {
    try {
        const data = req.body;
        await createUserService(data);
        res.status(201).json({
            message: "Usuário criado com sucesso!",
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}

export async function alterUserController(req: Request, res: Response) {
    try {
        const data = req.body;
        const id = Number(req.params.id);
        await alterUserService(data, id);
        res.status(201).json({
            message: "Alteração realizada com sucesso!",
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}

export async function deleteUserController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        await deleteUserService(id);
        res.status(200).json({
            message: "Usuário deletado com sucesso!"
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}

export async function findUserController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const user = await findUserService(id);
        res.status(201).json({
            message: "Usuário encontrado com  sucesso!",
            user: user
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}

export async function listUserController(req: Request, res: Response) {
    try {
        const users = await listUserService();
        res.status(201).json({
            message: "Usuários encontrados com sucesso!",
            user: users
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}