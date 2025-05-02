export interface Role {
    id?: number;
    name?: string;
    description?: string;
}

export interface CreateRoleDto {
    name: string;
    description?: string;
}

export interface UpdateRoleDto {
    description?: string;
}
