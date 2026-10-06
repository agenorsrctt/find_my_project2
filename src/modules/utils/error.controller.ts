import type { Request, Response } from "express";

export async function errorResponseGenerate(req: Request, res: Response, error: object | unknown) {
    if (error instanceof Error) {
        return res.status(500).json({
            message: error.message
        })
    }

    res.status(500).json({
        message: "Erro desconhecido do servidor."
    })
}