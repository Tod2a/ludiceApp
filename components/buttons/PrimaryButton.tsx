import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
    text: string;
    onPress?: () => void;
}

const PrimaryButton = ({ text, onPress }: Props) => {
    return (
        <TouchableOpacity
            className="bottom-3 left-0 right-0 bg-green-400 rounded-lg py-3.5 flex flex-row items-center justify-center z-40"
            onPress={onPress}

        >
            <Text className="text-white font-semibold text-base">{text}</Text>
        </TouchableOpacity>
    )
}

export default PrimaryButton