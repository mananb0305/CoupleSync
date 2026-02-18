import api from './api';

export const tasksService = {
    getTasks: async () => {
        const response = await api.get('/tasks');
        return response.data;
    },

    createTask: async (data: any) => {
        const response = await api.post('/tasks', data);
        return response.data;
    },

    updateTask: async (id: string, data: any) => {
        const response = await api.patch(`/tasks/${id}`, data);
        return response.data;
    },

    deleteTask: async (id: string) => {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    }
};
