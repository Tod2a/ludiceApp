import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
    text: string;
    onPress?: () => void;
}

const LinkButton = ({ text, onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text className="text-sm text-yellow-200 underline">{text}</Text>
        </TouchableOpacity>
    )
}

export default LinkButton