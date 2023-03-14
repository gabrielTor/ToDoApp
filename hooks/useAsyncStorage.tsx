import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Todo } from '../screens/main'
import { cancelOnPress } from '../utils/functions'

const storeItem = async (name: string, item: unknown) => {
    await AsyncStorage.setItem(name, JSON.stringify(item))
}

const getItem = async (name: string) => {
    const item = await AsyncStorage.getItem(name)
    if (item) return JSON.parse(item)
    return []
}

const deleteItem = async (name: string) => await AsyncStorage.removeItem(name)

export default function useAsyncStorage() {
    const [list, setList] = useState<Todo[]>([])

    const handleStroage = async (item: unknown) => {
        await storeItem('todos', item)
    }
    const handleRemoveItem = async (id: string) => {
        setList(prev => prev!.filter(a => a.id !== id))
        const items: Todo[] = await getItem('todos')
        const newItems = items.filter(a => a.id !== id)
        await storeItem('todos', newItems)
    }
    const clearAll = () => {
        cancelOnPress('Remove All items', 'Are you sure you want to clear your list?',
            () => {
                deleteItem('todos')
                setList([])
            })
    }

    useEffect(() => {
        getItem('todos').then(data => setList(data))
    }, [])

    return { list, setList, handleStroage, handleRemoveItem, clearAll }
}