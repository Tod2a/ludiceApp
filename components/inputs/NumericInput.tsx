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
                className='bg-yellow-100 mb-2'
            />
        </View>
    )
}

export default NumericInput