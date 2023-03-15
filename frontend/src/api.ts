import {SignupFormData, User} from "./enitites";
import axios from "axios";


interface SignupResponse {
    ok: boolean;
    user?: User;
    emailTaken?: boolean;
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