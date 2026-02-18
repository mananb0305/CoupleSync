import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, Card, Avatar, useTheme, Button, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { affectionService } from '../../services/affectionService';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';

const AffectionScreen = () => {
    const theme = useTheme();
    const { user } = React.useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const data = await affectionService.getHistory();
            setHistory(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchHistory();
        }, [])
    );

    const sendReward = async (type: string, message: string) => {
        try {
            await affectionService.sendReward(type, message);
            Alert.alert('Sent!', `You sent a ${type} ❤️`);
            fetchHistory();
        } catch (e) {
            Alert.alert('Error', 'Could not send reward');
        }
    };

    const renderItem = ({ item }: any) => {
        // Determine icon based on type
        let icon = 'heart';
        if (item.type === 'kiss') icon = 'lips'; // mdi-lips? or face-kiss? Let's check icons. Using heart for now.
        if (item.type === 'hug') icon = 'human-greeting'; // approximation

        const isMe = item.senderId === user?.id;

        return (
            <Card style={[styles.card, isMe ? styles.myCard : styles.partnerCard]}>
                <Card.Title
                    title={isMe ? `You sent a ${item.type}` : `Partner sent a ${item.type}`}
                    subtitle={new Date(item.createdAt).toLocaleString()}
                    left={(props) => <Avatar.Icon {...props} icon="heart" size={40} style={{ backgroundColor: isMe ? theme.colors.primary : theme.colors.accent }} />}
                />
                {item.message && <Card.Content><Text>{item.message}</Text></Card.Content>}
            </Card>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text variant="headlineMedium" style={styles.header}>Love & Rewards 💖</Text>

            <View style={styles.actions}>
                <Text variant="titleMedium" style={{ marginBottom: 10 }}>Send some love:</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button mode="contained" icon="heart" onPress={() => sendReward('heart', 'Sent you a heart!')}>
                        Heart
                    </Button>
                    <Button mode="contained" icon="star" onPress={() => sendReward('kiss', 'Sent you a kiss!')} buttonColor={theme.colors.accent}>
                        Kiss
                    </Button>
                </View>
            </View>

            <Text variant="titleLarge" style={{ marginLeft: 20, marginTop: 20 }}>History</Text>

            <FlatList
                data={history}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
                contentContainerStyle={styles.list}
                refreshing={loading}
                onRefresh={fetchHistory}
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
        fontWeight: 'bold',
        textAlign: 'center'
    },
    actions: {
        padding: 20,
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 15,
        elevation: 3
    },
    list: {
        padding: 20,
    },
    card: {
        marginBottom: 10,
    },
    myCard: {
        backgroundColor: '#FFE5E5',
        marginLeft: 40
    },
    partnerCard: {
        backgroundColor: '#E5FAFA',
        marginRight: 40
    }
});

export default AffectionScreen;
