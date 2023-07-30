import React from "react";
import { useGameSession } from "../../lib/useGameSession";
import { Game } from "./normal/Game";
import { computePossibleWords } from "../../lib/game";
import useTimer from "../../lib/useTimer";
import { RatioResult } from "../../lib/useRatio";
import GameOver, { GameLogEvent } from "./challenge/GameOver";

function ChallengeMode() {
  const [currentLettersNumber, setCurrentLettersNumber] = React.useState(3);
  const [hasWonLastSession, setHasWonLastSession] = React.useState<
    boolean | null
  >(null);
  const [currentGameLog, setCurrentGameLog] = React.useState<GameLogEvent[]>(
    [],
  );
  const { timeString, startTimer, stopTimer } = useTimer();

  const hasLostChallenge = hasWonLastSession === false;

  const onSessionWon = (word: string) => {
    setCurrentGameLog(v => [...v, { word, time: timeString, lost: false }]);
  };

  const onSessionLost = (word: string) => {
    setCurrentGameLog(v => [...v, { word, time: timeString, lost: true }]);
  };

  const onSessionOver = (result: RatioResult, word: string) => {
    const hasWon = result === "win";
    setHasWonLastSession(hasWon);
    if (hasWon) {
      onSessionWon(word);
    } else {
      onSessionLost(word);
      stopTimer();
    }
  };

  const { gameState, playSlot, turns, nextLetter, initGame } = useGameSession(
    currentLettersNumber,
    {
      onGameOver: onSessionOver,
    },
  );

  const lastTurn = turns.length && turns[turns.length - 1];
  const lastPossibleWords =
    hasLostChallenge &&
    turns.length > 2 &&
    computePossibleWords(
      currentLettersNumber,
      turns[turns.length - 2],
      nextLetter,
    ).slice(0, 10);

  const startChallenge = () => {
    setCurrentLettersNumber(3);
    setHasWonLastSession(null);
    setCurrentGameLog([]);
    initGame();
    startTimer();
  };

  React.useEffect(() => {
    startChallenge();

    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-flow">
      <div className="app-flow-top">
        Letters : {currentLettersNumber} | Timer : {timeString}
      </div>

      <div className="app-flow-main">
        {!hasLostChallenge && (
          <Game
            letters={currentLettersNumber}
            gameState={gameState}
            nextLetter={nextLetter}
            turns={turns}
            playSlot={playSlot}
            lastTurn={lastTurn}
          />
        )}
        {hasLostChallenge && (
          <GameOver
            possibleWords={lastPossibleWords}
            restart={startChallenge}
            gameLog={currentGameLog}
          />
        )}
      </div>
      <div className="app-flow-bottom">
        {hasWonLastSession === true && (
          <button
            type="button"
            onClick={() => {
              initGame();
              setCurrentLettersNumber(v => v + 1);
            }}
            disabled={!hasWonLastSession}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default ChallengeMode;
