import { images } from '@/constants/images';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const SelectFirstPlayer = () => {
    const { id } = useLocalSearchParams();
    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                <Text className='text-white'>Selected Game ID: {id}</Text>
                <Text className='text-white'>{id}</Text>
                <Text className='text-white'>{id}</Text>
                <Text className='text-white'>{id}</Text>
                <Text className='text-white'>{id}</Text>
                <Text className='text-white'>{id}</Text>
                <Text className='text-white'>{id}</Text>
                <Text className='text-white'>{id}</Text>
                <Text className='text-white'>{id}</Text>
                <Text className='text-white'>{id}</Text>
            </ScrollView>
        </View>
    )
}

export default SelectFirstPlayer