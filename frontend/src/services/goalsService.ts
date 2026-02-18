import api from './api';

export const goalsService = {
    getGoals: async () => {
        const response = await api.get('/goals');
        return response.data;
    },

    createGoal: async (data: any) => {
        const response = await api.post('/goals', data);
        return response.data;
    },

    updateGoal: async (id: string, data: any) => {
        const response = await api.patch(`/goals/${id}`, data);
        return response.data;
    },

    deleteGoal: async (id: string) => {
        const response = await api.delete(`/goals/${id}`);
        return response.data;
    }
};
