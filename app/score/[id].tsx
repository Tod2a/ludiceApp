import BackMenuButton from '@/components/buttons/BackMenuButton'
import GameLightCard from '@/components/cards/GameLightCard'
import CustomActivityIndicator from '@/components/CustomActivityIndicator'
import { images } from '@/constants/images'
import useFetch from '@/hooks/useFetch'
import { fetchScoreDetail } from '@/services/api/score'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'

const details = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const {
        data: score,
        loading,
        error,
    } = useFetch(() => fetchScoreDetail(id as string), true);

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />
            {loading ? (
                <CustomActivityIndicator />
            ) : error ? (
                <Text className='text-white'>Error Server</Text>
            ) : (
                <>
                    <View className='mt-6'>
                        <Text className="text-2xl font-bold text-white text-center mb-6">
                            Détails
                        </Text>
                        <View className='mb-5'>
                            <GameLightCard name={score?.game.name ?? ''} img={score?.game.img_path ?? ''} />
                        </View>

                    </View>
                    <BackMenuButton onPress={() => router.back()} text='Retour' />
                </>
            )
            }
        </View>
    )
}

export default details