import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bef0b6'
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '5%',
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 15,
        padding: '3%',
    },
    input: {
        maxWidth: '95%',
        fontSize: 20
    },
    text: {
        fontSize: 20,
        color: 'white'
    },
    cardContainer: {
        backgroundColor: '#02c221',
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 7
    },
    icons: {
        justifyContent: 'center'
    }
});