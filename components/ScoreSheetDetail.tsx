import { Player, ScoreDetailResponse } from '@/interfaces';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

interface Props {
    scoreSheet?: ScoreDetailResponse | null;
}

const ScoreSheetDetailTable = ({ scoreSheet }: Props) => {
    if (!scoreSheet) {
        return <Text className="text-white p-4">No score sheet data available.</Text>;
    }

    const { sections } = scoreSheet;

    const playersMap = new Map<number, Player>();
    sections.forEach(section => {
        if (section.user) {
            playersMap.set(section.user.id, {
                ...section.user,
                id: section.user.id.toString(),
                type: 'user',
            });
        } else if (section.guest) {
            playersMap.set(section.guest.id, {
                ...section.guest,
                id: section.guest.id.toString(),
                type: 'guest',
            });
        }
    });
    const players = Array.from(playersMap.values());

    const sectionNames = Array.from(new Set(sections.map(s => s.name)));

    const scoreTable: Record<string, Record<string, number>> = {};
    sectionNames.forEach(name => {
        scoreTable[name] = {};
    });

    sections.forEach(section => {
        const playerId = section.user_id ?? section.guest_id;
        if (playerId != null) {
            scoreTable[section.name][playerId] = section.score;
        }
    });


    const totals: Record<string, number> = {};
    players.forEach(p => {
        totals[p.id] = 0;
        sectionNames.forEach(name => {
            totals[p.id] += scoreTable[name][p.id] ?? 0;
        });
    });

    return (
        <ScrollView horizontal className="m-4">
            <View className="border border-gray-400 rounded-lg bg-dark-200">

                <View className="flex-row border-b border-gray-400 bg-dark-300">
                    <View className="w-32 p-2 border-r border-gray-400">
                        <Text className="text-white font-bold text-center">Section / Joueur</Text>
                    </View>
                    {players.map(player => (
                        <View key={player.id} className="w-28 p-2 border-r border-gray-400">
                            <Text className="text-white font-bold text-center truncate">{player.name}</Text>
                        </View>
                    ))}
                </View>

                {sectionNames.map(sectionName => (
                    <View
                        key={sectionName}
                        className="flex-row border-b border-gray-400 last:border-b-0"
                    >
                        <View className="w-32 p-2 border-r border-gray-400 justify-center">
                            <Text className="text-white font-semibold truncate">{sectionName}</Text>
                        </View>

                        {players.map(player => (
                            <View
                                key={player.id}
                                className="w-28 p-2 border-r border-gray-400 justify-center"
                            >
                                <Text className="text-white text-center">
                                    {scoreTable[sectionName][player.id] ?? 0}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}

                <View className="flex-row bg-dark-300">
                    <View className="w-32 p-2 border-r border-gray-400">
                        <Text className="text-white font-bold text-center">Total</Text>
                    </View>
                    {players.map(player => (
                        <View key={player.id} className="w-28 p-2 border-r border-gray-400">
                            <Text className="text-white font-bold text-center">{totals[player.id]}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default ScoreSheetDetailTable;
