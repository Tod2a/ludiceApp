import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface ConfirmDeleteGameModalProps {
    name: string
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDeleteGameModal: React.FC<ConfirmDeleteGameModalProps> = ({ name, visible, onConfirm, onCancel }) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <View className="w-72 p-5 bg-white rounded-lg items-center">
                    <Text className="text-lg font-bold mb-2">Confirmez la suppression</Text>
                    <Text className="text-base mb-5 text-center">
                        Êtes-vous sûr de vouloir retirer {name} de votre ludothèque ?
                    </Text>
                    <View className="flex-row justify-between w-full">
                        <TouchableOpacity
                            className="flex-1 py-2 mx-1 rounded bg-gray-300"
                            onPress={onCancel}
                        >
                            <Text className="text-center text-black font-bold">Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-1 py-2 mx-1 rounded bg-blue-600"
                            onPress={onConfirm}
                        >
                            <Text className="text-center text-white font-bold">Supprimer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmDeleteGameModal;
