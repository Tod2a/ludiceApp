import { icons } from '@/constants/icons';
import { Game } from '@/interfaces';
import { destroyGameLibrary } from '@/services/api/library';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ConfirmDeleteModal from '../modals/ConfirmDeleteGameModal';

const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'https://ludice.app/';

interface LibraryCardProps extends Game {
    onRemove?: () => void;
}

const LibraryCard: React.FC<LibraryCardProps> = ({ id, img_path, name, onRemove }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleDeletePress = () => {
        setModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        await destroyGameLibrary(id);
        if (onRemove) onRemove()
        setModalVisible(false);
    };

    const handleCancelDelete = () => {
        setModalVisible(false);
    };

    return (
        <View className="w-[48%] mb-4">
            <Link href={`/games/${id}`} asChild>
                <TouchableOpacity className="bg-dark-200 rounded-2xl overflow-hidden shadow-md">
                    <Image
                        source={{
                            uri: img_path
                                ? `${apiUrl}${img_path}`
                                : 'https://placeholder.co/600x400/1a1a1a/ffffff.png',
                        }}
                        className="w-full aspect-square"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </Link>
            <View className="flex-row items-center justify-between px-2 py-2">
                <Text className="text-white text-base font-semibold px-2 py-2" numberOfLines={1}>
                    {name}
                </Text>
                <TouchableOpacity
                    onPress={handleDeletePress}
                >
                    <Image
                        source={icons.firecross}
                        className='size-5'
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>

            <ConfirmDeleteModal
                name={name}
                visible={modalVisible}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

        </View>
    );
};

export default LibraryCard;
