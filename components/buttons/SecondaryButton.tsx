import { Text, TouchableOpacity } from "react-native";

interface Props {
    text: string;
    onPress?: () => void;
}

const SecondaryButton = ({ text, onPress }: Props) => {
    return (
        <TouchableOpacity
            className="bg-green-200 rounded-lg py-3.5 items-center justify-center z-50"
            onPress={onPress}
        >
            <Text className="font-semibold text-base">{text}</Text>
        </TouchableOpacity>
    )
}

export default SecondaryButton;