import type { AlterProjectDto, CreateProjectDto } from './project.dto.js';
import {
    createProjectRepository,
    alterProjectRepository,
    deleteProjectRepository,
    findProjectRepository,
    listProjectRepository
} from './project.repository.js';

function errorID(id: number) {
    if (id !== undefined) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("ID inválido.")
        }
    }

    return id;
}

function stringNull(text: string) {
    if (text !== undefined) {
        if (!text.trim()) {
            throw new Error("Dados inválidos, verifique e tente novamente.")
        }
    }

    return text;
}

function dataNull(data: object) {
    if (!data) {
        throw new Error("Nenhum informação encontrada, verifique e tente novamente.")
    }

    return data;
}

async function findError(id: number) {
    const result = await findProjectRepository(id);
    if (!result) {
        throw new Error("Dados não encontrados, verifique e tente novamente.")
    }

    return id;
}

export async function createProjectService(data: CreateProjectDto) {
    dataNull(data);
    errorID(data.user_id);
    stringNull(data.description);
    stringNull(data.cover_img_url);
    stringNull(data.github_url);
    stringNull(data.project);

    return createProjectRepository(data);
}

export async function alterProjectService(data: AlterProjectDto, id: number) {
    dataNull(data);
    errorID(data.id);
    errorID(id);
    await findError(id);
    data.user_id && errorID(data.user_id);
    data.description && stringNull(data.description);
    data.cover_img_url && stringNull(data.cover_img_url);
    data.github_url && stringNull(data.github_url);
    data.project && stringNull(data.project);

    return alterProjectRepository(data, id);
}

export async function deleteProjectService(id: number) {
    errorID(id);
    await findError(id);

    return deleteProjectRepository(id);
}

export async function findProjectService(id: number) {
    errorID(id);
    await findError(id);

    return findProjectRepository(id);
}

export async function listProjectService() {
    const list = await listProjectRepository();
    if (list.length <= 0) {
        throw new Error("Nenhum Projeto encontrado.")
    }

    return list;
}