import { icons } from '@/constants/icons';
import { CustomButtonProps } from '@/interfaces';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

const BackMenuButton = ({ text, onPress }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            className="absolute bottom-5 left-0 right-0 mx-5 bg-green-400 rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
            onPress={onPress}
        >
            <Image
                source={icons.arrow}
                className="size-5 mr-1 mt-0.5 rotate-180"
                tintColor="#fff"
            />
            <Text className="text-white font-semibold text-base">{text}</Text>
        </TouchableOpacity>
    )
}

export default BackMenuButton