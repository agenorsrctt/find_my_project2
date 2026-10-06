import type { Request, Response } from "express";
import { errorResponseGenerate } from "../utils/error.controller.js";
import { alterOrganizationService, createOrganizationService, deleteOrganizationService, findOrganizationService, listOrganizationService } from "./organization.service.js";

export async function createOrgananizationController(req: Request, res: Response) {
    try {
        const data = req.body;
        const idOrganization = await createOrganizationService(data);
        const organization = await findOrganizationService(idOrganization);
        res.status(201).json({
            message: "Organização criada com sucesso!",
            data: organization
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}

export async function alterOrganizationController(req: Request, res: Response) {
    try {
        const data = req.body;
        const id = Number(req.params.id);
        await alterOrganizationService(data, id);
        const organization = await findOrganizationService(id);
        res.status(200).json({
            message: "Alteração realizada com sucesso!",
            data: organization
        })

    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}

export async function deleteOrganizationController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const organization = await findOrganizationService(id);
        await deleteOrganizationService(id);
        res.status(200).json({
            message: "Organização deletada",
            data: organization
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}

export async function findOrganizationController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const organization = await findOrganizationService(id);
        res.status(200).json({
            message: "Organização encontrada",
            data: organization
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}

export async function listOrganizationController(req: Request, res: Response) {
    try {
        const organizations = await listOrganizationService();
        res.status(200).json({
            message: "Organizações encontradas",
            data: organizations
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}