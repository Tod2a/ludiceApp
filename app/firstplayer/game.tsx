import GamesAutoComplete from '@/components/autocompletes/LibraryGamesAutocomplete'
import BackMenuButton from '@/components/buttons/BackMenuButton'
import { images } from '@/constants/images'
import { Game } from '@/interfaces'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'

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

            <BackMenuButton onPress={router.back} text='Retour' />

        </View>
    )
}

export default index