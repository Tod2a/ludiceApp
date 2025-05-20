import { images } from '@/constants/images';
import { Game } from '@/interfaces';
import { fetchRandomGame } from '@/services/api/game';
import React, { useState } from 'react';
import { ActivityIndicator, Button, Image, Text, TextInput, View } from 'react-native';

const search = () => {
  const [players, setPlayers] = useState('');
  const [duration, setDuration] = useState('');
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRandomGame = async () => {
    setLoading(true);
    setError(null);

    try {
      const requestParams = {
        players: Number(players),
        duration: Number(duration),
      };

      const fetchedGame = await fetchRandomGame({ requestParams });
      setGame(fetchedGame);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
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
        {loading && <ActivityIndicator size="large" />}
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        {game && (
          <View style={{ marginTop: 16 }}>
            <Text className='text-white'>{game.name}</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default search