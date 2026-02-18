import api from './api';

export const affectionService = {
    getHistory: async () => {
        const response = await api.get('/affection/history');
        return response.data;
    },

    sendReward: async (type: string, message?: string) => {
        const response = await api.post('/affection/send', { type, message });
        return response.data;
    }
};
