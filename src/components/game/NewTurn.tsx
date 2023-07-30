import styles from "./NewTurn.module.css";

type NewTurnProps = {
  lastTurn: string[] | 0;
  isPlaying: boolean;
  playSlot: (_: number) => () => unknown;
  letters: number;
};

export function NewTurn({
  letters,
  lastTurn,
  isPlaying,
  playSlot,
}: NewTurnProps) {
  return (
    <div className={styles.newTurnWord}>
      {Array(letters)
        .fill(0)
        .map((_, i) => (
          <button
            type="button"
            className={styles.newTurnLetter}
            onClick={playSlot(i)}
            disabled={!isPlaying}
            key={`button-${i}`}
          >
            {lastTurn && lastTurn[i] !== "." ? lastTurn[i] : ""}
          </button>
        ))}
    </div>
  );
}
