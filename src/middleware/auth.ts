import type { Request, Response, NextFunction } from "express";
import { errorResponseGenerate } from "../modules/utils/error.controller.js";
import { verifyToken } from "./token.js";
import { findUserService } from "../modules/users/user.service.js";
import { findUserRepository } from "../modules/users/user.repository.js";

export async function authentication(req: Request, res: Response, next: NextFunction) {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(401).json({
                message: "Autorização não identificada."
            });
        }

        const [tipo, token] = auth.split(" ");
        if (tipo !== "Bearer" && !token) {
            return res.status(401).json({
                message: "Autorização não identificada."
            })
        }

        if (token !== undefined) {
            const user = await verifyToken(token);
            res.locals.user = user;
        }

        return next();
    } catch (error) {
        errorResponseGenerate(req, res, error)
    }
}

export async function authorizationSuperAdmin(req: Request, res: Response, next: NextFunction){
    try {

        const user_id = res.locals.user.id;
        if(!Number.isInteger(user_id) || user_id <= 0){
            return res.status(403).json({
                message: "Usuario não encontrado.",
            })
        }
        
        const user = await findUserRepository(user_id);
        if(!user){
            throw new Error("Usuario não encontrado")
        }

        if(user.type != "superAdmin"){
            throw new Error("Usuário não autenticado.")
        }

        res.status(200).json({
            message: "Usuário autenticado com sucesso!",
        })

        return next();

    } catch (error) {
        errorResponseGenerate(req, res, error)
    }
}