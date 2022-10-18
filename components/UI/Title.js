import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Title({ children }) {
    return (
        <View>
            <Text style={styles.title}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        // borderWidth: Platform.OS === 'android' ? 2 : 0,
        borderWidth: Platform.select({ ios: 0, android: 2 }),
        borderColor: 'white',
        padding: 12,
        fontFamily: 'open-sans-bold',

        //for dynamic width
        maxWidth: '80%',
        width: 300

    }
})