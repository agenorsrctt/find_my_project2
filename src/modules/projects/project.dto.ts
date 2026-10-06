export interface CreateProjectDto {
    readonly id: number;
    project: string;
    description: string;
    user_id: number;
    github_url: string;
    cover_img_url: string;
}

export interface AlterProjectDto {
    readonly id: number;
    project?: string;
    description?: string;
    user_id?: number;
    github_url?: string;
    cover_img_url?: string;
}