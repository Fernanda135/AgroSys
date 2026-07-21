import api from "./api";

export type PlantationStatus =
    | "PLANTED"
    | "GROWING"
    | "READY"
    | "HARVESTED"
    | "DELAYED";
export interface Plantation {
    id: number;
    user_id: number;
    culture: string;
    variety: string | null;
    planting_date: string;
    harvest_date: string | null;
    quantity_planted: number;
    unit: string | null;
    expected_production: number | null;
    is_harvested: boolean;
    status: PlantationStatus;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePlantationData {
    culture: string;
    variety?: string;
    planting_date: string;
    harvest_date?: string;
    quantity_planted?: number;
    unit?: string;
    expected_production?: number;
    notes?: string;
}

export interface UpdatePlantationData {
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

export interface PlantationResponse {
    success: boolean;
    message: string;
    data: Plantation[];
    stats?: {
        total: number;
        active: number;
        harvested: number;
    };
}

export interface SinglePlantationResponse {
    success: boolean;
    message: string;
    data: Plantation;
}

export interface DeletePlantationResponse {
    success: boolean;
    message: string;
}

export interface PlantationStats {
    total: number;
    active: number;
    harvested: number;
    topCultures: Array<{
        culture: string;
        count: number;
    }>;
}

export const plantationService = {
    async getAll(params?: {
        page?: number;
        limit?: number;
        culture?: string;
        search?: string;
        status?: PlantationStatus;
    }) {
        const { data } = await api.get<PlantationResponse>("/plantations", {
            params,
        });

        return data;
    },

    async getById(id: number) {
        const { data } = await api.get<SinglePlantationResponse>(
            `/plantations/${id}`,
        );

        return data;
    },

    async create(plantation: CreatePlantationData) {
        const { data } = await api.post<SinglePlantationResponse>(
            "/plantations",
            plantation,
        );

        return data;
    },

    async update(id: number, plantation: UpdatePlantationData) {
        const { data } = await api.put<SinglePlantationResponse>(
            `/plantations/${id}`,
            plantation,
        );

        return data;
    },

    async delete(id: number) {
        const { data } = await api.delete<DeletePlantationResponse>(
            `/plantations/${id}`,
        );

        return data;
    },

    async harvest(id: number) {
        console.log('🌾 Harvesting plantation ID:', id);
        console.log('🔗 URL:', `/plantations/${id}/harvest`);

        try {
            const { data } = await api.patch<SinglePlantationResponse>(
                `/plantations/${id}/harvest`
            );
            console.log('✅ Harvest response:', data);
            return data;
        } catch (error: any) {
            console.error('❌ Harvest error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
                config: error.config
            });

            // Se for 404, tenta com PUT como fallback
            if (error.response?.status === 404) {
                console.log('🔄 Tentando PUT como fallback...');
                const { data } = await api.put<SinglePlantationResponse>(
                    `/plantations/${id}/harvest`
                );
                return data;
            }

            throw new Error(error.response?.data?.message || 'Erro ao colher plantação');
        }
    },


    async getActive() {
        const { data } = await api.get<PlantationResponse>("/plantations/active");

        return data;
    },

    async getHarvested() {
        const { data } = await api.get<PlantationResponse>(
            "/plantations/harvested",
        );

        return data;
    },

    async getStats() {
        const { data } = await api.get<{
            success: boolean;
            data: PlantationStats;
        }>("/plantations/statistics");

        return data;
    },

    async getByCulture(culture: string) {
        const { data } = await api.get<PlantationResponse>(
            `/plantations/culture/${culture}`,
        );

        return data;
    },
};
