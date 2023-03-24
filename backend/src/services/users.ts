import {LoginFormData, SignupFormData, User} from "../entities";
import db from "../db";
import {generateNewId} from "./utils";
import bcrypt from "bcrypt";
import {EmailTakenError} from "./errors";


export async function register(form: SignupFormData): Promise<User> {
    form.email = form.email.toLowerCase();

    const existingUser = await db.users.getByEmail(form.email);
    if (existingUser) {
        throw EmailTakenError;
    }

    const passwordHash = await bcrypt.hash(form.password, 10);

    const user: User = {
        id: generateNewId(),
        email: form.email,
        displayName: form.displayName,

        // service fields
        password: passwordHash,
        createdAt: new Date(),
    }

    await db.users.create(user);

    return user;
}

export async function login(form: LoginFormData): Promise<User | undefined> {
    form.email = form.email.toLowerCase();

    const user = await db.users.getByEmail(form.email)
    if (!user) {
        return undefined;
    }


    const ok = await bcrypt.compare(form.password, user.password);
    if (!ok) {
        return undefined;
    }

    return user;
}

export async function getByEmail(email: string): Promise<User | undefined> {
    return db.users.getByEmail(email);
}

export async function get(id: string): Promise<User | undefined> {
    return db.users.get(id);
}
