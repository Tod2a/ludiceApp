import PrimaryButton from '@/components/buttons/PrimaryButton';
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import NumericInput from '@/components/inputs/NumericInput';
import { images } from '@/constants/images';
import useFetch from "@/hooks/useFetch";
import { fetchRandomGame } from '@/services/api/game';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';

const search = () => {
  const [players, setPlayers] = useState('');
  const [duration, setDuration] = useState('');

  var requestParams = {
    players: Number(players),
    duration: Number(duration),
  };

  const {
    data: gameResponse,
    loading: loading,
    error: error,
    refetch: loadGame,
  } = useFetch(() => fetchRandomGame({
    requestParams
  }), false);

  const loadRandomGame = async () => {
    await loadGame()
  };

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="absolute w-full z-0" />
      <Text className="text-3xl font-bold text-white text-center mt-8 mb-6">A quoi on joue ?</Text>
      <View style={{ padding: 16 }}>

        <NumericInput
          placeholder='Nombre de joueurs'
          value={players}
          onChangeText={(text) => setPlayers(text)}
        />

        <NumericInput
          placeholder='Temps de jeu'
          value={duration}
          onChangeText={(text) => setDuration(text)}
        />

        <View className='mt-3'>
          <PrimaryButton text='Choisir un jeu aléatoirement' onPress={loadRandomGame} />
        </View>

        {loading &&
          <CustomActivityIndicator />
        }
        {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
        {gameResponse && (
          <View style={{ marginTop: 16 }}>
            {gameResponse.game ? (
              <Text className="text-white">{gameResponse.game.name}</Text>
            ) : (
              <Text className="text-white">{gameResponse.message}</Text>
            )}
          </View>
        )}
      </View>
    </View>
  )
}

export default search