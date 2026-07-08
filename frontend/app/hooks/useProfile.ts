import { useEffect, useState } from "react";
import { profileService, User } from "@/app/services/profile.service";

export function useProfile() {
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadProfile() {
        try {
            setLoading(true);

            const data = await profileService.getProfile();
            setProfile(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Erro ao carregar o perfil.");
        } finally {
            setLoading(false);
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
    };
}