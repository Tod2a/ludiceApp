import { images } from '@/constants/images'
import React from 'react'
import { Image, Text, View } from 'react-native'

const search = () => {
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="absolute w-full z-0" />
      <Text className="text-3xl font-bold text-white text-center mt-8 mb-6">A quoi on joue ?</Text>
    </View>
  )
}

export default search