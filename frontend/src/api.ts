import {Article, ArticleFormData, LoginFormData, SignupFormData, User} from "./enitites";
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


interface LoginResponse {
    ok: boolean;
    user?: User;
    invalidCredentials?: boolean;
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


interface CurrentUserResponse {
    ok: boolean;
    user?: User;
    notAuthenticated?: boolean;
}

export async function getMe(): Promise<CurrentUserResponse> {
    try {
        const res = await axios.get<User>("/api/me")
        return {
            ok: true,
            user: res.data,
        };

    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
            return {
                ok: false,
                notAuthenticated: true,
            }
        }

        return {
            ok: false,
        }
    }
}

interface CreateArticleResponse {
    ok: boolean;
    article?: Article;
    notAuthenticated?: boolean;
}

export async function createArticle(articleForm: ArticleFormData): Promise<CreateArticleResponse> {
    try {
        const res = await axios.post<Article>("/api/articles", articleForm)
        return {
            ok: true,
            article: res.data,
        };

    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
            return {
                ok: false,
                notAuthenticated: true,
            }
        }

        return {
            ok: false,
        }
    }
}

interface MyArticlesResponse {
    ok: boolean;
    articles?: Article[];
    notAuthenticated?: boolean;
}


export async function getMyArticles(): Promise<MyArticlesResponse> {
    try {
        const res = await axios.get<Article[]>("/api/articles")
        return {
            ok: true,
            articles: res.data,
        };

    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
            return {
                ok: false,
                notAuthenticated: true,
            }
        }

        return {
            ok: false,
        }
    }
}

interface GetArticleResponse {
    ok: boolean;
    article?: Article;
    notFound?: boolean;
}

export async function getArticle(id: string): Promise<GetArticleResponse> {
    try {
        const res = await axios.get<Article>(`/api/articles/${id}`)
        return {
            ok: true,
            article: res.data,
        };

    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
            return {
                ok: false,
                notFound: true,
            }
        }

        return {
            ok: false,
        }
    }
}