import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { icons } from "@/constants/icons";
import { TabIconProps } from "@/interfaces/interfaces";

function TabIcon({ focused, icon, title }: TabIconProps) {
    if (focused) {
        return (
            <View className="flex-row items-center justify-center rounded-full bg-green-100 px-4 py-2 min-w-[80px]">
                <Image source={icon} className="w-5 h-5" style={{ tintColor: '#151312' }} />
                <Text className="ml-2 text-base font-semibold text-[#151312]">{title}</Text>
            </View>
        );
    }
    return (
        <View className="items-center justify-center px-4 py-2 rounded-full">
            <Image source={icon} className="w-5 h-5" style={{ tintColor: '#A8B5DB' }} />
        </View>
    );
}


export default function TabsLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    paddingTop: 1,
                },
                tabBarStyle: {
                    backgroundColor: "#0F0D23",
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: insets.bottom + 12,
                    height: 52,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#0F0D23",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "index",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.home} title="Home" />
                    ),
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.search} title="Search" />
                    ),
                }}
            />

            <Tabs.Screen
                name="saved"
                options={{
                    title: "Saved",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.save} title="Saved" />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={icons.person} title="Profile" />
                    ),
                }}
            />
        </Tabs>
    );
}