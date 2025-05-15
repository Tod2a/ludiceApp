import { Game } from '@/interfaces/interfaces';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const GameCard: React.FC<Game> = ({ id, img_path, name }) => {
    return (
        <View className="w-[48%] mb-4">
            <Link href={`/games/${id}`} asChild>
                <TouchableOpacity className="bg-neutral-800 rounded-2xl overflow-hidden shadow-md">
                    <Image
                        source={{
                            uri: img_path
                                ? `https://tst.ludice.app${img_path}`
                                : 'https://via.placeholder.com/300x300.png?text=No+Image',
                        }}
                        className="w-full aspect-square"
                        resizeMode="cover"
                    />
                    <Text className="text-white text-base font-semibold px-2 py-2">
                        {name}
                    </Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
};

export default GameCard;
