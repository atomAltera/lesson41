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

// User entity
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

// Article entity
export interface Article {
    id: string;
    authorUserId: string;
    authorDisplayName: string;

    title: string;
    content: string;

    createdAt: Date;
}

export type ApiArticle = Pick<Article, "id" | "authorUserId" | "authorDisplayName" | "title" | "content" | "createdAt">

export function sanitizeArticle(article: Article): ApiArticle {
    return {
        id: article.id,
        authorUserId: article.authorUserId,
        authorDisplayName: article.authorDisplayName,
        title: article.title,
        content: article.content,
        createdAt: article.createdAt,
    }
}

export interface ArticleFormData {
    title: string;
    content: string;
}