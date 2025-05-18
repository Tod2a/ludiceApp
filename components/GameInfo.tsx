import { Text, View } from "react-native";

interface GameInfoProps {
    label: string;
    value?: string | number | null | string[];
}

const GameInfo = ({ label, value }: GameInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-yellow-200 font-normal text-sm">{label}</Text>
        {Array.isArray(value) ? (
            <View className="flex-row flex-wrap mt-2">
                {value.length ? (
                    value.map((item, index) => (
                        <Text
                            key={index}
                            className="bg-green-300 text-white px-2 py-1 rounded-lg mr-2 mb-2 text-sm"
                        >
                            {item}
                        </Text>
                    ))
                ) : (
                    <Text className="text-yellow-200 font-bold text-sm mt-2">N/A</Text>
                )}
            </View>
        ) : (
            <Text className="text-yellow-200 font-bold text-sm mt-2">
                {value || "N/A"}
            </Text>
        )}
    </View>
);

export default GameInfo;
