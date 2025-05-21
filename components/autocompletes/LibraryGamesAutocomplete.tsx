import { icons } from "@/constants/icons";
import { Game } from "@/interfaces";
import { fetchLibraryGames } from "@/services/api/library";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

interface Props {
    onAdd: (game: Game) => void;
}

const LibraryGamesAutoComplete: React.FC<Props> = ({ onAdd }) => {
    const [input, setInput] = useState('');
    const [options, setOptions] = useState<Game[]>([]);

    useEffect(() => {
        if (input.length >= 2) {
            fetchLibraryGames({ query: input }).then((res) => {
                setOptions(res.library.data);
            });
        } else {
            setOptions([]);
        }
    }, [input]);

    const handleSelect = (game: Game) => {
        onAdd(game);
        setInput('');
        setOptions([]);
    }

    return (
        <View>
            <View className="relative">
                <View className="relative">
                    <TextInput
                        placeholder="Rechercher un jeu"
                        value={input}
                        onChangeText={setInput}
                        placeholderTextColor="#F9F6C0"
                        className="bg-dark-100 text-yellow-100 rounded-full px-4"
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
                    {options.slice(0, 5).map((g) => (

                        <TouchableOpacity key={g.id} onPress={() => handleSelect(g)} >
                            <Text className="text-yellow-100 px-2 py-1">{g.name}</Text>
                        </TouchableOpacity>

                    ))}
                </View>
            </View>
        </View>
    )
}

export default LibraryGamesAutoComplete