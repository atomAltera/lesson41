import {MongoClient} from "mongodb";

import * as users from "./users";
import * as articles from "./atricles";


async function connect(uri: string) {
    const client = new MongoClient(uri);

    await client.connect();

    const db = client.db();

    await users.init(db)
    await articles.init(db)

    return client;
}

export default {
    connect,
    users,
    articles,
    // ...
}