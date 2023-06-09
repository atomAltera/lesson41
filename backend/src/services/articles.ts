import {Article, ArticleFormData, User} from "../entities";
import db from "../db";
import {generateNewId} from "./utils";

import * as users from "./users";
import {UserNotFoundError} from "./errors";

export async function create(authorUserId: string, form: ArticleFormData): Promise<Article> {
    const author = await users.get(authorUserId);
    if (!author) {
        throw UserNotFoundError;
    }

    const article: Article = {
        id: generateNewId(),
        authorUserId: author.id,
        authorDisplayName: author.displayName,
        title: form.title,
        content: form.content,
        createdAt: new Date(),
    }

    await db.articles.create(article);

    return article;
}


export async function update(id: string, form: ArticleFormData) {
    await db.articles.update(id, form);
}


export async function listAllOfAuthor(authorUserId: string): Promise<Article[]> {
    return db.articles.listAllOfAuthor(authorUserId);
}

export async function get(id: string): Promise<Article | undefined> {
    return db.articles.get(id);
}

export async function remove(id: string): Promise<void> {
    await db.articles.remove(id);
}

