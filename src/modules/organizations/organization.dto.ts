export interface CreateOrganizationDto {
    readonly id: number;
    organization: string;
    cnpj: string
}

export interface AlterOrganizationDto {
    readonly id: number;
    organization?: string;
    cnpj?: string
}