export interface PasswordEntityDto {
    id: string;
    name: string;
    password: string;
    createdAt: string;
    type: string;
    isVisible?: boolean; // Добавлено свойство
}

export interface GetPasswordEntityResponse {
    passwordEntityDtos: PasswordEntityDto[];
}
