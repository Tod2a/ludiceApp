import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const CustomActivityIndicator = () => {
    return (
        <View className="inset-0 justify-center items-center z-50 absolute">
            <ActivityIndicator size="large" color="#345A20" />
        </View>
    )
}

export default CustomActivityIndicator