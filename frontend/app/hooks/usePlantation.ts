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
            setError(null);
        } catch (err) {
            setError("Erro ao carregar plantações");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    async function addPlantation(data: { culture: string, plantingDate: string, harvestDate: string }) {
        try {
            const newPlantation = await plantationService.create({
                culture: data.culture,
                plantingDate: data.plantingDate,
                harvestDate: data.harvestDate,
            });
            setPlantations((prev) => [newPlantation, ...prev]);
            return newPlantation;
        } catch (err) {
            console.error(err);
            setError("Erro ao criar plantação.");
            throw err;
        }
    };
    
    async function updatePlantation(id: number, data: { culture: string, plantingDate: string, harvestDate: string }) {
        try {
            const updatePlantation = await plantationService.update(id, {
                culture: data.culture,
                plantingDate: data.plantingDate,
                harvestDate: data.harvestDate,
            });
            setPlantations((prev) =>
                prev.map((plantation) => (plantation.id == id ? updatePlantation : plantation)));
            return updatePlantation;
        } catch (err) {
            console.error(err);
            setError("Erro ao atualizar plantação.");
            throw err;
        }
    };

    async function deletePlantation(id: number) {
        try {
            await plantationService.delete(id);
            setPlantations((prev) => prev.filter((plantation) => plantation.id !== id));
        } catch (err) {
            console.error(err);
            setError("Erro ao deletar plantação.");
            throw err;
        }
    };

    async function harvestPlantation(id: number) {
        try {
            const plantation = plantations.find((p) => p.id == id);
            if(!plantation) throw new Error("Plantação não encontrada!");

            const updatePlantation = await plantationService.update(id, {
                isHarvested: !plantation.isHarvested,
            });
            setPlantations((prev) =>
                prev.map((plantation) => (plantation.id == id ? updatePlantation : plantation)));
            return updatePlantation;
        } catch (err) {
            console.error(err);
            setError("Erro ao alternar status da plantação.");
            throw err;
        }
    };

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
    };
}