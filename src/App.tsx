import './App.css';
import React from 'react';
import { computePossibleWords } from './lib/game';
import { useGame } from './lib/useGame';
import { Game } from './components/Game';
import { useRatio } from './lib/useRatio';
import { Ratio } from './components/Ratio';

function App() {
  const { ratio, stats, addToRatio } = useRatio();
  const { gameState, playSlot, turns, nextLetter, initGame } = useGame({
    onGameOver: addToRatio,
  });

  const hasLost = gameState === 'lost';

  const lastTurn = turns.length && turns[turns.length - 1];
  const lastPossibleWords =
    hasLost &&
    turns.length > 2 &&
    computePossibleWords(turns[turns.length - 2], nextLetter);

  React.useEffect(() => {
    initGame();
  }, []);

  return (
    <div className="app">
      <Game
        gameState={gameState}
        nextLetter={nextLetter}
        turns={turns}
        playSlot={playSlot}
        lastTurn={lastTurn}
        lastPossibleWords={lastPossibleWords}
        restartGame={initGame}
      />
      <div className="appFooter">
        <Ratio ratio={ratio} stats={stats} />
      </div>
    </div>
  );
}

export default App;
