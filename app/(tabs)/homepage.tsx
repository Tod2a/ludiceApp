import GameCard from "@/components/cards/GameCard";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import RenderEmptyGameComponent from "@/components/RenderEmptyGameComponent";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { Game } from "@/interfaces";
import { fetchGames } from "@/services/api/game";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [gamesList, setGamesList] = useState<Game[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const tabBarHeight = useBottomTabBarHeight();

  const {
    data: games,
    loading: gamesLoading,
    error: gamesError,
    refetch: loadGames,
  } = useFetch(() => fetchGames({
    query: searchQuery,
    page: page
  }), true);

  useEffect(() => {
    setPage(1);
    const debouncedSearch = setTimeout(async () => {
      setHasMore(true);
      setGamesList([]);
      await loadGames();
    }, 500);
    return () => clearTimeout(debouncedSearch);
  }, [searchQuery]);

  useEffect(() => {
    if (page !== 1) {
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
    }
  }, [games]);

  const endReached = () => {
    if (hasMore && !gamesLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className="mb-3">
        <Image source={icons.logo} resizeMode='contain' className="w-12 h-16 p-3 mt-10 mb-5 mx-auto" />

        <SearchBar
          placeholder="Rechercher un jeu"
          value={searchQuery}
          onChangeText={(text: string) => setSearchQuery(text)}
        />
      </View>
      <FlatList
        className="my-5"
        data={gamesList}
        renderItem={({ item }: { item: Game }) => <GameCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={endReached}
        onEndReachedThreshold={0.5}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10
        }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: tabBarHeight, }}
        ListEmptyComponent={
          gamesLoading
            ? () => <CustomActivityIndicator />
            : gamesError
              ? () => <Text className="text-white font-bold text-lg mt-5 mb-3 mx-auto">
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
