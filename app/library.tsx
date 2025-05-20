import LibraryCard from '@/components/LibraryCard';
import RenderEmptyGameComponent from '@/components/RenderEmptyGameComponent';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import useFetch from '@/hooks/useFetch';
import { Game } from '@/interfaces';
import { fetchLibraryGames } from '@/services/api/library';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const library = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const {
        data: games,
        loading: loading,
        error: error,
        refetch: loadGames,
    } = useFetch(() => fetchLibraryGames({
        query: searchQuery
    }), true);

    useEffect(() => {
        const debouncedSearch = setTimeout(async () => {
            await loadGames();
        }, 500);

        return () => clearTimeout(debouncedSearch);
    }, [searchQuery])

    return (
        <View className='flex-1 bg-primary'>
            <Image source={images.bg} className="absolute w-full z-0" />
            <View className='mb-3'>
                <Text className="text-3xl font-bold text-white text-center mt-8 mb-6">Votre Ludothèque</Text>

                <SearchBar
                    placeholder="Rechercher un jeu"
                    value={searchQuery}
                    onChangeText={(text: string) => setSearchQuery(text)}
                />

                <Text className='text-yellow-200 ml-2 mt-2'>Nombre de jeux: {games?.count}</Text>
            </View>
            <FlatList
                className="my-5"
                data={games?.library?.data || []}
                renderItem={({ item }: { item: Game }) => (
                    <LibraryCard {...item} onRemove={loadGames} />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10
                }}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20, }}
                ListEmptyComponent={
                    loading
                        ? () => <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
                        : error
                            ? () => <Text className="text-white font-bold text-lg mt-5 mb-3 mx-auto">
                                Error: {error?.message}
                            </Text>
                            : <RenderEmptyGameComponent
                                loading={loading}
                                error={!!error}
                                searchQuery={searchQuery}
                            />
                }
            />

            <TouchableOpacity
                className="absolute bottom-5 left-0 right-0 mx-5 bg-green-400 rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
                onPress={() => router.push('/(tabs)/homepage')}
            >
                <Image
                    source={icons.arrow}
                    className="size-5 mr-1 mt-0.5 rotate-180"
                    tintColor="#fff"
                />
                <Text className="text-white font-semibold text-base">Retour à l’écran d’accueil</Text>
            </TouchableOpacity>
        </View>
    )
}

export default library