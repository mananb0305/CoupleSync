import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService, User } from '../services/authService';

interface AuthContextType {
    userToken: string | null;
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const updateUser = async () => {
        try {
            const userData = await authService.getProfile();
            setUser(userData);
        } catch (e) {
            console.error('Failed to fetch profile', e);
        }
    };

    useEffect(() => {
        const bootstrapAsync = async () => {
            let token = null;
            try {
                token = await AsyncStorage.getItem('userToken');
                if (token) {
                    setUserToken(token);
                    // We need to fetch profile AFTER setting token in api interceptor?
                    // Actually, the interceptor reads from AsyncStorage. 
                    // But we should await a bit or just call getProfile.
                    // Best to just rely on interceptor.
                }
            } catch (e) {
                // Validation failed
            }

            if (token) {
                try {
                    // We force a small delay or just call it. Api interceptor reads Async storage so it should be fine.
                    const userData = await authService.getProfile();
                    setUser(userData);
                } catch (error) {
                    // Token might be expired
                    setUserToken(null);
                    await AsyncStorage.removeItem('userToken');
                }
            }

            setIsLoading(false);
        };

        bootstrapAsync();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const data = await authService.login(email, password);
            if (data.access_token) {
                await AsyncStorage.setItem('userToken', data.access_token);
                setUserToken(data.access_token);
                // Fetch profile
                const userData = await authService.getProfile();
                setUser(userData);
            }
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        try {
            const data = await authService.register(name, email, password);
            // Registration typically returns access_token too in our implementation?
            // If not, we might need to login.
            // Let's assume it does or we auto-login.
            if (data.access_token) {
                await AsyncStorage.setItem('userToken', data.access_token);
                setUserToken(data.access_token);
                const userData = await authService.getProfile();
                setUser(userData);
            }
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await AsyncStorage.removeItem('userToken');
            setUserToken(null);
            setUser(null);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ userToken, user, isLoading, login, register, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};
