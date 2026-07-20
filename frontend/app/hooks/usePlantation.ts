import { useEffect, useMemo, useState } from "react";
import { Plantation, plantationService, PlantationStatus } from "@/app/services/plantation.service";


export const mockPlantations: Plantation[] = [
    {
        id: 1,
        user_id: 1,
        culture: "Milho",
        variety: "Milho AG 8088",
        planting_date: "2026-01-10",
        harvest_date: "2026-05-10",
        quantity_planted: 500,
        unit: "kg",
        expected_production: 3500,
        status: "HARVESTED",
        is_harvested: true,
        notes: "Colheita realizada com sucesso",
        createdAt: "2026-01-10T10:00:00.000Z",
        updatedAt: "2026-05-10T10:00:00.000Z"
    },

    {
        id: 2,
        user_id: 1,
        culture: "Soja",
        variety: "BRS 7380",
        planting_date: "2026-03-01",
        harvest_date: "2026-08-01",
        quantity_planted: 800,
        unit: "kg",
        expected_production: 6000,
        status: "PLANTED",
        is_harvested: false,
        notes: "Boa evolução da lavoura",
        createdAt: "2026-03-01T08:00:00.000Z",
        updatedAt: "2026-03-01T08:00:00.000Z"
    },

    {
        id: 3,
        user_id: 1,
        culture: "Feijão",
        variety: "Carioca",
        planting_date: "2026-05-01",
        harvest_date: "2026-08-05",
        quantity_planted: 300,
        unit: "kg",
        expected_production: 1200,
        status: "PLANTED",
        is_harvested: false,
        notes: "Irrigação regular",
        createdAt: "2026-05-01T09:00:00.000Z",
        updatedAt: "2026-05-01T09:00:00.000Z"
    },

    {
        id: 4,
        user_id: 1,
        culture: "Arroz",
        variety: "IRGA",
        planting_date: "2026-02-15",
        harvest_date: "2026-07-15",
        quantity_planted: 1000,
        unit: "kg",
        expected_production: 7500,
        status: "READY",
        is_harvested: false,
        notes: "Pronto para colheita",
        createdAt: "2026-02-15T07:30:00.000Z",
        updatedAt: "2026-07-01T07:30:00.000Z"
    },

    {
        id: 5,
        user_id: 1,
        culture: "Café",
        variety: "Arábica",
        planting_date: "2025-12-20",
        harvest_date: "2026-06-20",
        quantity_planted: 200,
        unit: "kg",
        expected_production: 900,
        status: "READY",
        is_harvested: false,
        notes: "Necessita adubação",
        createdAt: "2025-12-20T08:00:00.000Z",
        updatedAt: "2026-06-10T08:00:00.000Z"
    },

    {
        id: 6,
        user_id: 1,
        culture: "Algodão",
        variety: "BRS 500",
        planting_date: "2026-01-05",
        harvest_date: "2026-06-15",
        quantity_planted: 600,
        unit: "kg",
        expected_production: 4000,
        status: "READY",
        is_harvested: false,
        notes: "Aguardando colheita",
        createdAt: "2026-01-05T10:00:00.000Z",
        updatedAt: "2026-06-01T10:00:00.000Z"
    },

    {
        id: 7,
        user_id: 1,
        culture: "Tomate",
        variety: "Italiano",
        planting_date: "2026-06-01",
        harvest_date: "2026-07-25",
        quantity_planted: 150,
        unit: "kg",
        expected_production: 800,
        status: "PLANTED",
        is_harvested: false,
        notes: "Produção em desenvolvimento",
        createdAt: "2026-06-01T06:00:00.000Z",
        updatedAt: "2026-06-01T06:00:00.000Z"
    },

    {
        id: 8,
        user_id: 1,
        culture: "Milho",
        variety: "Híbrido",
        planting_date: "2026-06-20",
        harvest_date: "2026-09-20",
        quantity_planted: 900,
        unit: "kg",
        expected_production: 7000,
        status: "PLANTED",
        is_harvested: false,
        notes: "Plantação recente",
        createdAt: "2026-06-20T07:00:00.000Z",
        updatedAt: "2026-06-20T07:00:00.000Z"
    },

    {
        id: 9,
        user_id: 1,
        culture: "Trigo",
        variety: "TBIO Toruk",
        planting_date: "2026-01-01",
        harvest_date: "2026-04-01",
        quantity_planted: 400,
        unit: "kg",
        expected_production: 2200,
        status: "HARVESTED",
        is_harvested: true,
        notes: "Boa produtividade",
        createdAt: "2026-01-01T08:00:00.000Z",
        updatedAt: "2026-04-01T08:00:00.000Z"
    },

    {
        id: 10,
        user_id: 1,
        culture: "Mandioca",
        variety: "Branca",
        planting_date: "2025-10-01",
        harvest_date: "2026-07-01",
        quantity_planted: 1000,
        unit: "kg",
        expected_production: 9000,
        status: "READY",
        is_harvested: false,
        notes: "Colheita aguardando período ideal",
        createdAt: "2025-10-01T08:00:00.000Z",
        updatedAt: "2026-06-20T08:00:00.000Z"
    }
];


