import CategoriesAutoComplete from '@/components/autocompletes/CategoriesAutocomplete';
import MechanicsAutocomplete from '@/components/autocompletes/MechanicsAutocomplete';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import NumericInput from '@/components/inputs/NumericInput';
import { images } from '@/constants/images';
import useFetch from "@/hooks/useFetch";
import { Category, Mechanic } from '@/interfaces';
import { fetchRandomGame } from '@/services/api/game';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Image, Keyboard, ScrollView, Text, TouchableOpacity, View } from 'react-native';


const search = () => {
  const [players, setPlayers] = useState('');
  const [duration, setDuration] = useState('');
  const [age, setAge] = useState('');
  const [selectedMechanics, setSelectedMechanics] = useState<Mechanic[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [resetCounter, setResetCounter] = useState(0);
  const base_url = process.env.EXPO_PUBLIC_API_URL;
  const router = useRouter();

  var requestParams = {
    players: Number(players),
    duration: Number(duration),
    age: Number(age),
    mechanics: selectedMechanics.map(m => m.id),
    categories: selectedCategories.map(c => c.id),
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
    Keyboard.dismiss();
    await loadGame()
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setPlayers('');
        setDuration('');
        setAge('');
        setSelectedMechanics([]);
        setSelectedCategories([]);
        setResetCounter(prev => prev + 1);
      };
    }, [])
  );

  return (

    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="absolute w-full z-0" />
      <Text className="text-3xl font-bold text-white text-center mt-8 mb-6">Quel jeu ce soir ?</Text>
      <ScrollView>
        <View className='p-8 mb-16'>
          <Text className="text-xs text-yellow-200 text-start mb-2">
            Pas d'idée ? Ne remplissez rien et laissez le hasard choisir !
          </Text>
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

          <NumericInput
            placeholder='Âge minimum'
            value={age}
            onChangeText={(text) => setAge(text)}
          />

          <View className='mb-2'>
            <MechanicsAutocomplete
              selected={selectedMechanics}
              onAdd={(m) => setSelectedMechanics((prev) => [...prev, m])}
              onRemove={(m) =>
                setSelectedMechanics((prev) => prev.filter((mech) => mech.id !== m.id))
              }
              resetSignal={resetCounter}
            />
          </View>

          <View className='mb-2'>
            <CategoriesAutoComplete
              selected={selectedCategories}
              onAdd={(c) => setSelectedCategories((prev) => [...prev, c])}
              onRemove={(c) =>
                setSelectedCategories((prev) => prev.filter((cat) => cat.id !== c.id))
              }
              resetSignal={resetCounter}
            />
          </View>

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
                <View className="mt-4 bg-dark-200 rounded-xl p-4 w-11/12 self-center shadow-lg shadow-black/50">

                  <Text className="text-white text-xl font-bold text-center mb-3">
                    {gameResponse.game.name}
                  </Text>

                  <Image
                    source={{ uri: `${base_url}${gameResponse.game.img_path}` }}
                    className="w-full h-48 rounded-lg mb-4"
                    resizeMode="cover"
                  />

                  <View className="flex-row justify-between mt-4">
                    <TouchableOpacity
                      className="flex-1 p-3 mr-2 bg-green-600 rounded-lg shadow-lg items-center"
                      onPress={() => router.push({
                        pathname: '/firstplayer/select/[id]',
                        params: { id: gameResponse.game.id },
                      })}
                    >
                      <Text className="text-white font-semibold">Choisir premier joueur</Text>
                    </TouchableOpacity>


                  </View>
                </View>
              ) : (
                <Text className="text-white">{gameResponse.message}</Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>

  )
}

export default search;