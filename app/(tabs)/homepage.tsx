import GameCard from "@/components/GameCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Game } from "@/interfaces";
import { fetchGames } from "@/services/api/game";
import useFetch from "@/services/useFetch";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";


export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const tabBarHeight = useBottomTabBarHeight();

  const {
    data: games,
    loading: gamesLoading,
    error: gamesError,
    refetch: loadGames,
  } = useFetch(() => fetchGames({
    query: searchQuery
  }), true);

  useEffect(() => {
    const debouncedSearch = setTimeout(async () => {
      await loadGames();
    }, 500);
    return () => clearTimeout(debouncedSearch);
  }, [searchQuery]);

  const renderEmptyComponent = () => {
    if (gamesLoading || gamesError) return null;
    return (
      <View className="mt-10 px-5">
        <Text className="text-center text-gray-400">
          {searchQuery.trim() ? 'No games found' : 'Search for a game'}
        </Text>
      </View>
    );
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
        data={games?.data || []}
        renderItem={({ item }: { item: Game }) => (
          <GameCard {...item} />
        )}
        keyExtractor={(item) => item.id.toString()}
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
            ? () => <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
            : gamesError
              ? () => <Text className="text-white font-bold text-lg mt-5 mb-3 mx-auto">
                Error: {gamesError?.message}
              </Text>
              : renderEmptyComponent
        }
      />
    </View>
  );
}