export function usePlantations() {

    const [plantations, setPlantations] = useState<Plantation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    async function loadPlantations() {
        try {
            setLoading(true);
            const response = await plantationService.getAll();
            if (response.success) {
                // setPlantations(response.data);
                setPlantations(mockPlantations);
                setError(null);
                return response;
            }
            throw new Error(
                response.message || "Erro ao carregar plantações"
            );
        } catch (err) {
            console.error(err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Erro ao carregar plantações."
            );
            throw err;
        } finally {
            setLoading(false);
        }
    }


    async function addPlantation(data: {
        culture: string;
        variety?: string;
        planting_date: string;
        harvest_date?: string;
        quantity_planted?: number;
        unit?: string;
        expected_production?: number;
        notes?: string;
    }) {
        try {
            const response = await plantationService.create(data);
            if (response.success) {
                setPlantations(prev => [
                    response.data,
                    ...prev
                ]);
                return response;
            }
            throw new Error(
                response.message || "Erro ao criar plantação"
            );
        } catch (err) {
            console.error(err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Erro ao criar plantação."
            );
            throw err;
        }
    }


    async function updatePlantation(
        id: number,
        data: {
            culture?: string;
            variety?: string;
            planting_date?: string;
            harvest_date?: string;
            quantity_planted?: number;
            unit?: string;
            expected_production?: number;
            status?: PlantationStatus;
            notes?: string;
        }
    ) {
        try {
            const response =
                await plantationService.update(id, data);
            if (response.success) {
                setPlantations(prev =>
                    prev.map(plantation =>
                        plantation.id === id
                            ? response.data
                            : plantation
                    )
                );
                return response;
            }
            throw new Error(
                response.message || "Erro ao atualizar plantação"
            );
        } catch (err) {
            console.error(err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Erro ao atualizar plantação."
            );
            throw err;
        }
    }


    async function deletePlantation(id: number) {
        try {
            const response =
                await plantationService.delete(id);
            if (response.success) {
                setPlantations(prev =>
                    prev.filter(
                        plantation =>
                            plantation.id !== id
                    )
                );
                return response;
            }
            throw new Error(
                response.message || "Erro ao excluir plantação"
            );
        } catch (err) {
            console.error(err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Erro ao excluir plantação."
            );
            throw err;
        }
    }


    async function harvestPlantation(id: number) {
        try {
            const response =
                await plantationService.harvest(id);
            if (response.success) {
                setPlantations(prev =>
                    prev.map(plantation =>
                        plantation.id === id
                            ? response.data
                            : plantation
                    )
                );
                return response;
            }
            throw new Error(
                response.message || "Erro ao colher plantação"
            );
        } catch (err) {
            console.error(err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Erro ao colher plantação."
            );
            throw err;
        }
    }


    useEffect(() => {
        loadPlantations();
    }, []);

    const totalCount = useMemo(
        () => plantations.length,
        [plantations]
    );


    const harvestedCount = useMemo(
        () =>
            plantations.filter(
                p => p.status === "HARVESTED"
            ).length,
        [plantations]
    );



    const pendingCount = useMemo(
        () => plantations.filter(
            p => p.status !== "HARVESTED"
        ).length,
        [plantations]
    );


    const delayedCount = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return plantations.filter(p => {
            if (p.status === "HARVESTED" || !p.harvest_date) return false;

            return new Date(p.harvest_date) < today;
        }).length;
    }, [plantations]);


    const cultureCount = useMemo(() => {
        const cultures = new Set(plantations.map(p => p.culture.trim().toLowerCase()));

        return cultures.size;
    }, [plantations]);


    const cultures = useMemo(() => {
        const result: Record<string, number> = {};
        plantations.forEach(p => {
            const key = p.culture.trim();
            result[key] =
                (result[key] || 0) + 1;
        });

        return Object.entries(result)
            .sort((a, b) => b[1] - a[1])
            .map(([name, count]) => ({
                name,
                count
            }));
    }, [plantations]);


    const harvestRate = useMemo(() => {
        if (plantations.length === 0) return 0;
        return Math.round(
            (harvestedCount / plantations.length) * 100
        );
    }, [plantations, harvestedCount]);


    const upcomingHarvest = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const limitDate = new Date();
        limitDate.setDate(
            limitDate.getDate() + 30
        );

        return plantations.filter(p => {

            if (p.status === "HARVESTED" || !p.harvest_date) return false;

            const harvestDate = new Date(p.harvest_date);
            return (harvestDate >= today && harvestDate <= limitDate
            );
        }).length;
    }, [plantations]);


    const growthStatus = useMemo(() => {
        const today = new Date();
        const status = {
            early: 0,
            growing: 0,
            mature: 0,
            harvested: 0
        };
        plantations.forEach(p => {
            if (p.status === "HARVESTED") {
                status.harvested++;
                return;
            }

            if (!p.planting_date) return;

            const planted = new Date(p.planting_date);
            const harvest = p.harvest_date ? new Date(p.harvest_date) : null;

            if (!harvest) {
                status.growing++;
                return;
            }

            const totalDays = harvest.getTime() - planted.getTime();
            const elapsedDays = today.getTime() - planted.getTime();
            const progress = elapsedDays / totalDays;

            if (progress < 0.33) {
                status.early++;
            } else if (progress < 0.8) {
                status.growing++;
            } else {
                status.mature++;
            }
        });

        return status;
    }, [plantations]);


    const growthProgress = useMemo(() => {
        const progresses = plantations.filter(p => p.status !== "HARVESTED" && p.harvest_date).map(p => {
            const start = new Date(p.planting_date).getTime();
            const end = new Date(p.harvest_date!).getTime();
            const today = Date.now();
            const progress = ((today - start) / (end - start)) * 100;

            return Math.min(Math.max(progress, 0), 100);
        });
        if (progresses.length === 0)
            return 0;
        return Math.round(
            progresses.reduce(
                (a, b) => a + b,
                0
            ) / progresses.length
        );
    }, [plantations]);


    const totalExpectedProduction = useMemo(() => {
        return plantations.reduce(
            (total, plantation) =>
                total +
                (plantation.expected_production || 0),
            0
        );
    }, [plantations]);


    const overdueHarvest = useMemo(() => {
        const today = new Date();

        return plantations.filter(p => {
            if (p.status === "HARVESTED" || !p.harvest_date) return false;

            return (new Date(p.harvest_date) < today);
        }).length;
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

        harvestRate,
        upcomingHarvest,
        growthStatus,
        growthProgress,
        totalExpectedProduction,
        overdueHarvest,
    };
}