import { RatioData } from '../lib/useRatio';
import styles from './Ratio.module.css';

type RatioProps = {
  stats: RatioData;
  ratio: number;
};

export function Ratio({ stats, ratio }: RatioProps) {
  return (
    <div className={styles.ratioContainer}>
      <div className={`${styles.ratioEl} ${styles.win}`}>{stats.win} Wins</div>
      <div className={`${styles.ratioEl} ${styles.loss}`}>
        {stats.loss} Losses
      </div>
      <div className={`${styles.ratioEl} ${styles.ratio}`}>
        Ratio : {ratio.toFixed(2)}
      </div>
    </div>
  );
}
