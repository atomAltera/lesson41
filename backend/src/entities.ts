export interface SignupFormData {
    displayName: string;
    email: string;
    password: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface ResetFormData {
    email: string;
}

export interface User {
    id: string;
    email: string;
    displayName: string;

    // service fields
    password: string;
    createdAt: Date;
}

export type ApiUser = Pick<User, "id" | "email" | "displayName" | "createdAt">

export function sanitizeUser(user: User): ApiUser {
    return {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        createdAt: user.createdAt,
    }
}