import { ScoreSheet } from '@/interfaces';
import React from 'react';
import { Text, View } from 'react-native';

const ScoreCard = ({ sheet }: { sheet: ScoreSheet }) => {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const scoresByPlayer: Record<string, number> = {};
    sheet.sections.forEach((section) => {
        const participant = section.user?.name || section.guest?.name || 'Inconnu';
        scoresByPlayer[participant] = (scoresByPlayer[participant] || 0) + section.score;
    });

    return (
        <View className="bg-white/10 rounded-2xl p-4 mb-4 border border-white/20">
            <Text className="text-white text-xl font-semibold mb-1">
                {sheet.game.name}
            </Text>
            <Text className="text-white text-sm mb-3">
                {formatDate(sheet.created_at)}
            </Text>
            {Object.entries(scoresByPlayer).map(([name, totalScore]) => (
                <Text key={name} className="text-white ml-2">
                    - {name} : {totalScore} pts
                </Text>
            ))}
        </View>
    );
};

export default ScoreCard;
