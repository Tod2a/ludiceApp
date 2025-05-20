import { icons } from '@/constants/icons';
import { Guest } from '@/interfaces';
import { fetchGuest } from '@/services/api/guest';
import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
    selected: Guest[];
    onAdd: (guest: Guest) => void;
    onRemove: (guest: Guest) => void;
    resetSignal?: number;
}

const GuestAutomcomplete: React.FC<Props> = ({ selected, onAdd, onRemove, resetSignal }) => {
    const [input, setInput] = useState('');
    const [options, setOptions] = useState<Guest[]>([]);

    useEffect(() => {
        if (input.length >= 2) {
            fetchGuest({ name: input }).then(setOptions);
        } else {
            setOptions([]);
        }
    }, [input]);

    useEffect(() => {
        setInput('');
        setOptions([]);
    }, [resetSignal]);

    const handleSelect = (guest: Guest) => {
        onAdd(guest);
        setInput('');
        setOptions([]);
    };

    return (
        <View>
            <View className='relative'>
                <View className='relative'>
                    <TextInput
                        placeholder="Rechercher un de vos invités"
                        value={input}
                        onChangeText={setInput}
                        placeholderTextColor="#F9F6C0"
                        className="bg-dark-100 text-yellow-100"
                    />
                    {input.length > 0 && (
                        <TouchableOpacity
                            onPress={() => setInput('')}
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                        >
                            <Image source={icons.firecross} tintColor={'#807D80'} className="w-4 h-4 text-black" />
                        </TouchableOpacity>
                    )}
                </View>
                <View className='bg-dark-100 rounded-b-xl z-50 shadow-md absolute top-full left-0 right-0'>
                    {options
                        .filter((g) => !selected.some((sel) => sel.id === g.id))
                        .slice(0, 5)
                        .map((g) => (

                            <TouchableOpacity key={g.id} onPress={() => handleSelect(g)} >
                                <Text className="text-yellow-100 px-2 py-1">{g.name}</Text>
                            </TouchableOpacity>

                        ))}
                </View>
            </View>
            <View className="mt-2">
                {selected.map((g) => (
                    <View
                        key={g.id}
                        className="flex-row items-center justify-between bg-dark-100 px-4 py-3 rounded mb-2"
                    >
                        <Text className="text-white">{g.name}</Text>
                        <TouchableOpacity onPress={() => onRemove(g)} className="p-1">
                            <Image source={icons.firecross} className="w-5 h-5 tint-white" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
}

export default GuestAutomcomplete;