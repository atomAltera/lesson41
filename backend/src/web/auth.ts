import * as jose from 'jose'
import {Response, Request} from "express";
import {User} from "../entities";
import services from "../services";

// TODO: DO NOT STORE SECRETS IN CODE EVER!!!
const SECRET = "vAbpUQyMv5fXYF4rxV4oK0jnmXsnRBwFi3BgIKRgglePqvdaLf85h9mQfZyJEnhN";

export async function login(res: Response, user: User) {
    const secret = new TextEncoder().encode(SECRET);

    const t = new jose.SignJWT({email: user.email})
    t.setExpirationTime("1h")
    t.setProtectedHeader({alg: "HS256"})

    const jwt = await t.sign(secret)

    res.cookie("session", jwt);
}

export async function getCurrentUser(req: Request): Promise<User | undefined> {
    const jwt = req.cookies["session"];
    if (!jwt) {
        return undefined;
    }

    const secret = new TextEncoder().encode(SECRET);
    const verified = await jose.jwtVerify(jwt, secret);
    if (verified.protectedHeader.alg !== "HS256") {
        return undefined;
    }

    const email = verified.payload["email"]
    if (typeof email !== "string") {
        return undefined;
    }

    return await services.users.getByEmail(email);
}