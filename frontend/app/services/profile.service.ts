import api from "./api";

export interface User {
    id: number;
    name: string;
    email: string;
}

export const profileService = {
    async getProfile() {
        const { data } = await api.get<User>("/profile");
        return data;
    },

    async updateProfile(body: Pick<User, "name" | "email">) {
        const { data } = await api.put<User>("/profile", body);
        return data;
    },
};