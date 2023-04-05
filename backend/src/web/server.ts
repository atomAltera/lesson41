import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import services, {EmailTakenError} from "../services";
import {sanitizeArticle, sanitizeUser} from "../entities";
import {getCurrentUser, login} from "./auth";
import path from "path";
import * as fs from "fs";
import {z} from "zod";

const app = express();

app.use(morgan(":remote-addr :method :url :status - :response-time ms"));

app.use(express.json({limit: "1mb"}));
app.use(cookieParser())

// Users
app.post("/api/signup", async (req, res) => {
    const schema = z.object({
        displayName: z.string().min(5).max(20),
        email: z.string().email().max(1024),
        password: z.string().min(8).max(1024)
    });

    const report = schema.safeParse(req.body);
    if (!report.success) {
        res.status(400).json(report.error);
        return;
    }

    try {
        const user = await services.users.register(report.data);

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

    const schema = z.object({
        email: z.string().email().max(1024),
        password: z.string().min(8).max(1024)
    });

    const report = schema.safeParse(req.body);
    if (!report.success) {
        res.status(400).json(report.error);
        return;
    }

    try {
        const user = await services.users.login(report.data)

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
app.post("/api/me/articles", async (req, res) => {
    try {
        const user = await getCurrentUser(req);
        if (!user) {
            res.status(401).end();
            return;
        }

        const schema = z.object({
            title: z.string().trim().min(2).max(100),
            content: z.string().trim().min(20).max(10000),
        });

        const report = schema.safeParse(req.body);
        if (!report.success) {
            res.status(400).json(report.error);
            return;
        }

        const article = await services.articles.create(user.id, report.data);

        res.status(200).json(sanitizeArticle(article));

    } catch (err) {
        console.error("[ERROR] Failed to create article", err);
        res.status(500).end();
    }
})

app.get("/api/me/articles", async (req, res) => {
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

app.delete("/api/articles/:id", async (req, res) => {
    try {
        const user = await getCurrentUser(req);
        if (!user) {
            res.status(401).end();
            return;
        }

        const articleId = req.params.id;
        const article = await services.articles.get(articleId);
        if (!article) {
            res.status(404).end();
            return;
        }

        if (article.authorUserId !== user.id) {
            res.status(403).end();
            return;
        }

        await services.articles.remove(articleId);

        res.status(200).end();

    } catch (err) {
        console.error("[ERROR] Failed to delete article", err);
        res.status(500).end();
    }
});

app.put("/api/articles/:id", async (req, res) => {
    try {
        const user = await getCurrentUser(req);
        if (!user) {
            res.status(401).end();
            return;
        }

        const schema = z.object({
            title: z.string().trim().min(2).max(100),
            content: z.string().trim().min(20).max(10000),
        });

        const report = schema.safeParse(req.body);
        if (!report.success) {
            res.status(400).json(report.error);
            return;
        }

        const articleId = req.params.id;
        const article = await services.articles.get(articleId);
        if (!article) {
            res.status(404).end();
            return;
        }

        if (article.authorUserId !== user.id) {
            res.status(403).end();
            return;
        }

        await services.articles.update(articleId, report.data);

        res.status(200).end();

    } catch (err) {
        console.error("[ERROR] Failed to delete article", err);
        res.status(500).end();
    }
});

// Frontend

app.use("/static", express.static("../frontend/build/static", {fallthrough: false}));

app.get("/*", (req, res) => {
    const indexHtml = fs.readFileSync("../frontend/build/index.html", "utf8");

    res.setHeader("Content-Type", "text/html");
    res.end(indexHtml);
})

export function start(port: number) {
    app.listen(port, () => {
        console.log(`[INFO] Server started on port ${port}`);
    });
}
