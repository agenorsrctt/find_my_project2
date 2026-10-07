import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../../database/connection.js";
import type { CreateOrganizationDto, AlterOrganizationDto } from "./organization.dto.js";

export async function createOrganizationRepository(data: CreateOrganizationDto) {
    const sql = 'insert into organizations(organization, cnpj) values(?, ?)'
    const [result] = await db.execute<ResultSetHeader>(sql, [data.organization, data.cnpj]);
    return result.insertId;
};

export async function alterOrganizationRepository(data: AlterOrganizationDto, id: number) {
    const fields = [];
    const values = [];
    if (data.organization !== undefined) {
        fields.push("organization")
        values.push(data.organization)
    }
    if (data.cnpj) {
        fields.push("cnpj")
        values.push(data.cnpj)
    }
    const placeholders = fields.map(field => `${field} = ?`)
    const sql = `update organizations set ${placeholders.join(", ")} where id = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [...values, id]);
    return result.affectedRows;
};

export async function deleteOrganizationRepository(id: number) {
    const sql = 'delete from organizations where id = ?';
    const [result] = await db.execute<ResultSetHeader>(sql, [id]);
    return result.affectedRows;
}

export async function findOrganizationRepository(id: number) {
    const sql = 'select * from organizations where id = ?';
    const [result] = await db.execute<RowDataPacket[]>(sql, [id]);
    return result[0];
}

export async function findOrganizationCNPJRepository(cnpj: string) {
    const sql = 'select * from organizations where cnpj = ?';
    const [result] = await db.execute<RowDataPacket[]>(sql, [cnpj]);
    return result[0];
}

export async function listOrganizationRepository() {
    const sql ='select * from organizations';
    const [result] = await db.execute<RowDataPacket[]>(sql);
    return result;
}