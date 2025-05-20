import React from 'react';
import { TextInput, View } from 'react-native';

interface Props {
    placeholder: string;
    onPress?: () => void;
    value: string;
    onChangeText: (text: string) => void;
}

const PrimaryTextInput = ({ placeholder, value, onChangeText }: Props) => {
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                className='bg-yellow-100 mb-2'
            />
        </View>
    )
}

export default PrimaryTextInput