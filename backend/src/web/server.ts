import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import services, {EmailTakenError} from "../services";
import {sanitizeArticle, sanitizeUser} from "../entities";
import {getCurrentUser, login} from "./auth";

const app = express();

app.use(morgan(":remote-addr :method :url :status - :response-time ms"));

app.use(express.json({limit: "1mb"}));
app.use(cookieParser())

app.get("/", (req, res) => {
    res.end("Hello World");
});

// Users
app.post("/api/signup", async (req, res) => {
    let {displayName, email, password} = req.body;

    if ( 
        typeof displayName !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        res.status(400).end();
        return;
    }

    displayName = displayName.trim();
    email = email.trim();

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

        await login(res, user);

        res.status(201).json(sanitizeUser(user));

    } catch (err) {
        if (err === EmailTakenError) {
            res.status(409).end();
            return;
        }

        console.error("[ERROR] Failed to register user", err);
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

        await login(res, user);

        res.status(200).json(sanitizeUser(user));

    } catch (err) {
        console.error("[ERROR] Failed to login user", err);
        res.status(500).end();
    }
})

app.get("/api/me", async (req, res) => {
    try {
        const user = await getCurrentUser(req);
        if (!user) {
            res.status(401).end();
            return;
        }

        res.status(200).json(sanitizeUser(user));
    } catch (err) {
        console.error("[ERROR] Failed to get current user", err);
        res.status(500).end();
    }
});


// Articles
app.post("/api/articles", async (req, res) => {
    try {
        const user = await getCurrentUser(req);
        if (!user) {
            res.status(401).end();
            return;
        }

        let {title, content} = req.body;
        if (!title || !content) {
            res.status(400).end();
            return;
        }

        if (
            typeof title !== "string" ||
            typeof content !== "string"
        ) {
            res.status(400).end();
            return;
        }

        title = title.trim();
        content = content.trim();

        if (title.length < 2 || title.length > 100) {
            res.status(400).end();
            return;
        }

        if (content.length < 100 || content.length > 10000) {
            res.status(400).end();
            return;
        }

        const article = await services.articles.create(user.id, {
            title,
            content,
        });

        res.status(200).json(sanitizeArticle(article));

    } catch (err) {
        console.error("[ERROR] Failed to create article", err);
        res.status(500).end();
    }
})

app.get("/api/articles", async (req, res) => {
    try {
        const user = await getCurrentUser(req);
        if (!user) {
            res.status(401).end();
            return;
        }

        const articleList = await services.articles.listAllOfAuthor(user.id);

        res.status(200).json(articleList.map(sanitizeArticle));

    } catch (err) {
        console.error("[ERROR] Failed to get article list of current user", err);
        res.status(500).end();
    }
})

app.get("/api/articles/:id", async (req, res) => {
    const articleId = req.params.id;

    try {
        const article = await services.articles.get(articleId)
        if (!article) {
            res.status(404).end();
            return;
        }

        res.status(200).json(sanitizeArticle(article));
    } catch (err) {
        console.error(`[ERROR] Failed to get article ${articleId}`, err)
        res.status(500).end();
    }
})

export function start(port: number) {
    app.listen(port, () => {
        console.log(`[INFO] Server started on port ${port}`);
    });
}
