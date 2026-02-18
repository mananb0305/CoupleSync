import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, FAB, Card, Portal, Modal, TextInput, Button, useTheme, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { eventsService } from '../../services/eventsService';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';

const EventsScreen = () => {
    const theme = useTheme();
    const { user } = React.useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [markedDates, setMarkedDates] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    // Form
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const data = await eventsService.getEvents();
            setEvents(data);

            // Process markers
            const markers: any = {};
            data.forEach((evt: any) => {
                const date = new Date(evt.startDate).toISOString().split('T')[0];
                markers[date] = { marked: true, dotColor: theme.colors.primary };
            });
            // Highlight selected
            markers[selectedDate] = { ...markers[selectedDate], selected: true, selectedColor: theme.colors.primary };

            setMarkedDates(markers);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchEvents();
        }, [selectedDate]) // Re-fetch or re-process if selected changes? actually fetch is fine
    );

    const onDayPress = (day: any) => {
        setSelectedDate(day.dateString);
        // Update markers to show selection
        const newMarkers = { ...markedDates };
        // Clear old selection if any (complex to track, let's just re-process or simple hack)
        // Re-fetching handles it cleanest for now
        fetchEvents();
    };

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const handleAddEvent = async () => {
        if (!title) {
            Alert.alert('Error', 'Please enter a title');
            return;
        }
        try {
            await eventsService.createEvent({
                title,
                description,
                startDate: new Date(selectedDate).toISOString(),
                isAllDay: true
            });
            hideModal();
            setTitle('');
            setDescription('');
            fetchEvents();
        } catch (e) {
            Alert.alert('Error', 'Could not create event');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await eventsService.deleteEvent(id);
            fetchEvents();
        } catch (e) {
            console.error(e);
        }
    };

    const selectedEvents = events.filter((evt: any) =>
        new Date(evt.startDate).toISOString().split('T')[0] === selectedDate
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text variant="headlineMedium" style={styles.header}>Shared Calendar 📅</Text>

            <Calendar
                onDayPress={onDayPress}
                markedDates={markedDates}
                theme={{
                    todayTextColor: theme.colors.primary,
                    arrowColor: theme.colors.primary,
                }}
            />

            <Text variant="titleMedium" style={{ margin: 20 }}>Events for {selectedDate}</Text>

            <FlatList
                data={selectedEvents}
                keyExtractor={(item: any) => item.id}
                contentContainerStyle={styles.list}
                refreshing={loading}
                onRefresh={fetchEvents}
                ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No events for this day.</Text>}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Title
                            title={item.title}
                            subtitle={item.description}
                            right={(props) => <IconButton {...props} icon="delete-outline" onPress={() => handleDelete(item.id)} />}
                        />
                    </Card>
                )}
            />

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <Text variant="titleLarge" style={{ marginBottom: 20 }}>New Event: {selectedDate}</Text>
                    <TextInput label="Event Title" value={title} onChangeText={setTitle} style={styles.input} />
                    <TextInput label="Description (Optional)" value={description} onChangeText={setDescription} style={styles.input} />

                    <Button mode="contained" onPress={handleAddEvent} style={{ marginTop: 10 }}>
                        Add Event
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
        paddingHorizontal: 20,
        paddingBottom: 80
    },
    card: {
        marginBottom: 10,
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

export default EventsScreen;
