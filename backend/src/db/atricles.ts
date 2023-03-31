import {Article, User} from "../entities";
import {Collection, Db} from "mongodb";


let collection: Collection<Article>;

export async function init(db: Db) {
    collection = db.collection("articles");

    await collection.createIndex({id: 1}, {unique: true});
    await collection.createIndex({authorUserId: 1});
}

export async function create(article: Article): Promise<void> {
    await collection.insertOne({
        id: article.id,
        authorUserId: article.authorUserId,
        authorDisplayName: article.authorDisplayName,
        title: article.title,
        content: article.content,
        createdAt: article.createdAt,
    });
}

export async function get(id: string): Promise<Article | undefined> {
    return await collection.findOne({id}) || undefined;
}

export async function listAllOfAuthor(authorUserId: string): Promise<Article[]> {
    return await collection.find({authorUserId}).toArray();
}

export function remove(id: string) {
    return collection.deleteOne({id});
}

