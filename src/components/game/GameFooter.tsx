import styles from './GameFooter.module.css';

type GameFooterProps = {
  gameState: 'playing' | 'lost' | 'won';
  lastPossibleWords: string[] | false;
  restartGame: () => void;
};

export function GameFooter({
  gameState,
  lastPossibleWords,
  restartGame,
}: GameFooterProps) {
  const statusMessage = {
    lost: (
      <>
        <div className={styles.gameOverText}>No more words</div>
      </>
    ),
    won: <div className={styles.gameOverWin}>You won !</div>,
    playing: <></>,
  }[gameState];

  const lastPossibleWordsCmp = lastPossibleWords ? (
    <div className={styles.gameOverOptions}>
      <div className={styles.gameOverOptionsTitle}>
        Possibilities you might have missed
      </div>
      <div className={styles.gameOverOptionsOptions}>
        {lastPossibleWords.map(word => (
          // eslint-disable-next-line react/jsx-key
          <div>{word}</div>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );

  return (
    <div className={styles.gameFooter}>
      {statusMessage}
      {gameState !== 'playing' && (
        <div className={styles.gameButton}>
          <button type="button" onClick={restartGame}>
            Play again
          </button>
        </div>
      )}
      {lastPossibleWordsCmp}
    </div>
  );
}
