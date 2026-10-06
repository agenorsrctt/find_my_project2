import type { AlterOrganizationDto, CreateOrganizationDto } from "./organization.dto.js";
import { alterOrganizationRepository, createOrganizationRepository, deleteOrganizationRepository, findOrganizationCNPJRepository, findOrganizationRepository, listOrganizationRepository } from "./organization.repository.js";

export async function createOrganizationService(data: CreateOrganizationDto) {
    if (!data) {
        throw new Error("Erro: Nenhum campo preenchido.")
    }
    if (data.cnpj.length < 16) {
        throw new Error("Erro: CNPJ inválido.")
    }
    const find = await findOrganizationCNPJRepository(data.cnpj);
    if (find && find.cnpj === data.cnpj) {
        throw new Error("Erro: Organização já existe.")
    }
    return await createOrganizationRepository(data);
}

export async function alterOrganizationService(data: AlterOrganizationDto, id: number) {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Erro: Não foi possivel identificar a organização.")
    }
    if (!data.organization?.trim() || !data.cnpj?.trim()) {
        throw new Error("Erro: Nenhum campo preenchido.")
    }
    if(data.organization && data.organization.trim().length <= 3){
        throw new Error("Erro: Nome da organização inválido.")
    }
    if (data.cnpj) {
        if (data.cnpj.length < 14) {
            throw new Error("Erro: CNPJ inválido.")
        }
        const find = await findOrganizationCNPJRepository(data.cnpj);
        if (find && find.id !== id) {
            throw new Error("Erro: CNPJ já cadastrado.");
        }
    }
    return await alterOrganizationRepository(data, id);
}

export async function deleteOrganizationService(id: number) {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Erro: Não foi possivel identificar a organização.")
    }
    const organization = await findOrganizationRepository(id);
    if (!organization) {
        throw new Error("Erro: Organização não localizada.")
    }
    return deleteOrganizationRepository(id);
}

export async function findOrganizationService(id: number) {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Erro: Não foi possivel identificar a organização.")
    }
    const organization = await findOrganizationRepository(id);
    if (!organization) {
        throw new Error("Erro: Organização não localizada.")
    }
    return organization;
}

export async function listOrganizationService() {
    const organization = await listOrganizationRepository();
    if (!organization || organization.length <= 0) {
        throw new Error("Erro: Nenhuma organização encontrada.")
    }
    return organization;
}