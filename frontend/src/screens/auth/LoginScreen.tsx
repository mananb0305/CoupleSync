import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading } = useContext(AuthContext);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            await login(email, password);
        } catch (e) {
            Alert.alert('Login Failed', 'Please check your credentials and try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>Welcome Back! 👋</Text>

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
                onPress={handleLogin}
                style={styles.button}
                loading={isLoading}
                disabled={isLoading}
            >
                Login
            </Button>

            <Button onPress={() => navigation.navigate('Register')}>
                Create an Account
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

export default LoginScreen;
