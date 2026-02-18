import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import CouplePairingScreen from '../screens/auth/CouplePairingScreen';
import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { userToken, user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {userToken == null ? (
                // Auth Stack
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </>
            ) : (
                // Authenticated Stack
                <>
                    {!user?.coupleId ? (
                        <Stack.Screen name="CouplePairing" component={CouplePairingScreen} />
                    ) : (
                        <Stack.Screen name="Main" component={MainTabNavigator} />
                    )}
                </>
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;
