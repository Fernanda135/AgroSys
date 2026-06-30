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
};