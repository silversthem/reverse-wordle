import styles from './NewTurn.module.css';

type NewTurnProps = {
  lastTurn: string[] | 0;
  isPlaying: boolean;
  playSlot: (_: number) => () => unknown;
};

export function NewTurn({ lastTurn, isPlaying, playSlot }: NewTurnProps) {
  return (
    <div className={styles.newTurnWord}>
      <button
        type="button"
        className={styles.newTurnLetter}
        onClick={playSlot(0)}
        disabled={!isPlaying}
      >
        {lastTurn && lastTurn[0] !== '.' ? lastTurn[0] : ''}
      </button>
      <button
        type="button"
        className={styles.newTurnLetter}
        onClick={playSlot(1)}
        disabled={!isPlaying}
      >
        {lastTurn && lastTurn[1] !== '.' ? lastTurn[1] : ''}
      </button>
      <button
        type="button"
        className={styles.newTurnLetter}
        onClick={playSlot(2)}
        disabled={!isPlaying}
      >
        {lastTurn && lastTurn[2] !== '.' ? lastTurn[2] : ''}
      </button>
      <button
        type="button"
        className={styles.newTurnLetter}
        onClick={playSlot(3)}
        disabled={!isPlaying}
      >
        {lastTurn && lastTurn[3] !== '.' ? lastTurn[3] : ''}
      </button>
      <button
        type="button"
        className={styles.newTurnLetter}
        onClick={playSlot(4)}
        disabled={!isPlaying}
      >
        {lastTurn && lastTurn[4] !== '.' ? lastTurn[4] : ''}
      </button>
    </div>
  );
}
