import { images } from '@/constants/images'
import React from 'react'
import { Image, Text, View } from 'react-native'

const saved = () => {
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="absolute w-full z-0" />
      <Text>saved</Text>
    </View>
  )
}

export default saved