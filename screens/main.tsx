import { useState } from 'react'
import { Text, TextInput, View, FlatList } from 'react-native'
import Card from '../components/Card'
import { styles } from '../styles'
import uuid from 'react-native-uuid'
import useAsyncStorage from '../hooks/useAsyncStorage'

export type Todo = {
    text: string
    id: string
    check: boolean
}

export default function Main() {
    const { list, setList, handleStroage, handleRemoveItem } = useAsyncStorage()
    const [text, setText] = useState<string>()

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
    const handleDelete = (id: string) => {
        setList(prev => prev!.filter(a => a.id !== id))
        handleRemoveItem(id)
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

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>To Do List</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input}
                    placeholder='Add a task'
                    value={text}
                    maxLength={20}
                    onChangeText={text => setText(text)}
                    onSubmitEditing={handleTodo} />
            </View>
            <FlatList data={list}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <Card toDo={item.text}
                        handleDelete={() => handleDelete(item.id)}
                        check={item.check}
                        handleCheck={() => handleCheck(item.id)} />}
            />
        </View>
    )
}