import {start as startServer} from './web/server'
import database from "./db";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URI = process.env.DATABASE_URI;

async function main() {
    if (!DATABASE_URI) {
        throw new Error("DATABASE_URI is not defined")
    }

    console.log("[INFO] Starting application");

    console.log("[INFO] Connecting to database")
    await database.connect(DATABASE_URI)
    console.log("[INFO] Connected to database")

    console.log("[INFO] Starting server")
    startServer(3001)
}


main().catch(err => console.error(err))
