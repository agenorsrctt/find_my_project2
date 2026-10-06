import { db } from "../../database/connection.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export async function createUpvoteRepository(project_id: number, user_id: number) {
    const sql = "insert into upvotes (project_id, user_id) values (? , ?)";
    const [result] = await db.execute<ResultSetHeader>(sql, [project_id, user_id]);
    return result.insertId;
}

export async function findUpvoteRepository(id:number) {
    const sql = "select * from upvotes where id = ?";
    const [result] = await db.execute<RowDataPacket[]>(sql, [id]);
    return result[0];
}

export async function deleteUpvoteRepository(id: number) {
    const sql = "delete from upvotes where id = ?";
    const [result] = await db.execute<ResultSetHeader>(sql, [id]);
    return result.affectedRows;
}