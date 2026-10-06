export type TypeUser = "stundent" | "admin" | "visitation" | "superAdmin"

export interface CreateUserDto {
    readonly id: number;
    user: string;
    email: string;
    password: string;
    type: TypeUser;
    organization_id: number
}

export interface AlterUserDto {
    readonly id: number;
    user?: string;
    email?: string;
    password?: string;
    type?: TypeUser;
    organization_id?: number
}