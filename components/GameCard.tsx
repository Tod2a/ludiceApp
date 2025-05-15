import { Game } from '@/interfaces/interfaces'
import React from 'react'
import { Text, View } from 'react-native'

const GameCard: React.FC<Game> = ({ id, img_path, name }) => {
    return (
        <View>
            <Text className='text-white text-sm'>{name}</Text>
        </View>
    )
}

export default GameCard