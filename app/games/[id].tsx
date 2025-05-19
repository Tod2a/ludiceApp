
import GameInfo from '@/components/GameInfo';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchGamesDetails } from '@/services/api/game';
import { storeGameLibrary } from '@/services/api/library';
import useFetch from '@/services/useFetch';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const GameDetails = () => {

    const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'https://ludice.app/';
    const { id } = useLocalSearchParams();
    const { data: game, loading } = useFetch(() => fetchGamesDetails(id as string));
    const router = useRouter();

    const addLibrary = async () => {
        await storeGameLibrary(id as string);
    }

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-primary">
                <ActivityIndicator size="large" color="#fff" />
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
                    <View >
                        <TouchableOpacity
                            className="bg-green-200 rounded-lg py-3.5 items-center justify-center z-50"
                            onPress={addLibrary}
                        >
                            <Text className="font-semibold text-base">Ajouter à votre Ludothèque</Text>
                        </TouchableOpacity>
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

            <TouchableOpacity
                className="absolute bottom-5 left-0 right-0 mx-5 bg-green-400 rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
                onPress={router.back}
            >
                <Image
                    source={icons.arrow}
                    className="size-5 mr-1 mt-0.5 rotate-180"
                    tintColor="#fff"
                />
                <Text className="text-white font-semibold text-base">Retour</Text>
            </TouchableOpacity>

        </View>
    );
};

export default GameDetails;