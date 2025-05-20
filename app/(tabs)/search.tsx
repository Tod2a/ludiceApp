import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import { images } from '@/constants/images';
import useFetch from "@/hooks/useFetch";
import { fetchRandomGame } from '@/services/api/game';
import React, { useState } from 'react';
import { Button, Image, Text, TextInput, View } from 'react-native';

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
        <TextInput
          placeholder="Number of players"
          value={players}
          onChangeText={(text) => setPlayers(text)}
          keyboardType="numeric"
          className='bg-white'
        />
        <TextInput
          placeholder="Duration"
          value={duration}
          onChangeText={(text) => setDuration(text)}
          keyboardType="numeric"
          className='bg-white'
        />
        <Button title="Get Random Game" onPress={loadRandomGame} />
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