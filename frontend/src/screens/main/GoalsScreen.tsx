import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, FAB, Card, Portal, Modal, TextInput, Button, useTheme, ProgressBar, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { goalsService } from '../../services/goalsService';
import { useFocusEffect } from '@react-navigation/native';

const GoalsScreen = () => {
    const theme = useTheme();
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [target, setTarget] = useState('');
    const [points, setPoints] = useState('10');

    const fetchGoals = async () => {
        setLoading(true);
        try {
            const data = await goalsService.getGoals();
            setGoals(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchGoals();
        }, [])
    );

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const handleAddGoal = async () => {
        if (!title) {
            Alert.alert('Error', 'Please enter a title');
            return;
        }
        try {
            await goalsService.createGoal({
                title,
                targetValue: parseInt(target) || 1,
                points: parseInt(points) || 10,
                currentValue: 0,
                isRecursive: false // Default for now
            });
            hideModal();
            setTitle('');
            setTarget('');
            fetchGoals();
        } catch (e) {
            Alert.alert('Error', 'Could not create goal');
        }
    };

    const handleDelete = async (id: string) => {
        Alert.alert('Delete Goal', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete', style: 'destructive', onPress: async () => {
                    try {
                        await goalsService.deleteGoal(id);
                        fetchGoals();
                    } catch (e) {
                        Alert.alert('Error', 'Could not delete');
                    }
                }
            }
        ]);
    };

    const handleIncrement = async (goal: any) => {
        // Simple increment logic
        const newValue = goal.currentValue + 1;
        try {
            await goalsService.updateGoal(goal.id, { currentValue: newValue });
            fetchGoals();
        } catch (e) {
            console.error(e);
        }
    };

    const renderItem = ({ item }: any) => {
        const progress = item.targetValue > 0 ? item.currentValue / item.targetValue : 0;

        return (
            <Card style={styles.card}>
                <Card.Title
                    title={item.title}
                    subtitle={`Points: ${item.points}`}
                    right={(props) => <IconButton {...props} icon="delete" onPress={() => handleDelete(item.id)} />}
                />
                <Card.Content>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <Text>Progress: {item.currentValue} / {item.targetValue}</Text>
                        <Text>{Math.round(progress * 100)}%</Text>
                    </View>
                    <ProgressBar progress={progress} color={theme.colors.primary} style={{ height: 8, borderRadius: 5 }} />

                    <Button mode="contained-tonal" style={{ marginTop: 10 }} onPress={() => handleIncrement(item)}>
                        +1 Progress
                    </Button>
                </Card.Content>
            </Card>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text variant="headlineMedium" style={styles.header}>My Goals 🎯</Text>

            <FlatList
                data={goals}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
                contentContainerStyle={styles.list}
                refreshing={loading}
                onRefresh={fetchGoals}
            />

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <Text variant="titleLarge" style={{ marginBottom: 20 }}>New Goal</Text>
                    <TextInput label="Goal Title" value={title} onChangeText={setTitle} style={styles.input} />
                    <TextInput label="Target Value (e.g. 5 times)" value={target} onChangeText={setTarget} keyboardType="numeric" style={styles.input} />
                    <TextInput label="Points Reward" value={points} onChangeText={setPoints} keyboardType="numeric" style={styles.input} />

                    <Button mode="contained" onPress={handleAddGoal} style={{ marginTop: 10 }}>
                        Create Goal
                    </Button>
                </Modal>
            </Portal>

            <FAB
                icon="plus"
                style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                onPress={showModal}
                color="white"
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
    header: {
        padding: 20,
        fontWeight: 'bold'
    },
    list: {
        padding: 20,
        paddingBottom: 80
    },
    card: {
        marginBottom: 15,
        backgroundColor: 'white'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10
    },
    input: {
        marginBottom: 10,
        backgroundColor: 'transparent'
    }
});

export default GoalsScreen;
