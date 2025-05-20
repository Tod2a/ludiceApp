import { images } from '@/constants/images';
import { Player } from '@/interfaces';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const create = () => {
    const { players, gameId } = useLocalSearchParams<{ players: string; gameId: string }>();
    const [playerList, setPlayerList] = useState<Player[]>([]);

    useEffect(() => {
        if (players) {
            try {
                const parsed = JSON.parse(players) as Player[];
                setPlayerList(parsed);
            } catch (e) {
                console.error('Failed to parse player list', e);
            }
        }
    }, [players]);

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />
            <ScrollView contentContainerStyle={{
                flexGrow: 1,
                alignContent: 'center',
                marginTop: 40,
                paddingBottom: 60,
            }}>

                <Text className="text-yellow-200 text-xl mb-4">Enregistrer le score pour le jeu {gameId}</Text>
                {playerList.map((p) => (
                    <View key={`${p.type}-${p.id}`} className="bg-dark-100 px-4 py-3 mb-2 rounded-lg">
                        <Text className="text-white">{p.name} ({p.type})</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default create