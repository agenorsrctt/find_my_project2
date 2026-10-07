import {
    createProjectService,
    alterProjectService,
    deleteProjectService,
    findProjectService,
    listProjectService
} from './project.service.js';
import type { Request, Response } from 'express';
import {
    errorResponseGenerate
} from '../utils/error.controller.js'

export async function createProjeController(req: Request, res: Response) {
    try {
        const data = {
            ...req.body,
            user_id: res.locals.user.id
        }
        const user_id =  res.locals.user.id
        const lastID = await createProjectService(data);
        const project = await findProjectService(lastID);
        res.status(201).json({
            message: "Projeto criado com sucesso!",
            project: project
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}

export async function alterProjectController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const data = {
            ...req.body,
            user_id: res.locals.user.id
        }
        const user_id =  res.locals.user.id
        await alterProjectService(data, id);
        const project = await findProjectService(id);
        res.status(201).json({
            message: "Projeto alterado com sucesso!",
            project: project
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}

export async function deleteProjectController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const user_id =  res.locals.user.id
        const project = await findProjectService(id);
        await deleteProjectService(user_id, id);
        res.status(201).json({
            message: "Projeto deletado com sucesso!",
            project: project
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}

export async function findProjectController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const project = await findProjectService(id);
        res.status(201).json({
            message: "Projeto encontrado com sucesso!",
            project: project
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}

export async function listProjectController(req: Request, res: Response) {
    try {
        const project = await listProjectService();
        res.status(201).json({
            message: "Listando projetos!",
            project: project
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}