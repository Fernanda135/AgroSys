import { useEffect, useState } from "react";
import { profileService, User } from "@/app/services/profile.service";

export function useProfile() {
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadProfile() {
        try {
            setLoading(true);

            const response = await profileService.getProfile();

            if (response.success) {
                setProfile(response.data);
                setError(null);
                return response;
            }

            throw new Error(response.message || "Erro ao carregar perfil.");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao carregar perfil.");
            }
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile(data: {
        name?: string;
        email?: string;
    }) {
        try {
            const response = await profileService.updateProfile(data);

            if (response.success) {
                setProfile(response.data);
                setError(null);
                return response;
            }

            throw new Error(response.message || "Erro ao atualizar perfil.");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao atualizar perfil.");
            }

            throw err;
        }
    }

    async function changePassword(data: {
        currentPassword: string;
        newPassword: string;
        confirmNewPassword: string;
    }) {
        try {
            const response = await profileService.changePassword(data);

            if (response.success) {
                setError(null);
                return response;
            }

            throw new Error(response.message || "Erro ao alterar senha.");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao alterar senha.");
            }

            throw err;
        }
    }

    useEffect(() => {
        loadProfile();
    }, []);

    return {
        profile,
        loading,
        error,

        reload: loadProfile,

        updateProfile,
        changePassword,
    };
}