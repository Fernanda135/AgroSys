import api from "./api";



export interface Plantation {
    id: number;
    user_id: number;
    culture: string;
    plantingDate: string;
    harvestDate: string | null;
    isHarvested: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePlantationData {
    culture: string;
    plantingDate?: string;
    harvestDate?: string;
}

export interface UpdatePlantationData {
    culture?: string;
    plantingDate?: string;
    harvestDate?: string;
    isHarvested?: boolean;
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
        status?: 'active' | 'harvested';
    }) {
        const { data } = await api.get<PlantationResponse>("/plantations", { params });
        return data;
    },

    async getById(id: number) {
        const { data } = await api.get<SinglePlantationResponse>(`/plantations/${id}`);
        return data;
    },

    async create(plantation: CreatePlantationData) {
        const { data } = await api.post<SinglePlantationResponse>("/plantations", plantation);
        return data;
    },

    async update(id: number, plantation: UpdatePlantationData) {
        const { data } = await api.put<SinglePlantationResponse>(`/plantations/${id}`, plantation);
        return data;
    },

    async delete(id: number) {
        const { data } = await api.delete<DeletePlantationResponse>(`/plantations/${id}`);
        return data;
    },

    async harvest(id: number) {
        const { data } = await api.patch<SinglePlantationResponse>(`/plantations/${id}/harvest`);
        return data;
    },

    async getActive() {
        const { data } = await api.get<PlantationResponse>("/plantations/active");
        return data;
    },

    async getHarvested() {
        const { data } = await api.get<PlantationResponse>("/plantations/harvested");
        return data;
    },

    async getStats() {
        const { data } = await api.get<{ success: boolean; data: PlantationStats }>("/plantations/statistics");
        return data;
    },

    async getByCulture(culture: string) {
        const { data } = await api.get<PlantationResponse>(`/plantations/culture/${culture}`);
        return data;
    }
};