import jwt from 'jsonwebtoken';

export async function generatedToken(email: string, id: number) {

    if(!Number.isInteger(id) || id <= 0){
        throw new Error("ID não localizada.")
    }

    if(!email.trim()){
        throw new Error("E-mail não localizado.")
    }

    const secret = process.env.DB_PASSWORD;
    if(!secret){
        throw new Error("Segredo não localizado.")
    }

    const token = jwt.sign({email: email, id: id}, secret, {expiresIn: "1h"});
    if(!token){
        throw new Error("Token não localizado.")
    }

    return token;
}

export async function verifyToken(token: string) {
    const secret = process.env.JWT_SECRET;
    if(!secret){
        throw new Error("Segredo não localizado.")
    }

    if(!token){
        throw new Error("Token não localizado.")
    }

    const result = jwt.verify(token, secret)
    if(!result){
        throw new Error("Token inválido.")
    }

    return result;
}