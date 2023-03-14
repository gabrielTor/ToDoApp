import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

type ButtonProps = React.FC<Props & React.ComponentProps<typeof TouchableOpacity>>
interface Props {
    title: string
    bgColor: string
}

export const Button: ButtonProps = ({ title, bgColor, ...otherProps }) => {
    return (
        <TouchableOpacity style={{
            backgroundColor: bgColor,
            marginVertical: 7,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            borderRadius: 10
        }}
            {...otherProps}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{title}</Text>
        </TouchableOpacity>
    )
}