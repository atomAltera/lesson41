import express from "express";
import morgan from "morgan";
import services from "../services";
import {sanitizeUser} from "../entities";

const app = express();

app.use(morgan(":remote-addr :method :url :status - :response-time ms"));

app.use(express.json({limit: "1mb"}));

app.get("/", (req, res) => {
    res.end("Hello World");
});


app.post("/api/signup", async (req, res) => {
    const {displayName, email, password} = req.body;

    if ( 
        typeof displayName !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        res.status(400).end();
        return;
    }

    if (displayName.length < 5 || displayName.length > 20) {
        res.status(400).end();
        return;
    }

    if (email.length > 1024 || !email.includes("@")) {
        res.status(400).end();
        return;
    }

    if (password.length < 8 || password.length > 1024) {
        res.status(400).end();
        return;
    }


    try {
        const user = await services.users.register({
            displayName,
            email,
            password,
        });

        res.status(201).json(sanitizeUser(user));

    } catch (err) {
        if (err === services.users.EmailTakenError) {
            res.status(409).end();
            return;
        }

        res.status(500).end();
    }
})

app.post("/api/login", async (req, res) => {
    const {email, password} = req.body;

    if (
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        res.status(400).end();
        return;
    }

    try {
        const user = await services.users.login({
            email,
            password,
        })

        if (!user) {
            res.status(401).end();
            return;
        }

        res.status(200).json(sanitizeUser(user));

    } catch (err) {
        res.status(500).end();
        return;
    }
})

export function start(port: number) {
    app.listen(port, () => {
        console.log(`[INFO] Server started on port ${port}`);
    });
}
