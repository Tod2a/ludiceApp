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
      <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
        <Text style={{ textAlign: 'center', color: 'gray' }}>
          {searchQuery.trim() ? 'No games found' : 'Search for a game'}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Image source={images.bg} style={{ position: 'absolute', width: '100%', zIndex: 0 }} />
      <View className="mb-3">
        <Image source={icons.logo} resizeMode='contain' style={{ width: 48, height: 64, marginTop: 40, marginBottom: 10, alignSelf: 'center' }} />
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
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: tabBarHeight + 50, }}
        ListEmptyComponent={
          gamesLoading
            ? () => <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 40, alignSelf: 'center' }} />
            : gamesError
              ? () => <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', marginTop: 20, marginBottom: 12 }}>
                Error: {gamesError?.message}
              </Text>
              : renderEmptyComponent
        }
      />
    </View>
  );
}
