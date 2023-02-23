import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../styles'
import { EvilIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

type Props = {
    toDo: string
    handleDelete: () => void
    check: boolean
    handleCheck: () => void
}

export default function Card({ toDo, handleDelete, check, handleCheck }: Props) {

    return (
        <View style={styles.cardContainer}>
            {
                check ?
                    <TouchableOpacity onPress={handleCheck}>
                        <AntDesign name="checksquare" size={25} color="blue" />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={handleCheck}>
                        <AntDesign name="checksquareo" size={25} color="white" />
                    </TouchableOpacity>
            }
            <Text style={styles.text}>{toDo}</Text>
            <TouchableOpacity onPress={handleDelete}>
                <EvilIcons name="trash" size={30} color="red" />
            </TouchableOpacity>
        </View>
    )
}