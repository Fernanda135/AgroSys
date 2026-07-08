import { useEffect, useMemo, useState } from "react";
import { Plantation, plantationService } from "@/app/services/plantation.service";

export function usePlantations() {
    const [plantations, setPlantations] = useState<Plantation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadPlantations();
    }, []);

    async function loadPlantations() {
        try {
            setLoading(true);

            const data = await plantationService.getAll();
            setPlantations(data);

        } catch (err) {
            setError("Erro ao carregar plantações");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const totalCount = useMemo(() => plantations.length, [plantations]);

    const harvestedCount = useMemo(
        () => plantations.filter(p => p.isHarvested).length,
        [plantations]
    );

    const pendingCount = useMemo(
        () => plantations.filter(p => !p.isHarvested).length,
        [plantations]
    );

    const delayedCount = useMemo(() => {
        const today = new Date();

        return plantations.filter(p => {
            if (p.isHarvested || !p.harvestDate) return false;

            return new Date(p.harvestDate) < today;
        }).length;
    }, [plantations]);

    const cultureCount = useMemo(() => {
        const cultures = new Set(
            plantations.map(p => p.culture.trim().toLowerCase())
        );

        return cultures.size;
    }, [plantations]);

    return {
        plantations,
        loading,
        error,
        totalCount,
        harvestedCount,
        pendingCount,
        delayedCount,
        cultureCount,
        reload: loadPlantations,
    };
}