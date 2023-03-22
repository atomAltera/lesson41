import {start as startServer} from './web/server'
import database from "./db";


async function main() {
    await database.connect("mongodb://localhost:27017/lesson41")

    startServer(3001)
}


main().catch(err => console.error(err))
