import BackMenuButton from '@/components/buttons/BackMenuButton';
import LibraryCard from '@/components/cards/LibraryCard';
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import RenderEmptyGameComponent from '@/components/RenderEmptyGameComponent';
import SearchBar from '@/components/SearchBar';
import { images } from '@/constants/images';
import useFetch from '@/hooks/useFetch';
import { Game } from '@/interfaces';
import { fetchLibraryGames } from '@/services/api/library';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';

const Library = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [gamesList, setGamesList] = useState<Game[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [firstLoadDone, setFirstLoadDone] = useState(false);
    const isLoadingRef = useRef(false);

    const {
        data: games,
        loading,
        error,
        refetch: loadGames,
    } = useFetch(() => fetchLibraryGames({
        query: searchQuery,
        page: page
    }), false);

    useFocusEffect(useCallback(() => {
        resetAndLoad();
    }, []));

    useEffect(() => {
        const debouncedSearch = setTimeout(() => {
            resetAndLoad();
        }, 500);
        return () => clearTimeout(debouncedSearch);
    }, [searchQuery]);

    useEffect(() => {
        if (hasMore) {
            loadGames();
        }
    }, [page]);

    useEffect(() => {
        if (games?.library?.data) {
            setGamesList(prevGames => {
                const existingIds = new Set(prevGames.map((g: Game) => g.id));
                const newUniqueGames = (games.library.data as Game[]).filter((g: Game) => !existingIds.has(g.id));
                return page === 1 ? (games.library.data as Game[]) : [...prevGames, ...newUniqueGames];
            });
            setHasMore(games.library.current_page < games.library.last_page);
            setFirstLoadDone(true);
            setIsFetching(false);
        }
    }, [games]);

    const resetAndLoad = () => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setPage(1);
        setGamesList([]);
        setHasMore(true);
        setIsFetching(true);
        loadGames();
        setTimeout(() => { isLoadingRef.current = false }, 1000);
    };

    const endReached = () => {
        if (!firstLoadDone) return;
        if (hasMore && !loading && !isFetching) {
            setIsFetching(true);
            setPage(page + 1);
        }
    };

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
                data={gamesList}
                renderItem={({ item }: { item: Game }) => <LibraryCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={endReached}
                onEndReachedThreshold={0.1}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10
                }}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
                ListEmptyComponent={
                    loading
                        ? <CustomActivityIndicator />
                        : error
                            ? <Text className="text-white font-bold text-lg mt-5 mb-3 mx-auto">
                                Error: {error?.message}
                            </Text>
                            : <RenderEmptyGameComponent
                                loading={loading}
                                error={!!error}
                                searchQuery={searchQuery}
                            />
                }
            />
            <BackMenuButton text='Retour à l’écran d’accueil' onPress={() => router.push('/(tabs)/homepage')} />
        </View>
    );
};

export default Library;
