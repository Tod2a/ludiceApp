import { Game } from '@/interfaces';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'https://ludice.app/';

const GameCard: React.FC<Game> = ({ id, img_path, name }) => {
    return (
        <View className="w-[48%] mb-4">
            <Link href={`/games/${id}`} asChild>
                <TouchableOpacity className="bg-dark-200 rounded-2xl overflow-hidden shadow-md">
                    <Image
                        source={{
                            uri: img_path
                                ? `${apiUrl}${img_path}`
                                : 'https://placeholder.co/600x400/1a1a1a/ffffff.png',
                        }}
                        className="w-full aspect-square"
                        resizeMode="contain"
                    />
                    <Text className="text-white text-base font-semibold px-2 py-2" numberOfLines={1}>
                        {name}
                    </Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
};

export default GameCard;
