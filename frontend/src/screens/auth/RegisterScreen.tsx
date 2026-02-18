import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';

const RegisterScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { register, isLoading } = useContext(AuthContext);

    const handleRegister = async () => {
        if (!email || !password || !name) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            await register(name, email, password);
        } catch (e) {
            Alert.alert('Registration Failed', 'Could not create account. Try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>Create Account ✨</Text>

            <TextInput
                label="Name"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
            />

            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry
                style={styles.input}
            />

            <Button
                mode="contained"
                onPress={handleRegister}
                style={styles.button}
                loading={isLoading}
                disabled={isLoading}
            >
                Sign Up
            </Button>

            <Button onPress={() => navigation.goBack()}>
                Already have an account? Login
            </Button>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 15,
    },
    button: {
        marginTop: 10,
        marginBottom: 20,
        paddingVertical: 5,
    },
});

export default RegisterScreen;
