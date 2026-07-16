import api from "./api";

export interface AuthResponse {
    success: boolean;
    message?: string;
    data: {
        id: number;
        name: string;
        email: string;
        accessToken: string;
        refreshToken: string;
    };
}

export const authService = {

    async login(data: { email: string; password: string }) {
        const response = await api.post<AuthResponse>("/auth/sign-in", data);

        if (response.data.success) {
            const { accessToken, refreshToken, ...user } = response.data.data;
            return {
                ...user,
                accessToken,
                refreshToken
            };
        }

        throw new Error('Erro ao fazer login');
    },

    async register(data: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) {
        const response = await api.post<AuthResponse>("/auth/sign-up", data);

        if (response.data.success) {
            const { accessToken, refreshToken, ...user } = response.data.data;
            return {
                ...user,
                accessToken,
                refreshToken
            };
        }

        throw new Error('Erro ao registrar');
    },

    async refreshToken(refreshToken: string) {
        const response = await api.post("/auth/refresh-token", { refreshToken });

        if (response.data.success) {
            const { accessToken, refreshToken: newRefreshToken } = response.data.data;
            return { accessToken, refreshToken: newRefreshToken };
        }

        throw new Error('Erro ao renovar token');
    },

    logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
    },

    isAuthenticated() {
        return !!localStorage.getItem("accessToken");
    }
};