import { GameFooter } from './game/GameFooter';
import { NewTurn } from './game/NewTurn';
import { Turns } from './game/Turns';
import styles from './Game.module.css';

type GameProps = {
  gameState: 'won' | 'lost' | 'playing';
  nextLetter: string;
  turns: string[][];
  playSlot: (_: number) => () => unknown;
  lastTurn: string[] | 0;
  lastPossibleWords: string[] | false;
  restartGame: () => void;
};

export function Game({
  gameState,
  nextLetter,
  turns,
  playSlot,
  lastTurn,
  lastPossibleWords,
  restartGame,
}: GameProps) {
  const isPlaying = gameState === 'playing';

  return (
    <div className={styles.game}>
      <div className={styles.gameTitle}>Reverse Wordle</div>
      <div className={styles.gameBody}>
        <div className={styles.newLetter}>{isPlaying ? nextLetter : ''}</div>
        <Turns turns={turns} />
        <NewTurn
          playSlot={playSlot}
          lastTurn={lastTurn}
          isPlaying={isPlaying}
        />
        <GameFooter
          lastPossibleWords={lastPossibleWords}
          gameState={gameState}
          restartGame={restartGame}
        />
      </div>
    </div>
  );
}
