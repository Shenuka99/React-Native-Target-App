import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/colors'

export default function Card({ children }) {
    return (
        <View style={styles.card}>
            {children}
        </View>
    )
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: deviceWidth < 380 ? 18 : 30,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        //background shodow for android
        elevation: 4,

        //background shodow for ios
        shadowColor: 'black',
        shadowOffset: {
            width: 0, height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.25
    },
})