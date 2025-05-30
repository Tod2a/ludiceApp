import { CustomButtonProps } from '@/interfaces';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const PrimaryButton = ({ text, onPress }: CustomButtonProps) => {
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