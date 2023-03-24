// Users
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
}

// Articles
export interface Article {
    id: string;
    authorUserId: string;
    authorDisplayName: string;

    title: string;
    content: string;

    createdAt: Date;
}

export interface ArticleFormData {
    title: string;
    content: string;
}