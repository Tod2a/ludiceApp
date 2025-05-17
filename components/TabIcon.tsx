import { TabIconProps } from "@/interfaces/interfaces";
import { Image, Text, View } from "react-native";

export default function TabIcon({ focused, icon, title }: TabIconProps) {
    if (focused) {
        return (
            <View className="flex-row items-center justify-center rounded-full bg-green-100 px-4 py-2 min-w-[80px] m-0">
                <Image source={icon} className="w-5 h-5" style={{ tintColor: '#151312' }} />
                <Text className="ml-2 text-base font-semibold text-[#151312]">{title}</Text>
            </View>
        );
    }
    return (
        <View className="items-center justify-center px-4 py-2 rounded-full">
            <Image source={icon} className="w-5 h-5" style={{ tintColor: '#C1BA3E' }} />
        </View>
    );
}