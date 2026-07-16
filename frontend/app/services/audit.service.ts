import api from "./api";

export interface AuditLog {
    id: number;
    user_id: number;
    table_name: string;
    record_id: number;
    action: 'CREATE' | 'UPDATE' | 'DELETE';
    old_values: any;
    new_values: any;
    ip_address: string;
    user_agent: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuditLogResponse {
    success: boolean;
    data: AuditLog[];
    total?: number;
    page?: number;
    totalPages?: number;
}


export const auditService = {

    async getAll(params?: {
        page?: number;
        limit?: number;
        table_name?: string;
        action?: string;
        startDate?: string;
        endDate?: string;
    }) {
        const { data } = await api.get<AuditLogResponse>("/audit-logs", { params });
        return data;
    }

};