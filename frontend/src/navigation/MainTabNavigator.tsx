import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import DashboardScreen from '../screens/main/DashboardScreen';
import GoalsScreen from '../screens/main/GoalsScreen';
import TasksScreen from '../screens/main/TasksScreen';
import EventsScreen from '../screens/main/EventsScreen';
import AffectionScreen from '../screens/main/AffectionScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    const theme = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ color, size }) => {
                    let iconName = 'circle';

                    if (route.name === 'Dashboard') {
                        iconName = 'home-heart';
                    } else if (route.name === 'Goals') {
                        iconName = 'target';
                    } else if (route.name === 'Tasks') {
                        iconName = 'checkbox-multiple-marked-outline';
                    } else if (route.name === 'Calendar') {
                        iconName = 'calendar-heart';
                    } else if (route.name === 'Affection') {
                        iconName = 'heart-pulse';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Goals" component={GoalsScreen} />
            <Tab.Screen name="Tasks" component={TasksScreen} />
            <Tab.Screen name="Calendar" component={EventsScreen} />
            <Tab.Screen name="Affection" component={AffectionScreen} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
