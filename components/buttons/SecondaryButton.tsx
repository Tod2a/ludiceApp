import { CustomButtonProps } from "@/interfaces";
import { Text, TouchableOpacity } from "react-native";

const SecondaryButton = ({ text, onPress }: CustomButtonProps) => {
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