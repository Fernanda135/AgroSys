import { useEffect, useMemo, useState } from "react";
import { Plantation, plantationService } from "@/app/services/plantation.service";

export function usePlantations() {
    const [plantations, setPlantations] = useState<Plantation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadPlantations() {
        try {
            setLoading(true);

            const response = await plantationService.getAll();

            if (response.success) {
                setPlantations(response.data);
                setError(null);
                return response;
            }

            throw new Error(response.message || "Erro ao carregar plantações");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao carregar plantações.");
            }

            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function addPlantation(data: {
        culture: string;
        plantingDate?: string;
        harvestDate?: string;
    }) {
        try {
            const response = await plantationService.create({
                culture: data.culture,
                plantingDate: data.plantingDate,
                harvestDate: data.harvestDate,
            });

            if (response.success) {
                setPlantations(prev => [response.data, ...prev]);
                return response;
            }

            throw new Error(response.message || "Erro ao criar plantação");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao criar plantação.");
            }

            throw err;
        }
    }

    async function updatePlantation(
        id: number,
        data: {
            culture?: string;
            plantingDate?: string;
            harvestDate?: string;
        }
    ) {
        try {
            const response = await plantationService.update(id, {
                culture: data.culture,
                plantingDate: data.plantingDate,
                harvestDate: data.harvestDate,
            });

            if (response.success) {
                setPlantations(prev =>
                    prev.map(plantation =>
                        plantation.id === id ? response.data : plantation
                    )
                );

                return response;
            }

            throw new Error(response.message || "Erro ao atualizar plantação");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao atualizar plantação.");
            }

            throw err;
        }
    }

    async function deletePlantation(id: number) {
        try {
            const response = await plantationService.delete(id);

            if (response.success) {
                setPlantations(prev =>
                    prev.filter(plantation => plantation.id !== id)
                );

                return response;
            }

            throw new Error(response.message || "Erro ao excluir plantação");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao excluir plantação.");
            }

            throw err;
        }
    }

    async function harvestPlantation(id: number) {
        try {
            const response = await plantationService.harvest(id);

            if (response.success) {
                setPlantations(prev =>
                    prev.map(plantation =>
                        plantation.id === id ? response.data : plantation
                    )
                );

                return response;
            }

            throw new Error(response.message || "Erro ao colher plantação");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao colher plantação.");
            }

            throw err;
        }
    }

    useEffect(() => {
        loadPlantations();
    }, []);

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
        today.setHours(0, 0, 0, 0);

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

    const cultures = useMemo(() => {
        const result: Record<string, number> = {};

        plantations.forEach(p => {
            const key = p.culture.trim();
            result[key] = (result[key] || 0) + 1;
        });

        return Object.entries(result)
            .sort((a, b) => b[1] - a[1])
            .map(([name, count]) => ({ name, count }));
    }, [plantations]);

    return {
        plantations,
        loading,
        error,

        addPlantation,
        updatePlantation,
        deletePlantation,
        harvestPlantation,
        reload: loadPlantations,

        totalCount,
        harvestedCount,
        pendingCount,
        delayedCount,
        cultureCount,
        cultures,
    };
}