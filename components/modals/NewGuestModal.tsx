import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface NewGuestModalProps {
    visible: boolean;
    onConfirm: (name: string) => void;
    onCancel: () => void;
}

const NewGuestModal = ({ visible, onConfirm, onCancel }: NewGuestModalProps) => {
    const [name, setName] = useState('');

    const handleConfirm = () => {
        if (name.trim() !== '') {
            onConfirm(name.trim());
            setName('');
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 justify-center items-center bg-black/60 px-6">
                <View className="bg-white rounded-xl p-6 w-full max-w-md">
                    <Text className="text-lg font-bold mb-4 text-center">Créer un invité</Text>

                    <TextInput
                        placeholder="Nom de l'invité"
                        value={name}
                        onChangeText={setName}
                        className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
                    />

                    <View className="flex-row justify-end gap-3">
                        <TouchableOpacity onPress={onCancel}>
                            <Text className="text-red-500 font-bold">Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleConfirm}>
                            <Text className="text-blue-500 font-bold">Créer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default NewGuestModal