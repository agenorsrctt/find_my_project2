import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../../database/connection.js";
import type { AlterProjectDto, CreateProjectDto } from "./project.dto.js";

export async function createProjectRepository(data: CreateProjectDto) {
    
    const field: string[] = ["project", "description", "user_id", "github_url", "cover_img_url"];
    const values: (string | number)[] = [data.project, data.description, data.user_id, data.github_url, data.cover_img_url];
    const placeholders = field.map(f => f = "?")

    const sql = `insert into projects (${field}) values (${placeholders.join(", ")})`

    const [result] = await db.execute<ResultSetHeader>(sql, values);
    return result.insertId;
}

export async function alterProjectRepository(data: AlterProjectDto, id: number) {
    const field: string[] = [];
    const values: (string | number)[] = [];

    data.project && field.push("project") && values.push(data.project);
    data.description && field.push("description") && values.push(data.description);
    data.user_id && field.push("user_id") && values.push(data.user_id);
    data.github_url && field.push("github_url") && values.push(data.github_url);
    data.cover_img_url && field.push("cover_img_url") && values.push(data.cover_img_url);

    const placeholders = field.map(f => f + "= ?");

    const sql = `update projects set ${placeholders.join(", ")} where id = ?`;
    const [result] = await db.execute<ResultSetHeader>(sql, [...values, id]);
    return result.affectedRows;
}

export async function deleteProjectRepository(id: number) {
    const sql = "delete from projects where id = ?";
    const [result] = await db.execute<ResultSetHeader>(sql, [id]);
    return result.affectedRows;
}

export async function findProjectRepository(id: number) {
    const sql = "select * from projects where id = ?";
    const [result] = await db.execute<RowDataPacket[]>(sql, [id]);
    return result[0];
}

export async function listProjectRepository() {
    const sql = "select * from projects";
    const [result] = await db.execute<RowDataPacket[]>(sql);
    return result;
}