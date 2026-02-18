import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const commonColors = {
    primary: '#FF6B6B',
    accent: '#4ECDC4',
    error: '#B00020',
};

export const lightTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        ...commonColors,
        background: '#F7F9FC',
        surface: '#FFFFFF',
    },
    roundness: 12,
};

export const darkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        ...commonColors,
        primary: '#FF8E8E', // Lighter for dark mode
        background: '#121212',
        surface: '#1E1E1E',
    },
    roundness: 12,
};
