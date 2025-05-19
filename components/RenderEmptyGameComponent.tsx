import React from 'react';
import { Text, View } from 'react-native';

type Props = {
    loading: boolean;
    error: boolean;
    searchQuery: string;
};

const RenderEmptyGameComponent: React.FC<Props> = ({ loading, error, searchQuery }) => {
    if (loading || error) return null;

    return (
        <View className="mt-10 px-5">
            <Text className="text-center text-gray-400">
                {searchQuery.trim() ? 'Pas de jeux trouvés' : 'Search for a game'}
            </Text>
        </View>
    );
};

export default RenderEmptyGameComponent;
