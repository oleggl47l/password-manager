export interface PasswordEntityDto {
    id: string;
    name: string;
    password: string;
    createdAt: string;
    type: string;
    isVisible?: boolean;
}

export interface GetPasswordEntityResponse {
    passwordEntityDtos: PasswordEntityDto[];
}

export interface CreatePasswordEntityRequest {
    name: string;
    password: string;
    type: string;
}