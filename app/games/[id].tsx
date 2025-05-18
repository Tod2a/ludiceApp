import GameInfo from '@/components/GameInfo';
import { fetchGamesDetails } from '@/services/api/game';
import useFetch from '@/services/useFetch';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

const GameDetails = () => {

    const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'https://ludice.app/';
    const { id } = useLocalSearchParams();
    const { data: game, loading } = useFetch(() => fetchGamesDetails(id as string));

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
            <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
                <Text className="text-3xl font-bold text-white text-center mt-8 mb-6">{game.name}</Text>

                <View className="flex flex-col md:flex-row bg-dark-200 rounded-lg mx-4 shadow-md overflow-hidden">
                    {/* Image */}
                    <View className="w-full md:w-1/2 items-center justify-center p-4 bg-dark-200">
                        <Image
                            source={{
                                uri: game.img_path
                                    ? `${apiUrl}${game.img_path}`
                                    : 'https://placeholder.co/600x400/1a1a1a/ffffff.png',
                            }}
                            className="w-full h-72 rounded-lg bg-dark-200"
                            resizeMode="contain"
                        />
                    </View>

                    {/* Details */}
                    <View className="w-full md:w-1/2 p-6">
                        <View className="mb-4 space-y-1">
                            <Text className="text-base text-white">
                                <Text className="font-semibold">Joueurs: </Text>
                                {game.min_players} - {game.max_players}
                            </Text>
                            <Text className="text-base text-white">
                                <Text className="font-semibold">Durée: </Text>
                                {game.average_duration} minutes
                            </Text>
                            <Text className="text-base text-white">
                                <Text className="font-semibold">Âge: </Text>
                                {game.suggestedage}+
                            </Text>
                            <Text className="text-base text-white">
                                <Text className="font-semibold">Date de parution: </Text>
                                {game.published_at
                                    ? new Date(game.published_at).toLocaleDateString()
                                    : 'N/A'}
                            </Text>
                            <Text className="text-base text-white">
                                <Text className="font-semibold">Stand Alone: </Text>
                                {game.is_expansion ? 'Non' : 'Oui'}
                            </Text>
                        </View>
                    </View>
                </View>
                <View className=" mx-4 shadow-md p-6">
                    <GameInfo label='Catégories:' value={game?.categories?.map((c) => c.name).join(' - ') || 'N/A'} />
                </View>
                <View className="mt-6 bg-dark-200 rounded-lg mx-4 shadow-md p-6">
                    <Text className="text-base text-white">
                        <Text className="font-semibold">Catégories: </Text>
                        {game.categories?.map(c => c.name).join(', ') || 'N/A'}
                    </Text>
                    <Text className="text-base text-white">
                        <Text className="font-semibold">Mécaniques: </Text>
                        {game.mechanics?.map(m => m.name).join(', ') || 'N/A'}
                    </Text>
                </View>

                <View className="mt-6 bg-dark-200 rounded-lg mx-4 shadow-md p-6">
                    <Text className="text-base text-white">
                        <Text className="font-semibold">Créateurs: </Text>
                        {game.creators
                            ?.map(c => `${c.firstname} ${c.lastname}`)
                            .join(', ') || 'N/A'}
                    </Text>
                    <Text className="text-base text-white">
                        <Text className="font-semibold">Éditeurs: </Text>
                        {game.publishers?.map(p => p.name).join(', ') || 'N/A'}
                    </Text>

                </View>

                <View className="mt-6 bg-dark-200 rounded-lg mx-4 shadow-md p-6">
                    <Text className="text-xl font-semibold mb-2 text-white">Description</Text>
                    <Text className="text-base text-white">{game.description || 'Aucune description.'}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default GameDetails;