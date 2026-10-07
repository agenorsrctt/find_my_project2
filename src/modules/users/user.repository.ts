import type { RowDataPacket, ResultSetHeader } from "mysql2";
import { db } from "../../database/connection.js";
import type { AlterUserDto, CreateUserDto } from "./user.dtos.js";

export async function createUserRepository(data: CreateUserDto) {
    const values = [data.user, data.email, data.password, data.type, data.organization_id];
    const sql = 'insert into users (user, email, password, type, organization_id) values(?, ?, ?, ?, ?)';
    const [result] = await db.execute<ResultSetHeader>(sql, values);
    return result.insertId;
};

export async function alterUserRepository(data: AlterUserDto, id: number) {
    const values = [];
    const fields = [];

    if(data.user) { fields.push("user"), values.push(data.user) }
    if(data.email) { fields.push("email"), values.push(data.email)}
    if(data.password) { fields.push("password"), values.push(data.password)}
    if(data.type) { fields.push("type"), values.push(data.type)}
    if(data.organization_id !== undefined) { fields.push("organization_id"), values.push(data.organization_id)}

    const placeholders = fields.map(field => `${field} = ?`)

    const sql = `update users set ${placeholders.join(", ")} where id = ?`
    const [result] = await db.execute<ResultSetHeader>(sql, [...values, id]);
    return result.affectedRows;
}

export async function deleteUserRepository(id: number) {
    const sql = 'delete from users where id = ?';
    const [result] = await db.execute<ResultSetHeader>(sql, [id]);
    return result.affectedRows;
}

export async function findUserRepository(id: number) {
    const sql = 'select id, user, email, type, organization_id from users where id = ?';
    const [result] = await db.execute<RowDataPacket[]>(sql, [id]);
    return result[0];
}

export async function findEmailUserRepository(email: string) {
    const sql = 'select * from users where email = ?';
    const [result] = await db.execute<RowDataPacket[]>(sql, [email]);
    return result[0];
}

export async function findPasswordUserRepository(id: number) {
    const sql = 'select password from users where id = ?';
    const [result] = await db.execute<RowDataPacket[]>(sql, [id]);
    return result[0];
}

export async function listUserRepository() {
    const sql = 'select id, user, email, type, organization_id from users';
    const [result] = await db.execute<RowDataPacket[]>(sql);
    return result;
}