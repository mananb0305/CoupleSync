import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, TextInput, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import { coupleService } from '../../services/coupleService';

const CouplePairingScreen = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateCouple = async () => {
        setLoading(true);
        try {
            await coupleService.createCouple();
            Alert.alert('Success', 'Couple created! Ask your partner to join.');
            await updateUser();
        } catch (e) {
            Alert.alert('Error', 'Failed to create couple');
        } finally {
            setLoading(false);
        }
    };

    const handleInvite = async () => {
        setLoading(true);
        try {
            // This is "Link Partner" / "Invite"
            await coupleService.invitePartner(email);
            Alert.alert('Invite Sent', `Invited ${email}`);
            await updateUser();
        } catch (e) {
            Alert.alert('Error', 'Failed to send invite');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>Connect with Partner ❤️</Text>

            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleMedium">Create New Couple</Text>
                    <Text variant="bodySmall" style={{ marginBottom: 10 }}>If you are the first one here.</Text>
                    <Button mode="contained" onPress={handleCreateCouple} loading={loading} disabled={loading}>
                        Start a Couple
                    </Button>
                </Card.Content>
            </Card>

            <Text style={{ textAlign: 'center', marginVertical: 20 }}>OR</Text>

            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleMedium">Invite/Link Partner</Text>
                    <Text variant="bodySmall" style={{ marginBottom: 10 }}>Enter your partner's email to link.</Text>
                    <TextInput
                        label="Partner Email"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        autoCapitalize="none"
                        style={{ marginBottom: 10 }}
                    />
                    <Button mode="outlined" onPress={handleInvite} loading={loading} disabled={loading}>
                        Send Invite
                    </Button>
                </Card.Content>
            </Card>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#F7F9FC',
    },
    title: {
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: 'bold',
    },
    card: {
        marginBottom: 20
    }
});

export default CouplePairingScreen;
