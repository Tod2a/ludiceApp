import GamesAutoComplete from '@/components/autocompletes/LibraryGamesAutocomplete'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Game } from '@/interfaces'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const index = () => {
    const router = useRouter();

    const onAdd = (g: Game) => {
        router.push({
            pathname: '/firstplayer/select/[id]',
            params: { id: g.id },
        })
    };

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />

            <ScrollView contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 60,
            }}>
                <View className='p-20'>
                    <Text className='text-yellow-200'>Pour quel jeu voulez-vous sélectionner le premier joueur?</Text>
                    <View className='pt-2'>
                        <GamesAutoComplete onAdd={onAdd} />
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity
                className="absolute bottom-5 left-0 right-0 mx-5 bg-green-400 rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
                onPress={router.back}
            >
                <Image
                    source={icons.arrow}
                    className="size-5 mr-1 mt-0.5 rotate-180"
                    tintColor="#fff"
                />
                <Text className="text-white font-semibold text-base">Retour</Text>
            </TouchableOpacity>

        </View>
    )
}

export default index