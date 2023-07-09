import React from 'react';
import { computePossibleWords, firstChoice, countLettersInList } from './game';
import { RatioResult } from './useRatio';

type useGameArgs = { onGameOver: (_: RatioResult) => void };

export function useGame({ onGameOver }: useGameArgs) {
  const [nextLetter, setNextLetter] = React.useState('');
  const [turns, setTurns] = React.useState<string[][]>([]);
  const [gameState, setGameState] = React.useState<'lost' | 'won' | 'playing'>(
    'playing',
  );

  const genNextLetter = (thisTurn: string[] | null) => {
    if (thisTurn?.every(l => l !== '.')) {
      onGameOver('win');
      setGameState('won');
      return;
    }

    if (!thisTurn) {
      // first turn, letter at random
      setNextLetter(
        firstChoice[Math.floor(Math.random() * firstChoice.length)],
      );
      return;
    }

    const possibleWords = computePossibleWords(thisTurn);

    console.log('current possible words :', possibleWords);

    if (!possibleWords.length) {
      onGameOver('loss');
      setGameState('lost');
      return;
    }

    const possibleLetters = countLettersInList(
      possibleWords,
      thisTurn.filter(l => l !== '.'),
    );
    const possibleWordsLettersByFrequency = Array.from(
      possibleLetters.entries(),
    )
      .sort((a, b) => b[1] - a[1])
      .map(x => x[0]);

    console.log(possibleLetters, possibleWordsLettersByFrequency);

    const chosenLetter =
      possibleWordsLettersByFrequency[
        Math.floor(Math.random() * possibleWordsLettersByFrequency.length)
      ];

    console.log('#', chosenLetter);

    setNextLetter(chosenLetter);
  };

  const playSlot = (turns: string[][]) => (n: number) => () => {
    if (turns.length) {
      if (turns[turns.length - 1][n] !== '.') return; // cant play on an already played tile
    }

    const thisTurn = turns.length
      ? turns[turns.length - 1].map((l, i) => (i === n ? nextLetter : l))
      : ['.', '.', '.', '.', '.'].map((l, i) => (i === n ? nextLetter : l));

    setTurns(turns => [...turns, thisTurn]);

    genNextLetter(thisTurn);
  };

  const initGame = () => {
    genNextLetter(null);
    setTurns([]);
    setGameState('playing');
  };

  return {
    gameState,
    turns,
    playSlot: playSlot(turns),
    nextLetter,
    initGame,
  };
}
