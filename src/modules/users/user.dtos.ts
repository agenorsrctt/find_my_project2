export type TypeUser = "student" | "admin" | "visitation" | "superAdmin"

export interface CreateUserDto {
    user: string;
    email: string;
    password: string;
    type: TypeUser;
    organization_id: number | null
}

export interface AlterUserDto {
    readonly id: number;
    user?: string;
    email?: string;
    password?: string;
    type?: TypeUser;
    organization_id?: number | null
}