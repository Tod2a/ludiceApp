import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchGames } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: games,
    loading: gamesLoading,
    error: gamesError
  } = useFetch(() => fetchGames({
    query: ''
  }))

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
        <Image source={icons.logo} resizeMode='contain' className="w-12 h-16 p-3 mt-20 mb-5 mx-auto" />

        {gamesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : gamesError ? (
          <Text className="text-lg text-white font-bold mt-5 mb-3">Error: {gamesError?.message}</Text>
        ) :
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a game"
            />

            <>
              <FlatList
                data={games?.data || []}
                renderItem={({ item }) => (
                  <Text className="text-white text-sm">{item.name}</Text>
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        }
      </ScrollView>
    </View>
  );
}
