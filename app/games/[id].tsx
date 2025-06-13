import BackMenuButton from '@/components/buttons/BackMenuButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import GameInfo from '@/components/GameInfo';
import { images } from '@/constants/images';
import useFetch from '@/hooks/useFetch';
import { fetchGamesDetails } from '@/services/api/game';
import { storeGameLibrary } from '@/services/api/library';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const GameDetails = () => {

    const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'https://ludice.app/';
    const { id } = useLocalSearchParams();
    const { data: game, loading } = useFetch(() => fetchGamesDetails(id as string));
    const router = useRouter();
    const [inLibrary, setInLibrary] = useState(game?.in_library);

    useEffect(() => {
        setInLibrary(game?.in_library);
    }, [game])

    const addLibrary = async () => {
        const result = await storeGameLibrary(id as string);
        if (result) {
            setInLibrary(true);
        }
    }

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-primary">
                <CustomActivityIndicator />
            </View>
        );
    }

    if (!game) {
        return (
            <View className="flex-1 items-center justify-center bg-primary">
                <Text className="text-white text-lg">Aucun jeu trouvé.</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                <Text className="text-3xl font-bold text-white text-center mt-8 mb-3">{game.name}</Text>

                <View className=" mx-4 shadow-md p-6">
                    <View className='mb-2'>
                        {inLibrary
                            ? <Text className='text-yellow-200 text-center'>Déjà dans la Ludothèque</Text>
                            : <SecondaryButton text='Ajouter à votre Ludothèque' onPress={addLibrary} />
                        }
                    </View>

                    <Image
                        source={{
                            uri: game.img_path
                                ? `${apiUrl}${game.img_path}`
                                : 'https://placeholder.co/600x400/1a1a1a/ffffff.png',
                        }}
                        className="w-full h-72 rounded-lg"
                        resizeMode="contain"
                    />



                    <View className="flex-row justify-between">
                        <View >
                            <GameInfo label='Joueurs: ' value={`${game.min_players}  - ${game.max_players} `} />

                            <GameInfo label='Durée: ' value={`${game.average_duration} minutes`} />
                        </View>

                        <View>
                            <GameInfo label='Âge: ' value={`${game.suggestedage}+ `} />

                            <GameInfo
                                label="Date de parution: "
                                value={
                                    game.published_at
                                        ? new Date(game.published_at).toLocaleDateString()
                                        : 'N/A'
                                }
                            />
                        </View>

                    </View>

                    <GameInfo label='Stand Alone: ' value={game.is_expansion ? 'Non' : 'Oui'} />

                    <GameInfo
                        label="Catégories:"
                        value={game?.categories?.map((c) => c.name) || []}
                    />

                    <GameInfo
                        label="Mécaniques:"
                        value={game?.mechanics?.map((c) => c.name) || []}
                    />

                    <GameInfo
                        label="Créateurs"
                        value={game?.creators?.map((c) => `${c.firstname} ${c.lastname}`).join(' - ') || []}
                    />

                    <GameInfo
                        label="Éditeurs: "
                        value={game?.publishers?.map(p => p.name).join(', ') || []}
                    />

                    <GameInfo
                        label="Description: "
                        value={game.description || 'Aucune description.'}
                    />
                </View>
            </ScrollView>

            <BackMenuButton text='Retour' onPress={router.back} />

        </View>
    );
};

export default GameDetails;