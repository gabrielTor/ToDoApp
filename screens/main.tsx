import { useState, useRef } from 'react'
import { Text, TextInput, View, FlatList, TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Card from '../components/Card'
import { styles } from '../styles'
import uuid from 'react-native-uuid'
import useAsyncStorage from '../hooks/useAsyncStorage'
import { cancelOnPress } from '../utils/functions'
import { Button } from '../components/Button'

export type Todo = {
    text: string
    id: string
    check: boolean
}

export default function Main() {
    const { list, setList, handleStroage, handleRemoveItem, clearAll } = useAsyncStorage()
    const [text, setText] = useState<string>()
    const inputRef = useRef<TextInput>(null)

    const handleTodo = () => {
        if (text) {
            const obj = { text, id: JSON.stringify(uuid.v4()), check: false }
            setList(prev => {
                handleStroage([...prev!, obj])
                return [...prev!, obj]
            })
        }
        setText('')
    }
    const handleCheck = (id: string) => {
        const foundIndex = list?.findIndex(a => a.id === id)
        if (foundIndex !== undefined) {
            const item = list![foundIndex]
            const newItem = { ...item, check: !item.check }
            list!.splice(foundIndex, 1, newItem)
            setList(prev => {
                handleStroage([...prev!])
                return [...prev!]
            })
        }
    }
    const handleDelete = (id: string) => {
        cancelOnPress('Remove Item', 'Are you sure you would like to delete this item?', () => handleRemoveItem(id))
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>My List</Text>
            <View style={{ paddingHorizontal: '5%', flex: 1 }}>
                <TouchableWithoutFeedback onPress={() => inputRef?.current?.focus()}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}
                            placeholder='Add a task'
                            value={text}
                            ref={inputRef}
                            maxLength={40}
                            onChangeText={text => setText(text)}
                            onSubmitEditing={handleTodo} />
                    </View>
                </TouchableWithoutFeedback>
                <FlatList data={list}
                    ListHeaderComponent={list.length ? <Button title='Clear List' bgColor='red' onPress={clearAll} /> : <></>}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <Card toDo={item.text}
                            handleDelete={() => handleDelete(item.id)}
                            check={item.check}
                            handleCheck={() => handleCheck(item.id)} />}
                />
            </View>
        </SafeAreaView>
    )
}