import React from 'react';
import { TextInput, View } from 'react-native';

interface Props {
    placeholder: string;
    onPress?: () => void;
    value: string;
    onChangeText: (text: string) => void;
}

const NumericInput = ({ placeholder, value, onChangeText }: Props) => {
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType="numeric"
                placeholderTextColor="#F9F6C0"
                className='bg-dark-100 mb-2 text-yellow-100'
            />
        </View>
    )
}

export default NumericInput