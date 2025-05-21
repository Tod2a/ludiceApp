import BackMenuButton from '@/components/buttons/BackMenuButton';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import CustomActivityIndicator from '@/components/CustomActivityIndicator';
import AddSectionModal from '@/components/modals/AddSectionModal';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import useFetch from '@/hooks/useFetch';
import { Player, ScoreSheetDTO, SectionDTO } from '@/interfaces';
import { fetchGamesDetails } from '@/services/api/game';
import { storeScore } from '@/services/api/score';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const create = () => {
    const { players, gameId } = useLocalSearchParams<{ players: string; gameId: string }>();
    const [playerList, setPlayerList] = useState<Player[]>([]);
    const base_url = process.env.EXPO_PUBLIC_API_URL;
    const router = useRouter();
    const {
        data: game,
        loading,
        error
    } = useFetch(() => fetchGamesDetails(gameId), true)

    const [sections, setSections] = useState<SectionDTO[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (players) {
            try {
                const parsed = JSON.parse(players) as Player[];
                setPlayerList(parsed);
            } catch (e) {
                console.error('Failed to parse player list', e);
            }
        }
    }, [players]);

    useEffect(() => {
        if (playerList.length > 0) {
            setSections([
                {
                    name: 'score',
                    scores: playerList.map(p => {
                        const id = p.id;
                        return p.type === 'user'
                            ? { user_id: id, score: 0 }
                            : { guest_id: id, score: 0 }
                    }),
                },
            ]);
        }
    }, [playerList]);

    const handleAddSection = (newSection: SectionDTO) => {
        setSections(current => [...current, newSection]);
        setModalVisible(false);
    };

    const handleInputChange = (sIndex: number, i: number, text: string) => {
        const key = `${sIndex}-${i}`;
        const isValid = /^-?\d*$/.test(text);

        if (isValid || text === '' || text === '-') {
            setInputValues(prev => ({ ...prev, [key]: text }));

            const parsed = parseInt(text, 10);
            if (!isNaN(parsed)) {
                updateScore(sIndex, i, parsed);
            }
        }
    };

    const updateScore = (sectionIndex: number, scoreIndex: number, newScore: number) => {
        setSections(currentSections => {
            const newSections = [...currentSections];
            newSections[sectionIndex].scores[scoreIndex].score = newScore;
            return newSections;
        });
    };

    const deleteSection = (index: number) => {
        setSections(current => current.filter((_, i) => i !== index));
    };

    const playerTotals = playerList.map((_, playerIndex) => {
        let total = 0;
        sections.forEach(section => {
            const score = section.scores[playerIndex]?.score ?? 0;
            total += score;
        });
        return total;
    });

    const saveScore = async () => {
        const dto: ScoreSheetDTO = {
            game_id: Number(gameId),
            sections,
        };

        console.log('test');

        const result = await storeScore(dto);

        if (result.success) {
            router.push('/score');
        }
    }

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />
            <ScrollView contentContainerStyle={{
                flexGrow: 1,
                alignContent: 'center',
                marginTop: 40,
                paddingBottom: 120,
            }}>
                {loading ? (
                    <CustomActivityIndicator />
                ) : error ? (
                    <Text className='text-white'>Error Server</Text>
                ) : (
                    <>
                        <Text className="text-2xl font-bold text-white text-center mb-6">
                            Enregistrer le score
                        </Text>
                        <View className="mt-2 bg-dark-200 rounded-xl p-4 w-11/12 self-center shadow-lg shadow-black/50">

                            <Text className="text-white text-xl font-bold text-center mb-3">
                                {game?.name}
                            </Text>

                            <Image
                                source={{ uri: `${base_url}${game?.img_path}` }}
                                className="w-full h-48 rounded-lg mb-4"
                                resizeMode="cover"
                            />
                        </View>


                        <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 10, marginBottom: 20, marginTop: 10, marginHorizontal: 6 }}>

                            {sections.map((section, sIndex) => (
                                <View
                                    key={sIndex}
                                    className=" mr-4"
                                >
                                    <View className="flex-row justify-between items-center">
                                        <Text
                                            className="font-bold text-lg text-white max-w-[180px] truncate"
                                        >
                                            {section.name}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => deleteSection(sIndex)}
                                            className="bg-dark-200 p-1 rounded"
                                        >
                                            <Image source={icons.firecross} className="w-4 h-4" />
                                        </TouchableOpacity>
                                    </View>

                                    {section.scores.map((score, i) => {
                                        const player = playerList[i];
                                        return (
                                            <View key={i} className="my-1">
                                                <Text className="text-white">{player.name}</Text>
                                                <TextInput
                                                    className="w-16 border border-gray-300 p-1.5 rounded text-white text-center"
                                                    keyboardType="numbers-and-punctuation"
                                                    value={inputValues[`${sIndex}-${i}`] ?? score.score.toString()}
                                                    onChangeText={text => handleInputChange(sIndex, i, text)}
                                                />
                                            </View>
                                        );
                                    })}
                                </View>
                            ))}
                        </ScrollView>

                        <View className="mb-8 bg-dark-100 rounded-xl p-4 w-11/12 self-center shadow-lg shadow-black/50">
                            <Text className="text-white font-bold text-lg mb-2">Total Scores</Text>
                            {playerList.map((player, index) => (
                                <View key={index} className="flex-row justify-between items-center mb-1">
                                    <Text className="text-white">{player.name}</Text>
                                    <Text className="text-white font-bold">{playerTotals[index]}</Text>
                                </View>
                            ))}
                        </View>

                        <View className='mx-5'>
                            <View className='mb-2'>
                                <PrimaryButton onPress={() => setModalVisible(true)} text='+ Ajouter une Section' />
                            </View>

                            <PrimaryButton onPress={() => { saveScore() }} text='Sauvegarder le Score' />

                        </View>


                    </>
                )}

                <AddSectionModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onAddSection={handleAddSection}
                    playerList={playerList}
                />

            </ScrollView>

            <BackMenuButton
                text="Retour à l'accueil"
                onPress={() => { router.push('/') }}
            />
        </View>
    )
}

export default create