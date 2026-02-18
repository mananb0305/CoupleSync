import api from './api';

export interface User {
    id: string;
    email: string;
    firstName?: string;
    coupleId?: string;
}

export const authService = {
    login: async (email: string, password: string) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    register: async (name: string, email: string, password: string) => {
        const response = await api.post('/auth/register', { email, password, firstName: name });
        return response.data;
    },

    getProfile: async (): Promise<User> => {
        const response = await api.get('/auth/profile');
        return response.data;
    },

    logout: async () => {
        // Optional
    }
};
