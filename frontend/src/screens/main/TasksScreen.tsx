import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, FAB, Card, Portal, Modal, TextInput, Button, useTheme, Avatar, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { tasksService } from '../../services/tasksService';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';

const TasksScreen = () => {
    const theme = useTheme();
    const { user } = React.useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    // Form
    const [title, setTitle] = useState('');
    const [points, setPoints] = useState('20');

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const data = await tasksService.getTasks();
            setTasks(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [])
    );

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const handleAddTask = async () => {
        if (!title) {
            Alert.alert('Error', 'Please enter a title');
            return;
        }
        try {
            await tasksService.createTask({
                title,
                points: parseInt(points) || 20,
                assignedToUserId: null, // Shared pool
                dueDate: new Date().toISOString() // Today
            });
            hideModal();
            setTitle('');
            fetchTasks();
        } catch (e) {
            Alert.alert('Error', 'Could not create task');
        }
    };

    const handleComplete = async (item: any) => {
        try {
            await tasksService.updateTask(item.id, { isCompleted: true });
            fetchTasks();
        } catch (e) {
            Alert.alert('Error', 'Could not complete task');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await tasksService.deleteTask(id);
            fetchTasks();
        } catch (e) {
            console.error(e);
        }
    };

    const renderItem = ({ item, index }: any) => {
        return (
            <Animated.View entering={FadeInDown.delay(index * 100)} layout={Layout.springify()}>
                <Card style={[styles.card, item.isCompleted && { opacity: 0.6 }]}>
                    <Card.Title
                        title={item.title}
                        subtitle={`Points: ${item.points} | ${item.isCompleted ? 'Done' : 'Pending'}`}
                        left={(props) => <Avatar.Icon {...props} icon="checkbox-marked-circle-outline" style={{ backgroundColor: item.isCompleted ? 'green' : theme.colors.primary }} />}
                        right={(props) => !item.isCompleted && <IconButton {...props} icon="check" onPress={() => handleComplete(item)} />}
                    />
                    <Card.Actions>
                        <IconButton icon="delete-outline" onPress={() => handleDelete(item.id)} />
                    </Card.Actions>
                </Card>
            </Animated.View>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text variant="headlineMedium" style={styles.header}>Shared Tasks 📝</Text>

            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
                contentContainerStyle={styles.list}
                refreshing={loading}
                onRefresh={fetchTasks}
            />

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <Text variant="titleLarge" style={{ marginBottom: 20 }}>New Shared Task</Text>
                    <TextInput label="Task Title" value={title} onChangeText={setTitle} style={styles.input} />
                    <TextInput label="Points" value={points} onChangeText={setPoints} keyboardType="numeric" style={styles.input} />

                    <Button mode="contained" onPress={handleAddTask} style={{ marginTop: 10 }}>
                        Add Task
                    </Button>
                </Modal>
            </Portal>

            <FAB
                icon="plus"
                style={[styles.fab, { backgroundColor: theme.colors.accent }]}
                onPress={showModal}
                color="white"
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default TasksScreen;
