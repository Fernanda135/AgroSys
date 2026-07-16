import api from "./api";


export interface User {
    id: number;
    name: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface UpdateProfileData {
    name?: string;
    email?: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface ProfileResponse {
    success: boolean;
    data: User;
}

export interface UpdateProfileResponse {
    success: boolean;
    data: User;
    message?: string;
}

export interface ChangePasswordResponse {
    success: boolean;
    message: string;
}


export const profileService = {
    async getProfile() {
        const { data } = await api.get<ProfileResponse>("/profile");
        return data;
    },

    async updateProfile(body: UpdateProfileData) {
        const { data } = await api.put<UpdateProfileResponse>("/profile", body);
        return data;
    },

    async changePassword(body: ChangePasswordData) {
        const { data } = await api.put<ChangePasswordResponse>("/auth/change-password", body);
        return data;
    },

};