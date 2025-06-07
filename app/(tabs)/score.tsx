import LibraryGamesAutoComplete from '@/components/autocompletes/LibraryGamesAutocomplete'
import LinkButton from '@/components/buttons/LinkButton'
import ScoreCard from '@/components/cards/ScoreCard'
import CustomActivityIndicator from '@/components/CustomActivityIndicator'
import { images } from '@/constants/images'
import useFetch from '@/hooks/useFetch'
import { Game, ScoreSheet } from '@/interfaces'
import { fetchScore } from '@/services/api/score'
import { useFocusEffect } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Image, Text, View } from 'react-native'

const Score = () => {
  const [searchGame, setSearchGame] = useState<Game | null>(null);
  const [page, setPage] = useState(1);
  const [scores, setScores] = useState<ScoreSheet[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [firstLoadDone, setFirstLoadDone] = useState(false);
  const router = useRouter();

  const {
    data: scheets,
    loading,
    error,
    refetch: loadScores,
  } = useFetch(() => fetchScore(searchGame?.id, page), false);

  useFocusEffect(
    useCallback(() => {
      resetAndLoad();
    }, [searchGame])
  );

  useEffect(() => {
    if (hasMore) {
      loadScores();
    }
  }, [page]);

  useEffect(() => {
    if (scheets?.data) {
      setScores((prevScores: ScoreSheet[]) => {
        const existingIds = new Set(prevScores.map((s: ScoreSheet) => s.id));
        const newUniqueScores = (scheets.data as ScoreSheet[]).filter((s: ScoreSheet) => !existingIds.has(s.id));
        return page === 1 ? (scheets.data as ScoreSheet[]) : [...prevScores, ...newUniqueScores];
      });
      setHasMore(scheets.current_page < scheets.last_page);
      setFirstLoadDone(true);
      setIsFetching(false);
    }
  }, [scheets]);

  const endReached = () => {
    if (!firstLoadDone) return;
    if (hasMore && !loading && !isFetching) {
      setIsFetching(true);
      setPage(page + 1);
    }
  };

  const onAdd = (g: Game) => {
    setSearchGame(g);
    setPage(1);
    setScores([]);
    setHasMore(true);
  };

  const clearResearch = () => {
    setSearchGame(null);
    resetAndLoad();
  };

  const resetAndLoad = () => {
    setPage(1);
    setScores([]);
    setHasMore(true);
    setIsFetching(true);
    loadScores();
  };

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="absolute w-full z-0" />

      <Text className="text-2xl font-bold text-white text-center mt-10 mb-6">
        Vos scores enregistrés
      </Text>

      <View className='mb-2 mx-2'>
        <LinkButton onPress={() => { router.push("/game-prep/game") }} text='Enregistrer un score' />
      </View>

      <View className='pb-4'>
        <LibraryGamesAutoComplete onAdd={onAdd} />
        {searchGame && (
          <Text
            onPress={clearResearch}
            className="text-yellow-100 text-right mt-2 underline"
          >
            Annuler la recherche
          </Text>
        )}
      </View>

      <FlatList
        data={scores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ScoreCard sheet={item} />}
        contentContainerStyle={{ padding: 2, paddingBottom: 60 }}
        onEndReached={endReached}
        onEndReachedThreshold={0.5}
        numColumns={1}
        initialNumToRender={10}
        ListEmptyComponent={
          loading && page === 1 ? (
            <CustomActivityIndicator />
          ) : (
            <Text className="text-white text-center mt-10">
              Aucun score trouvé.
            </Text>
          )
        }
      />
    </View>
  );
};

export default Score;
