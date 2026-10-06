import { compareHash } from "../../middleware/hash.js";
import { generatedToken } from "../../middleware/token.js";
import {
    findEmailUserRepository
} from "../users/user.repository.js";



export async function loginService(email: string, senha: string) {

    if(!email.trim()){
        throw new Error("E-mail ou senha inválidos.");
    }

    if(!senha.trim()){
        throw new Error("E-mail ou senha inválidos.");
    }

    const user = await findEmailUserRepository(email);
    if(!user){
        throw new Error("Usuário não encontrado.");
    }

    const verify = await compareHash(senha, user.id);
    if(!verify){
        throw new Error("E-mail ou senha incorreta.");
    }

    return await generatedToken(email, user.id);
}