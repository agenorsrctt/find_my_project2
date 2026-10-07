import type { Request, Response, NextFunction } from "express";
import { errorResponseGenerate } from "../utils/error.controller.js";
import { loginService } from "./login.service.js"


export async function loginController(req: Request, res: Response, next: NextFunction) {
    try {
        const {email, senha} = req.body
        const token = await loginService(email, senha);
        res.status(200).json({
            message: "Login aprovado.",
            token
        })
    } catch (error) {
        errorResponseGenerate(req, res, error);
    }
}