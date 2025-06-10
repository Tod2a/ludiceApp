import GameCard from "@/components/cards/GameCard";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import RenderEmptyGameComponent from "@/components/RenderEmptyGameComponent";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { Game } from "@/interfaces";
import { fetchGames } from "@/services/api/game";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [gamesList, setGamesList] = useState<Game[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [firstLoadDone, setFirstLoadDone] = useState(false);
  const isLoadingRef = useRef(false);
  const { width } = useWindowDimensions();
  const logoWidth = Math.max(48, Math.min(120, width * 0.15));
  const logoHeight = logoWidth * (16 / 12);
  const router = useRouter();

  const {
    data: games,
    loading: gamesLoading,
    error: gamesError,
    refetch: loadGames,
  } = useFetch(() => fetchGames({
    query: searchQuery,
    page: page
  }), false);

  useFocusEffect(useCallback(() => {
    resetAndLoad();
  }, []));

  useEffect(() => {
    const timeout = setTimeout(() => {
      resetAndLoad();
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    if (hasMore) {
      loadGames();
    }
  }, [page]);

  useEffect(() => {
    if (games?.data) {
      setGamesList(prevGames => {
        const existingIds = new Set(prevGames.map((g: Game) => g.id));
        const newUniqueGames = (games.data as Game[]).filter((g: Game) => !existingIds.has(g.id));
        return page === 1 ? (games.data as Game[]) : [...prevGames, ...newUniqueGames];
      });
      setHasMore(games.current_page < games.last_page);
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
    if (hasMore && !gamesLoading && !isFetching) {
      setIsFetching(true);
      setPage(page + 1);
    }
  };

  const onScanPress = () => {
    router.push("/scan");
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <View className="mb-3">

        <Image
          source={icons.logo}
          resizeMode="contain"
          className="p-3 mt-10 mb-5 mx-auto"
          style={{ width: logoWidth, height: logoHeight }}
        />

        <View className="mb-3 flex-row items-center px-5">
          <View style={{ flex: 1 }}>
            <SearchBar
              placeholder="Rechercher un jeu"
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
            />
          </View>

          <TouchableOpacity onPress={onScanPress} className="ml-2 bg-dark-200 rounded-full px-5 py-5" >
            <Image source={icons.picture} tintColor="#C1BA3E" className="w-[30px] h-[30px]" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        className="my-5"
        data={gamesList}
        renderItem={({ item }: { item: Game }) => <GameCard {...item} />}
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
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 50 }}
        ListEmptyComponent={
          gamesLoading && gamesList.length < 1
            ? <CustomActivityIndicator />
            : gamesError
              ? <Text className="text-white font-bold text-lg mt-5 mb-3 mx-auto">
                Error: {gamesError?.message}
              </Text>
              : <RenderEmptyGameComponent
                loading={gamesLoading}
                error={!!gamesError}
                searchQuery={searchQuery}
              />
        }
      />
    </View>
  );
}
