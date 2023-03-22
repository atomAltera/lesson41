import {User} from "../entities";
import {Collection, Db} from "mongodb";



let collection: Collection<User>;

export async function init(db: Db) {
    collection = db.collection("users");

    await collection.createIndex({id: 1}, {unique: true});
    await collection.createIndex({email: 1}, {unique: true});
}

export async function create(user: User): Promise<void> {
    await collection.insertOne({
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        password: user.password,
        createdAt: user.createdAt,
    });
}

export async function getByEmail(email: string): Promise<User | undefined> {
    return await collection.findOne({email}) || undefined;
}

export async function get(id: string): Promise<User | undefined> {
    return await collection.findOne({id}) || undefined;
}
