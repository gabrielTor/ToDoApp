import { Alert } from 'react-native'

export function cancelOnPress(title: string, message: string, fn: () => void) {
    Alert.alert(title, message,
        [
            {
                text: 'Yes',
                onPress: fn
            },
            { text: 'No' }
        ])
}