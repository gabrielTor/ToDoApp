import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../styles'
import { EvilIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

type Props = {
    toDo: string
    check: boolean
    handleDelete: () => void
    handleCheck: () => void
}

export default function Card({ toDo, handleDelete, check, handleCheck }: Props) {

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity onPress={handleCheck} style={styles.icons}>
                <AntDesign size={25}
                    name={check ? "checksquare" : "checksquareo"}
                    color={check ? "blue" : "white"} />
            </TouchableOpacity>
            <View style={{ maxWidth: '70%' }}>
                <Text style={styles.text}>{toDo}</Text>
            </View>
            <TouchableOpacity onPress={handleDelete} style={styles.icons}>
                <EvilIcons name="trash" size={30} color="red" />
            </TouchableOpacity>
        </View>
    )
}