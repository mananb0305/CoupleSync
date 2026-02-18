import api from './api';

export const eventsService = {
    getEvents: async () => {
        const response = await api.get('/events');
        return response.data;
    },

    createEvent: async (data: any) => {
        const response = await api.post('/events', data);
        return response.data;
    },

    deleteEvent: async (id: string) => {
        const response = await api.delete(`/events/${id}`);
        return response.data;
    }
};
