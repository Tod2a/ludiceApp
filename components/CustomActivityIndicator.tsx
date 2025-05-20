import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const CustomActivityIndicator = () => {
    return (
        <View className="inset-0 justify-center items-center z-50">
            <ActivityIndicator size="large" color="#AED39A" />
        </View>
    )
}

export default CustomActivityIndicator