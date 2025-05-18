import { login } from '@/services/api/auth';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Text, TextInput, View } from 'react-native';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkAuthToken = async () => {
            try {
                const token = await SecureStore.getItemAsync('auth_token');
                if (token) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
            } finally {
                setCheckingAuth(false);
            }
        };

        checkAuthToken();
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await login({ email, password });
            setIsAuthenticated(true);
        } catch (error: any) {
            console.log('Login error:', error);
            Alert.alert('Login failed', error?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (checkingAuth) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (isAuthenticated) {
        return <Redirect href="/(tabs)/homepage" />;
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text style={{ marginBottom: 8 }}>Email:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 4, backgroundColor: '#fff' }}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
            />
            <Text style={{ marginBottom: 8 }}>Password:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 4, backgroundColor: '#fff' }}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
            />
            <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} disabled={loading} />
        </View>
    );
}
