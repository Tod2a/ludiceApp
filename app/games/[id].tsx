import { images } from '@/constants/images'
import React from 'react'
import { Image, View } from 'react-native'

const GameDetails = () => {
    return (
        <View className='flex-1 bg-primary'>
            <Image source={images.bg} className="absolute w-full z-0" />
        </View>
    )
}

export default GameDetails