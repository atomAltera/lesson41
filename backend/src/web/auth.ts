import * as jose from 'jose'
import {Response, Request} from "express";
import {User} from "../entities";
import services from "../services";

// TODO: DO NOT STORE SECRETS IN CODE EVER!!!
const SECRET = "vAbpUQyMv5fXYF4rxV4oK0jnmXsnRBwFi3BgIKRgglePqvdaLf85h9mQfZyJEnhN";

export async function login(res: Response, user: User) {
    const secret = new TextEncoder().encode(SECRET);

    const t = new jose.SignJWT({id: user.id})
    t.setExpirationTime("1y")
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
    let verified: jose.JWTVerifyResult;

    try {
        verified = await jose.jwtVerify(jwt, secret);
    } catch (err) {
        return undefined;
    }

    if (verified.protectedHeader.alg !== "HS256") {
        return undefined;
    }

    const id = verified.payload["id"]
    if (typeof id !== "string") {
        return undefined;
    }

    return await services.users.get(id);
}