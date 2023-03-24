import {useEffect, useState} from "react";
import {Article, User} from "./enitites";
import {useNavigate} from "react-router-dom";
import * as api from "./api";


export function useCurrentUser() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(false);

        api.getMe()
            .then(r => {
                if (r.notAuthenticated) {
                    navigate("/login");
                    return;
                }

                setLoading(false);

                if (!r.ok) {
                    setError(true);
                    return;
                }

                setUser(r.user);
            })
    }, [])

    return {
        loading,
        error,
        user: user as User,
    }
}

export function useArticles() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [articles, setArticles] = useState<Article[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(false);

        api.getMyArticles()
            .then(r => {
                if (r.notAuthenticated) {
                    navigate("/login");
                    return;
                }

                setLoading(false);

                if (!r.ok) {
                    setError(true);
                    return;
                }

                setArticles(r.articles || []);
            })
    }, [])

    return {
        loading,
        error,
        articles,
    }
}