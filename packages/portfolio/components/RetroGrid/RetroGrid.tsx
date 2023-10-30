'use client';

import styles from './RetroGrid.module.css';
import range from '@/utils/range';
import { useWindowSize } from '@uidotdev/usehooks';

const RetroGrid = () => {
  const { width } = useWindowSize();
  const X_SPACER = 60;
  const Y_SPACER = 20;

  if (!width) {
    return <div className={styles.placeholder} />;
  }

  const xLines = Math.floor(width / X_SPACER);
  const yLines = Math.floor(200 / Y_SPACER);

  console.log(`xLines`, xLines, 'yLines', yLines, width);

  return (
    <svg height="210px" width={'100%'} className={styles.grid}>
      {range(xLines / 2).map((num) => {
        return (
          <line
            key={num}
            x1={num < 6 ? 0 : (num - 5) * 100}
            y1={num < 6 ? (num + 1) * 33.333 : 207}
            x2={(num + 1) * 60}
            y2={0}
            className={styles.gridLine}
          />
        );
      })}

      {range(xLines / 2).map((num) => {
        return (
          <line
            key={num}
            x1={num < 6 ? width : width - (num - 5) * 100}
            y1={num < 6 ? (num + 1) * 33.333 : 207}
            x2={width - (num + 1) * 60}
            y2={0}
            className={styles.gridLine}
          />
        );
      })}

      {range(yLines).map((num) => {
        const Y = num * (5 + num * 2);
        return (
          <line
            key={num}
            x1={0}
            y1={Y}
            x2={width}
            y2={Y}
            className={styles.gridLine}
          />
        );
      })}
    </svg>
  );
};

export default RetroGrid;
