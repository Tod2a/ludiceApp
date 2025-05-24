import React from 'react';
import { Image, Text, View } from 'react-native';

interface Props {
    name: string;
    img: string;
}

const GameLiteCard = ({ name, img }: Props) => {
    const base_url = process.env.EXPO_PUBLIC_API_URL ?? 'https://ludice.app/';

    return (
        <View className="mt-2 bg-dark-200 rounded-xl p-4 w-11/12 self-center shadow-lg shadow-black/50">

            <Text className="text-white text-xl font-bold text-center mb-3">
                {name}
            </Text>

            <Image
                source={{ uri: `${base_url}${img}` }}
                className="w-full h-48 rounded-lg mb-4"
                resizeMode="cover"
            />
        </View>
    )
}

export default GameLiteCard