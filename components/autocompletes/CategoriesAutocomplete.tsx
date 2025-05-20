import { icons } from "@/constants/icons";
import { Category } from "@/interfaces";
import { fetchCategories } from "@/services/api/category";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

interface Props {
    selected: Category[];
    onAdd: (category: Category) => void;
    onRemove: (category: Category) => void;
    resetSignal?: number;
}

const CategoriesAutoComplete: React.FC<Props> = ({ selected, onAdd, onRemove, resetSignal }) => {
    const [input, setInput] = useState('');
    const [options, setOptions] = useState<Category[]>([]);

    useEffect(() => {
        if (input.length >= 2) {
            fetchCategories({ name: input }).then(setOptions);
        } else {
            setOptions([]);
        }
    }, [input]);

    useEffect(() => {
        setInput('');
        setOptions([]);
    }, [resetSignal]);

    const handleSelect = (category: Category) => {
        onAdd(category);
        setInput('');
        setOptions([]);
    }

    return (
        <View>
            <View className="relative">
                <View className="relative">
                    <TextInput
                        placeholder="Rechercher une catégorie"
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
                <View className='bg-dark-100 rounded-b-xl z-50 shadow-md absolute top-full left-0 right-0 text-yellow-100'>
                    {options.slice(0, 5).map((c) => (

                        <TouchableOpacity key={c.id} onPress={() => handleSelect(c)} >
                            <Text className="text-yellow-100 px-2 py-1">{c.name}</Text>
                        </TouchableOpacity>

                    ))}
                </View>
            </View>
            <View className="flex-row flex-wrap gap-2">
                {selected.map((c) => (
                    <View
                        key={c.id}
                        className="bg-green-700 flex-row items-center px-2 py-1 rounded-full mt-2"
                    >
                        <Text className="text-white mr-1">{c.name}</Text>
                        <TouchableOpacity onPress={() => onRemove(c)}>
                            <Image source={icons.firecross} className="w-4 h-4 tint-white" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default CategoriesAutoComplete;
