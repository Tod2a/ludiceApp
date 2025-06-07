import { icons } from '@/constants/icons';
import { Mechanic } from '@/interfaces';
import { fetchMechanics } from '@/services/api/mechanic';
import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
    selected: Mechanic[];
    onAdd: (mechanic: Mechanic) => void;
    onRemove: (mechanic: Mechanic) => void;
    resetSignal?: number;
}

const MechanicsAutocomplete: React.FC<Props> = ({ selected, onAdd, onRemove, resetSignal }) => {
    const [input, setInput] = useState('');
    const [options, setOptions] = useState<Mechanic[]>([]);

    useEffect(() => {
        if (input.length >= 2) {
            fetchMechanics({ name: input }).then(setOptions);
        } else {
            setOptions([]);
        }
    }, [input]);

    useEffect(() => {
        setInput('');
        setOptions([]);
    }, [resetSignal]);

    const handleSelect = (mechanic: Mechanic) => {
        onAdd(mechanic);
        setInput('');
        setOptions([]);
    };

    return (
        <View>
            <View className='relative'>
                <View className='relative'>
                    <TextInput
                        placeholder="Rechercher une mécanique"
                        value={input}
                        onChangeText={setInput}
                        placeholderTextColor="#F9F6C0"
                        className="bg-dark-100 text-yellow-100 py-4"
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
                    {options.slice(0, 5).map((m) => (

                        <TouchableOpacity key={m.id} onPress={() => handleSelect(m)} >
                            <Text className="text-yellow-100 px-2 py-1">{m.name}</Text>
                        </TouchableOpacity>

                    ))}
                </View>
            </View>
            <View className="flex-row flex-wrap gap-2">
                {selected.map((m) => (
                    <View
                        key={m.id}
                        className="bg-green-700 flex-row items-center px-2 py-1 rounded-full mt-2"
                    >
                        <Text className="text-white mr-1">{m.name}</Text>
                        <TouchableOpacity onPress={() => onRemove(m)}>
                            <Image source={icons.firecross} className="w-4 h-4 tint-white" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default MechanicsAutocomplete;
