import api from "./api";

export interface Plantation {
    id: number;
    user_id: number;
    culture: string;
    plantingDate: string;
    harvestDate: string;
    isHarvested: boolean;
}

export const plantationService = {
    async getAll() {
        const { data } = await api.get<Plantation[]>("/plantations");
        return data;
    },

    async create(plantation: {
        culture: string;
        plantingDate: string;
        harvestDate: string;
    }) {
        const { data } = await api.post("/plantations", plantation);
        return data;
    },

    async update(
        id: number,
        plantation: Partial<{
            culture: string;
            plantingDate: string;
            harvestDate: string;
            isHarvested: boolean;
        }>
    ) {
        const { data } = await api.put(`/plantations/${id}`, plantation);
        return data;
    },

    async delete(id: number) {
        const { data } = await api.delete(`/plantations/${id}`);
        return data;
    },
};