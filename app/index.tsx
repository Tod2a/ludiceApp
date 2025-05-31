import PrimaryButton from '@/components/buttons/PrimaryButton';
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { login } from '@/services/api/auth';
import { isAuthenticated as checkIfAuthenticated } from '@/utils/auth';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Linking, ScrollView, Text, TextInput, View } from 'react-native';
import { logEvent } from '../utils/firebaseWrapper';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        logEvent('app_start');
        const checkAuth = async () => {
            const authenticated = await checkIfAuthenticated();
            setIsAuthenticated(authenticated);
            setCheckingAuth(false);
        };
        checkAuth();
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await login({ email, password });
            setIsAuthenticated(true);
        } catch (error: any) {
            Alert.alert('Erreur de connexion', error?.message);
        } finally {
            setLoading(false);
        }
    };

    if (checkingAuth) {
        return (
            <View className='flex-1 justify-center, align-middle'>
                <CustomActivityIndicator />
            </View>
        );
    }

    if (isAuthenticated) {
        return <Redirect href="/(tabs)/homepage" />;
    }

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                <View className='justify-center p-20'>

                    <Image source={icons.logo} resizeMode='contain' className='self-center w-48 h-64' />

                    <Text className='mt-8 mb-4 text-white'>Email:</Text>

                    <TextInput
                        className="border border-dark-100 mb-3 p-2 rounded bg-white"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        editable={!loading}
                    />

                    <Text className='mb-4 text-white'>Password:</Text>

                    <TextInput
                        className="border border-dark-100 mb-3 p-2 rounded bg-white"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        editable={!loading}
                        keyboardType="default"
                        textContentType="password"
                        autoComplete="password"
                    />

                    <View className='mt-6'>
                        <PrimaryButton text={loading ? "Logging in..." : "Login"} onPress={handleLogin} />
                    </View>

                    <Text className='text-white'>
                        Pas encore de compte ? Créez-en un sur
                        <Text className='text-green-200' onPress={() => Linking.openURL('https://ludice.app/register')}> notre site web</Text>
                    </Text>

                </View>
            </ScrollView>
        </View>
    );
}
