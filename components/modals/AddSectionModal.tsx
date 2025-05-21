import { Player, SectionDTO } from '@/interfaces';
import React, { useState } from 'react';
import { Button, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AddSectionModalProps {
    visible: boolean;
    onClose: () => void;
    onAddSection: (newSection: SectionDTO) => void;
    playerList: Player[];
}

const AddSectionModal: React.FC<AddSectionModalProps> = ({
    visible,
    onClose,
    onAddSection,
    playerList,
}) => {
    const [sectionName, setSectionName] = useState('');

    const handleAdd = () => {
        if (sectionName.trim() === '') return;

        const newSection: SectionDTO = {
            name: sectionName.trim(),
            scores: playerList.map(p => {
                const id = p.id;
                return p.type === 'user'
                    ? { user_id: id, score: 0 }
                    : { guest_id: id, score: 0 }
            }),
        };

        onAddSection(newSection);
        setSectionName('');
    };

    const handleClose = () => {
        setSectionName('');
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <View className="bg-white p-5 rounded-lg w-72">
                    <Text className="mb-2 font-bold text-lg">Enter Section Name</Text>
                    <TextInput
                        placeholder="Section name"
                        value={sectionName}
                        onChangeText={setSectionName}
                        className="border border-gray-300 p-3 mb-5 rounded"
                    />
                    <Button title="Add Section" onPress={handleAdd} />
                    <TouchableOpacity onPress={handleClose} className="mt-3 items-center">
                        <Text className="text-red-500">Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AddSectionModal;
