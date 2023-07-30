import { NewTurn } from "../../game/NewTurn";
import { Turns } from "../../game/Turns";
import styles from "./Game.module.css";

type GameProps = {
  gameState: "won" | "lost" | "playing";
  nextLetter: string;
  turns: string[][];
  playSlot: (_: number) => () => unknown;
  lastTurn: string[] | 0;
  letters: number;
};

export function Game({
  gameState,
  nextLetter,
  turns,
  playSlot,
  lastTurn,
  letters,
}: GameProps) {
  const isPlaying = gameState === "playing";

  return (
    <div className={styles.game}>
      <div className={styles.gameBody}>
        <div className={styles.newLetter}>{isPlaying ? nextLetter : ""}</div>
        <Turns turns={turns} />
        <NewTurn
          letters={letters}
          playSlot={playSlot}
          lastTurn={lastTurn}
          isPlaying={isPlaying}
        />
      </div>
    </div>
  );
}
