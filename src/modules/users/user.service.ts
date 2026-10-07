import { generatedHash } from "../../middleware/hash.js";
import { findOrganizationService } from "../organizations/organization.service.js";
import type { AlterUserDto, CreateUserDto } from "./user.dtos.js";
import { alterUserRepository, createUserRepository, deleteUserRepository, findEmailUserRepository, findUserRepository, listUserRepository } from "./user.repository.js";

export async function createUserService(data: CreateUserDto) {
    if (!data) {
        throw new Error("É necessário preencher os dados.")
    }

    if (data.organization_id) {
        if (!Number.isInteger(data.organization_id) || data.organization_id <= 0) {
            throw new Error("Organização inválida")
        }

        const organization = await findOrganizationService(data.organization_id);
        if (!organization) {
            throw new Error("Organização não encontrada.")
        }
    }

    const email = await findEmailUserRepository(data.email);
    if (email) {
        throw new Error("Usuário já cadastrado.")
    }

    if (data.type === "superAdmin") {
        throw new Error("Você não tem permissão.")
    }

    if (data.type === "visitation") {
        data.organization_id = null;
    }

    if (data.organization_id) {
        if (data.type !== "admin" && data.type !== "student") {
            throw new Error("Tipo não permitido.")
        }
    }

    if (data.password) {
        const passwordHash = await generatedHash(data.password.trim());
        if (!passwordHash) {
            throw new Error("Senha inválida")
        }
        data.password = passwordHash;
    }

    return await createUserRepository(data);
}

export async function alterUserService(data: AlterUserDto, id: number) {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Usuario não encontrado.")
    }

    if (!data) {
        throw new Error("É necessário preencher os dados.")
    }

    if (data.type === "superAdmin") {
        throw new Error("Você não tem permissão.")
    }

    if (data.user !== undefined && !data.user?.trim()) {
        throw new Error("Nome não permitido.")
    }

    if (data.email !== undefined &&!data.email?.trim()) {
        throw new Error("E-mail inválido.")
    }

    if (data.password !== undefined &&!data.password?.trim()) {
        throw new Error("Senha inválida.")
    }

    if (data.type && data.type !== "admin" && data.type !== "student" && data.type !== "visitation") {
        throw new Error("Tipo não permitindo.")
    }

    if (data.organization_id) {
        if (Number.isInteger(data.organization_id) && data.organization_id <= 0) {
            throw new Error("Organização não encontrada.")
        }
    }

    if (data.type === "visitation") {
        data.organization_id = null;
    }

    if (data.password) {
        const passwordHash = await generatedHash(data.password);
        if (!passwordHash) {
            throw new Error("Senha hash inválida")
        }
        data.password = passwordHash;
    }

    return alterUserRepository(data, id);
}

export async function deleteUserService(id: number) {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Usuário não encontrado.")
    }

    const user = await findUserRepository(id);
    if (!user) {
        throw new Error("Usuário não encontrado.")
    }

    return await deleteUserRepository(id);
}

export async function findUserService(id: number) {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Usuário não encontrado.")
    }

    const user = await findUserRepository(id);
    if (!user) {
        throw new Error("Usuário não encontrado.")
    }

    return user;
}

export async function listUserService() {
    const userList = await listUserRepository();
    if (!userList) {
        throw new Error("Nenhum usuário encontrado.")
    }

    if (userList.length <= 0) {
        throw new Error("Nenhum usuário encontrado.")
    }

    return userList;
}