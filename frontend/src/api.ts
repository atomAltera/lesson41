import {LoginFormData, SignupFormData, User} from "./enitites";
import axios from "axios";


interface SignupResponse {
    ok: boolean;
    user?: User;
    emailTaken?: boolean;
}

interface LoginResponse {
    ok: boolean;
    user?: User;
    invalidCredentials?: boolean;
}

export async function signup(formData: SignupFormData): Promise<SignupResponse> {
    try {
        const res = await axios.post<User>("/api/signup", formData)
        return {
            ok: true,
            user: res.data,
        }

    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 409) {
            return {
                ok: false,
                emailTaken: true,
            }
        }

        return {
            ok: false,
        }
    }
}

export async function login(formData: LoginFormData): Promise<LoginResponse> {
    try {
        const res = await axios.post<User>("/api/login", formData)
        return {
            ok: true,
            user: res.data,
        }

    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
            return {
                ok: false,
                invalidCredentials: true,
            }
        }

        return {
            ok: false,
        }
    }
}