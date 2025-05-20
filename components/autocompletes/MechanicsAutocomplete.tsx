import { Mechanic } from '@/interfaces';
import { fetchMechanics } from '@/services/api/mechanics';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
    selected: Mechanic[];
    onAdd: (mechanic: Mechanic) => void;
    resetSignal?: number;
}

const MechanicsAutocomplete: React.FC<Props> = ({ selected, onAdd, resetSignal }) => {
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
        <View className="mt-4">
            <TextInput
                placeholder="Rechercher une mécanique"
                value={input}
                onChangeText={setInput}
                className="bg-white px-3 py-2 rounded"
            />
            {options.map((m) => (
                <TouchableOpacity key={m.id} onPress={() => handleSelect(m)}>
                    <Text className="text-white px-2 py-1">{m.name}</Text>
                </TouchableOpacity>
            ))}
            <View className="flex-row flex-wrap gap-2 mt-2">
                {selected.map((m) => (
                    <Text key={m.id} className="bg-green-700 text-white px-2 py-1 rounded-full">
                        {m.name}
                    </Text>
                ))}
            </View>
        </View>
    );
};

export default MechanicsAutocomplete;
