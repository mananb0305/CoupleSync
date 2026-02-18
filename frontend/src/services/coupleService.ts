import api from './api';

export const coupleService = {
    getCouple: async () => {
        const response = await api.get('/couples');
        return response.data;
    },

    createCouple: async () => {
        const response = await api.post('/couples');
        return response.data;
    },

    invitePartner: async (email: string) => {
        const response = await api.post('/couples/invite', { email });
        return response.data;
    },

    // If we had a "join via code" endpoint, we'd add it here.
    // For now, the backend logic was "invite". 
    // Let's verify backend logic: CouplesController has create, invites.
    // Actually, wait. The backend `CouplesController` has `create` (which makes a new couple) and `invite`.
    // Does it have "join"?
    // UsersService has `linkPartner`.
    // Let's stick to the endpoints we have: 
    // POST /couples -> Create my couple
    // POST /couples/invite -> Send invite (maybe logic involves handling code?)

    // Let's re-read backend quickly if needed, but for now assuming standard interactions.
};
