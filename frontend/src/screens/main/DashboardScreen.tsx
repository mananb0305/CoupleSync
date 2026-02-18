import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Card, Avatar, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AuthContext } from '../../context/AuthContext';
import { goalsService } from '../../services/goalsService';
import { tasksService } from '../../services/tasksService';

const DashboardScreen = ({ navigation }: any) => {
    const { user, logout } = useContext(AuthContext);
    const theme = useTheme();
    const [goals, setGoals] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const goalsData = await goalsService.getGoals();
                setGoals(goalsData);

                const tasksData = await tasksService.getTasks();
                setTasks(tasksData);
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
    }, []);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
                <View>
                    <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>Hello, {user?.firstName || 'Love'}! 👋</Text>
                    <Text variant="bodyMedium" style={{ color: 'gray' }}>Your shared space</Text>
                </View>
                <Avatar.Image size={40} source={{ uri: 'https://i.pravatar.cc/150?img=5' }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Quick Stats or Streak */}
                <Animated.View entering={FadeInDown.delay(100).springify()}>
                    <Card style={[styles.card, { backgroundColor: theme.colors.primaryContainer }]}>
                        <Card.Content>
                            <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>Current Streak 🔥</Text>
                            <Text variant="displaySmall" style={{ color: theme.colors.primary }}>3 Days</Text>
                            <Text variant="bodySmall">Keep it up together!</Text>
                        </Card.Content>
                    </Card>
                </Animated.View>

                {/* Pending Tasks */}
                <Text variant="titleMedium" style={styles.sectionTitle}>Shared Tasks</Text>
                {tasks.length === 0 ? (
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text>No tasks yet. Add one!</Text>
                        </Card.Content>
                    </Card>
                ) : (
                    tasks.slice(0, 3).map((task: any, index) => (
                        <Animated.View key={task.id} entering={FadeInDown.delay(index * 100 + 200).springify()}>
                            <Card style={styles.card}>
                                <Card.Title
                                    title={task.title}
                                    subtitle={task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                                    left={(props) => <Avatar.Icon {...props} icon="checkbox-blank-circle-outline" size={30} />}
                                />
                            </Card>
                        </Animated.View>
                    ))
                )}

                {/* Active Goals */}
                <Text variant="titleMedium" style={styles.sectionTitle}>Your Goals</Text>
                {goals.length === 0 ? (
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text>Set a personal goal to start.</Text>
                        </Card.Content>
                    </Card>
                ) : (
                    goals.slice(0, 3).map((goal: any, index) => (
                        <Animated.View key={goal.id} entering={FadeInDown.delay(index * 100 + 500).springify()}>
                            <Card style={styles.card}>
                                <Card.Title title={goal.title} />
                                <Card.Content>
                                    <Text>Target: {goal.targetValue}</Text>
                                </Card.Content>
                            </Card>
                        </Animated.View>
                    ))
                )}

                <Button mode="outlined" onPress={logout} style={{ marginTop: 20 }}>
                    Logout
                </Button>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        elevation: 2
    },
    scrollContent: {
        padding: 20
    },
    card: {
        marginBottom: 15,
        borderRadius: 12
    },
    sectionTitle: {
        marginBottom: 10,
        marginTop: 5,
        fontWeight: 'bold'
    }
});

export default DashboardScreen;
