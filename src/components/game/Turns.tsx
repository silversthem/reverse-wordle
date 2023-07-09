import styles from './Turns.module.css';

type TurnsProps = {
  turns: string[][];
};

export function Turns({ turns }: TurnsProps) {
  return (
    <div className={styles.turns}>
      {turns.map(turn => (
        // eslint-disable-next-line react/jsx-key
        <div className={styles.word}>
          {turn.map(letter => (
            // eslint-disable-next-line react/jsx-key
            <div className={styles.letter}>{letter !== '.' ? letter : ''}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
