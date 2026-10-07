import { findProjectRepository } from "../projects/project.repository.js";
import { findUserRepository } from "../users/user.repository.js";
import { 
    createUpvoteRepository,
    findUpvoteRepository,
    deleteUpvoteRepository
} from "./upvote.repository.js";

export async function createUpvoteService(project_id: number, user_id: number) {
    if(!Number.isInteger(project_id) || project_id <= 0){
        throw new Error("Projeto não identificado.")
    }

    if(!Number.isInteger(user_id) || user_id <= 0){
        throw new Error("Usuário não identificado.")
    }

    const user = await findUserRepository(user_id);
    if(!user){
        throw new Error("Usuário não encontrado.")
    }

    const project = await findProjectRepository(project_id);
    if(!project){
        throw new Error("Projeto não localizado.")
    }

    return await createUpvoteRepository(project_id, user_id);
}

export async function findUpvoteService(id: number) {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Upvote não identificado.")
    }

    const upvote = await findUpvoteRepository(id);
    if(!upvote){
        throw new Error("UpVote não encontrado.")
    }

    return upvote;
}


export async function deleteUpvoteService(user_id: number, id: number) {
    if(!Number.isInteger(id) || id <= 0){
        throw new Error("Upvote não identificado.")
    }

    const upvote = await findUpvoteRepository(id);
    if(!upvote){
        throw new Error("UpVote não encontrado.")
    }

    if(upvote.user_id !== user_id){
        throw new Error("Usuário não autorizado.")
    }

    return await deleteUpvoteRepository(id);
}