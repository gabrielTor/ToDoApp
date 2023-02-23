import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Todo } from '../screens/main'

const storeItem = async (name: string, item: unknown) => {
    await AsyncStorage.setItem(name, JSON.stringify(item))
}

const getItem = async (name: string) => {
    const item = await AsyncStorage.getItem(name)
    if (item) return JSON.parse(item)
    return []
}

export default function useAsyncStorage() {
    const [list, setList] = useState<Todo[]>([])

    const handleStroage = async (item: unknown) => {
        await storeItem('todos', item)
    }
    const handleRemoveItem = async (id: string) => {
        const items: Todo[] = await getItem('todos')
        const newItems = items.filter(a => a.id !== id)
        await storeItem('todos', newItems)
    }

    useEffect(() => {
        getItem('todos').then(data => setList(data))
    }, [])

    return { list, setList, handleStroage, handleRemoveItem }
}