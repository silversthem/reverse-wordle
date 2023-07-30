import React from "react";
import { computePossibleWords } from "../../lib/game";
import { useGameSession } from "../../lib/useGameSession";
import { Game } from "./normal/Game";
import { useRatio } from "../../lib/useRatio";
import { Ratio } from "./normal/Ratio";
import { GameFooter } from "../game/GameFooter";

const NORMAL_MODE_LETTERS = 5;

function NormalMode() {
  const { ratio, stats, addToRatio } = useRatio();
  const { gameState, playSlot, turns, nextLetter, initGame } = useGameSession(
    NORMAL_MODE_LETTERS,
    {
      onGameOver: addToRatio,
    },
  );

  const hasLost = gameState === "lost";

  const lastTurn = turns.length && turns[turns.length - 1];
  const lastPossibleWords =
    hasLost &&
    turns.length > 2 &&
    computePossibleWords(
      NORMAL_MODE_LETTERS,
      turns[turns.length - 2],
      nextLetter,
    );

  React.useEffect(() => {
    initGame();
  }, []);

  return (
    <div className="app-flow">
      <Game
        letters={NORMAL_MODE_LETTERS}
        gameState={gameState}
        nextLetter={nextLetter}
        turns={turns}
        playSlot={playSlot}
        lastTurn={lastTurn}
      />
      <GameFooter
        lastPossibleWords={lastPossibleWords}
        gameState={gameState}
        restartGame={initGame}
      />
      <div className="appFooter">
        <Ratio ratio={ratio} stats={stats} />
      </div>
    </div>
  );
}

export default NormalMode;
