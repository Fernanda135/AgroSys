import api from "./api";

export interface User {
    id: number;
    name: string;
    email: string;
    accessToken: string;
    refreshToken: string;
}

export const authService = {
    async login(data: {
        email: string;
        password: string;
    }) {
        const response = await api.post<User>("/sign-in", data);
        return response.data;
    },

    async register(data: {
        name: string;
        email: string;
        password: string;
    }) {
        const response = await api.post("/sign-up", data);
        return response.data;
    },

    async refreshToken(refreshToken: string) {
        const { data } = await api.post("/refresh-token", {
            refreshToken,
        });

        return data;
    },

    logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    },
};