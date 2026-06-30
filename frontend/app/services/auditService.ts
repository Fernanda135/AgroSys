import api from "./api";

export interface AuditLog {
    id: number;
    user_id: number;
    table_name: string;
    record_id: number;
    action: string;
    old_values: any;
    new_values: any;
    ip_address: string;
    user_agent: string;
    createdAt: string;
    updatedAt: string;
}

export const auditService = {
    async getAll() {
        const { data } = await api.get<AuditLog[]>("/auditlogs");
        return data;
    }
};