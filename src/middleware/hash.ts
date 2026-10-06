import bcrypt from 'bcrypt';
import { findPasswordUserRepository } from '../modules/users/user.repository.js';

export async function generatedHash(password: string){
    return bcrypt.hash(password, 10);
}

export async function compareHash(password: string, id: number) {
    const passwordDB = await findPasswordUserRepository(id);
    if(!passwordDB){
        throw new Error("Usuario não encontrado")
    }
    return bcrypt.compare(password, passwordDB.password);
}