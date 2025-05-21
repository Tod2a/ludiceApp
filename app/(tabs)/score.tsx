import LibraryGamesAutoComplete from '@/components/autocompletes/LibraryGamesAutocomplete'
import CustomActivityIndicator from '@/components/CustomActivityIndicator'
import { images } from '@/constants/images'
import useFetch from '@/hooks/useFetch'
import { Game, ScoreSheet } from '@/interfaces'
import { fetchScore } from '@/services/api/score'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'

const score = () => {
  const [searchGame, setSearchGame] = useState<Game | null>(null);
  const {
    data: scheets,
    loading,
    error,
    refetch: loadScores,
  } = useFetch(() => fetchScore(searchGame?.id), true);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  useEffect(() => {
    loadScores();
  }, [searchGame]);

  const onAdd = (g: Game) => {
    setSearchGame(g);
  };

  return (

    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="absolute w-full z-0" />
      {loading ? (
        <CustomActivityIndicator />
      ) : error ? (
        <Text className='text-white'>Error Server</Text>
      ) : (
        <ScrollView contentContainerStyle={{
          flexGrow: 1,
          alignContent: 'center',
          marginHorizontal: 10,
          marginTop: 40,
          paddingBottom: 120,
        }}>
          <Text className="text-2xl font-bold text-white text-center mb-6">
            Vos scores enregistrés
          </Text>

          <View className='pb-4'>
            <LibraryGamesAutoComplete onAdd={onAdd} />
            {searchGame && (
              <Text
                onPress={() => setSearchGame(null)}
                className="text-yellow-100 text-right mt-2 underline"
              >
                Annuler la recherche
              </Text>
            )}
          </View>

          {scheets?.data?.map((sheet: ScoreSheet) => (
            <View
              key={sheet.id}
              className="bg-white/10 rounded-2xl p-4 mb-4 border border-white/20"
            >
              <Text className="text-white text-xl font-semibold mb-1">
                {sheet.game.name}
              </Text>
              <Text className="text-white text-sm mb-3">
                {formatDate(sheet.created_at)}
              </Text>

              {(() => {
                const scoresByPlayer: Record<string, number> = {};

                sheet.sections.forEach((section) => {
                  const participant = section.user?.name || section.guest?.name || 'Inconnu';

                  if (!scoresByPlayer[participant]) {
                    scoresByPlayer[participant] = 0;
                  }

                  scoresByPlayer[participant] += section.score;
                });

                return Object.entries(scoresByPlayer).map(([name, totalScore]) => (
                  <Text key={name} className="text-white ml-2">
                    - {name} : {totalScore} pts
                  </Text>
                ));
              })()}
            </View>
          ))}
        </ScrollView>
      )
      }
    </View >

  )
}

export default score