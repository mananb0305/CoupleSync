import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace with your local IP address for physical device or 10.0.2.2 for Android Emulator
const API_URL = 'http://10.0.2.2:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
