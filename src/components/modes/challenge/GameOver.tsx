import styles from "./GameOver.module.css";

export type GameLogEvent = { word: string; time: string; lost: boolean };

type GameOverProps = {
  possibleWords: string[] | false;
  restart: () => void;
  gameLog: GameLogEvent[];
};

function GameOver({ possibleWords, restart, gameLog }: GameOverProps) {
  const { word: lastFoundWord, time: lastFoundTime } =
    gameLog[gameLog.length - 2];
  const maxLetters = lastFoundWord.length;

  return (
    <div className={styles.container}>
      {possibleWords && (
        <div className={styles.possibleWords}>
          <div className={styles.possibleWordsTitle}>Possible words</div>
          <div className={styles.possibleWordsList}>
            {possibleWords.map(word => (
              <div key={word}>{word}</div>
            ))}
          </div>
        </div>
      )}
      <div className={styles.resume}>
        <span className={styles.resumeLetters}>{maxLetters}</span> letters in{" "}
        <span className={styles.resumeTime}>{lastFoundTime}</span>, nice !
      </div>
      <div className={styles.overview}>
        <div className={styles.overviewTitle}>Game overview</div>
        <div className={styles.overviewList}>
          {gameLog.map(log => (
            <div key={log.word} className={styles.overviewElement}>
              <div>{log.word}</div>
              <div>{log.time}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button type="button" onClick={restart}>
          Play again
        </button>
      </div>
    </div>
  );
}

export default GameOver;
