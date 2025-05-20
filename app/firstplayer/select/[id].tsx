import GuestAutomcomplete from '@/components/autocompletes/GuestAutocomplete';
import BackMenuButton from '@/components/buttons/BackMenuButton';
import { images } from '@/constants/images';
import useFetch from '@/hooks/useFetch';
import { Guest } from '@/interfaces';
import { fetchGamesDetails } from '@/services/api/game';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const SelectFirstPlayer = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const base_url = process.env.EXPO_PUBLIC_API_URL;
    const { data: game, loading } = useFetch(() => fetchGamesDetails(id as string));

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
                        <TouchableOpacity onPress={() => console.log('create')}>
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

            <BackMenuButton onPress={() => { router.push('/') }} text="Retour à l'accueil" />
        </View>
    )
}

export default SelectFirstPlayer