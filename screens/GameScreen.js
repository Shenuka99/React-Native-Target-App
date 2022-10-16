import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

//Components Import
import Title from '../components/UI/Title'
import NumberContainer from '../components/Game/NumberContainer';
import PrimaryButton from '../components/UI/PrimaryButton';
import Card from '../components/UI/Card';
import InstructionText from '../components/UI/InstructionText';
import GuessLogItem from '../components/Game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum
    }
}

let minBoundary = 1
let maxBoundary = 100

export default function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length)
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        minBoundary = 1
        maxBoundary = 100
    }, [])



    function nextGuessHandler(direction) {
        if ((direction === 'lower' && currentGuess < userNumber || direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert('Error', 'Wrong Guess', [{ text: 'Sorry', style: 'cancel' }])
            return;
        }
        if (direction === 'lower') {
            maxBoundary = currentGuess
        } else {
            minBoundary = currentGuess + 1
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRndNumber)
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds])
    }

    const guessRoundsListLength = guessRounds.length

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText>Higher or lower</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name='md-remove' size={24} color='white' />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name='md-add' size={24} color='white' /></PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
                <FlatList data={guessRounds}
                    renderItem={(itemData) =>
                        <GuessLogItem
                            roundNumber={guessRoundsListLength - itemData.index}
                            guess={itemData.item} />
                    }
                    keyExtractor={item => item} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        marginTop: 24,
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16,

    }

})