import LibraryGamesAutoComplete from '@/components/autocompletes/LibraryGamesAutocomplete'
import ScoreCard from '@/components/cards/ScoreCard'
import CustomActivityIndicator from '@/components/CustomActivityIndicator'
import { images } from '@/constants/images'
import useFetch from '@/hooks/useFetch'
import { Game, ScoreSheet } from '@/interfaces'
import { fetchScore } from '@/services/api/score'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, View } from 'react-native'

const score = () => {
  const [searchGame, setSearchGame] = useState<Game | null>(null);
  const [page, setPage] = useState(1);
  const [scores, setScores] = useState<ScoreSheet[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: scheets,
    loading,
    error,
    refetch: loadScores,
  } = useFetch(() => fetchScore(searchGame?.id, page), true);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setScores([]);
    loadScores();
  }, [searchGame]);

  useEffect(() => {
    if (page !== 1) {
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
    }
  }, [scheets]);

  const endReached = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const onAdd = (g: Game) => {
    setSearchGame(g);
  };

  const clearResearch = () => {
    setSearchGame(null);
  };

  return (

    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="absolute w-full z-0" />
      {loading ? (
        <CustomActivityIndicator />
      ) : error ? (
        <Text className='text-white'>Error Server</Text>
      ) : (
        <View className="mx-5 mt-6 pb-16">

          <Text className="text-2xl font-bold text-white text-center mb-6">
            Vos scores enregistrés
          </Text>

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
            contentContainerStyle={{ padding: 2, paddingBottom: 120 }}
            onEndReached={endReached}
            onEndReachedThreshold={0.5}
            numColumns={1}
            ListEmptyComponent={
              loading
                ? () => <CustomActivityIndicator />
                : error
                  ? () => <Text className="text-white font-bold text-lg mt-5 mb-3 mx-auto">
                    Erreur Serveur
                  </Text>
                  : <Text className="text-white text-center mt-10">
                    Aucun score trouvé.
                  </Text>
            }
          />
        </View>

      )
      }
    </View >

  )
}

export default score