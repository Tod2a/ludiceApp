import GuestAutomcomplete from '@/components/autocompletes/GuestAutocomplete';
import BackMenuButton from '@/components/buttons/BackMenuButton';
import NewGuestModal from '@/components/modals/NewGuestModal';
import { images } from '@/constants/images';
import useFetch from '@/hooks/useFetch';
import { Guest, Player } from '@/interfaces';
import { fetchGamesDetails } from '@/services/api/game';
import { storeGuest } from '@/services/api/guest';
import { getUserId, getUserName } from '@/utils/auth';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const SelectFirstPlayer = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const base_url = process.env.EXPO_PUBLIC_API_URL ?? 'https://ludice.app/';
    const { data: game, loading } = useFetch(() => fetchGamesDetails(id as string));
    const [modalVisible, setModalVisible] = useState(false);

    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const user: Player = { id: userId, name: userName, type: "user" };

    const [selectedFirstPlayer, setSelectedFirstPlayer] = useState<Player | null>(null);
    const [selectedGuest, setSelectedGuest] = useState<Guest[]>([]);
    const [resetCounter, setResetCounter] = useState(0);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setSelectedGuest([]);
                setResetCounter(prev => prev + 1);
            };
        }, [])
    )

    useEffect(() => {
        const checkUser = async () => {
            try {
                const name = await getUserName();
                const id = await getUserId();
                setUserName(name as string);
                setUserId(id as string)
            } catch (error) {
                console.error('Failed to fetch user name:', error)
            }
        };

        checkUser();
    }, []);

    const handleCreateGuest = async (name: string) => {
        const newGuest = await storeGuest(name);
        if (newGuest) {
            setSelectedGuest(prev => [...prev, newGuest]);
        }
        setModalVisible(false);
    };

    const selectFirstPlayer = () => {
        const players: Player[] = [
            user,
            ...selectedGuest.map((g) => ({
                id: g.id,
                name: g.name,
                type: 'guest' as const,
            })),
        ];
        const random = players[Math.floor(Math.random() * players.length)];
        setSelectedFirstPlayer(random);
    }

    const navigateCreateScore = () => {
        const players: Player[] = [
            user,
            ...selectedGuest.map((g) => ({
                id: g.id,
                name: g.name,
                type: 'guest' as const,
            })),
        ];

        router.push({
            pathname: '/score/create',
            params: {
                gameId: id as string,
                players: JSON.stringify(players),
            },
        });
    }

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />
            <ScrollView contentContainerStyle={{
                flexGrow: 1,
                alignContent: 'center',
                marginTop: 40,
                paddingBottom: 60,
            }}>

                <View className='mx-5'>
                    <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-l text-yellow-200">Qui va jouer ?</Text>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Text className="text-sm text-yellow-200">Créer un invité</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='mb-2'>
                        <GuestAutomcomplete
                            selected={selectedGuest}
                            onAdd={(g) => setSelectedGuest((prev) => [...prev, g])}
                            onRemove={(g) =>
                                setSelectedGuest((prev) => prev.filter((gue) => gue.id !== g.id))
                            }
                            resetSignal={resetCounter}
                        />
                    </View>
                </View>

                {selectedFirstPlayer ? (
                    <View className="px-5 mt-4 mb-2">
                        <Text className="text-yellow-100 text-center text-lg">
                            Premier joueur : {selectedFirstPlayer.name}
                        </Text>
                    </View>
                ) : (
                    <View className="h-6" />
                )}
                <View className="flex-row justify-between px-5 mt-4 mb-2 gap-4">
                    <TouchableOpacity
                        className="bg-dark-200 px-4 py-3 rounded-xl flex-1"
                        onPress={() => { selectFirstPlayer() }}
                    >
                        <Text className="text-white text-center">Choisir le premier joueur</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-yellow-200 px-4 py-3 rounded-xl flex-1 justify-center"
                        onPress={() => { navigateCreateScore() }}
                    >
                        <Text className="text-dark-100 text-center">Enregistrer le score</Text>
                    </TouchableOpacity>
                </View>

                <View className="my-4 bg-dark-200 rounded-xl p-4 w-11/12 self-center shadow-lg shadow-black/50">
                    <Text className="text-white text-xl font-bold text-center mb-3">
                        {game?.name}
                    </Text>

                    <Image
                        source={{ uri: `${base_url}${game?.img_path}` }}
                        className="w-full h-64 rounded-lg mb-4"
                        resizeMode="contain"
                    />
                </View>
            </ScrollView>

            <NewGuestModal
                visible={modalVisible}
                onConfirm={(n) => { handleCreateGuest(n) }}
                onCancel={() => setModalVisible(false)}
            />

            <BackMenuButton onPress={() => { router.push('/') }} text="Retour à l'accueil" />
        </View>
    )
}

export default SelectFirstPlayer