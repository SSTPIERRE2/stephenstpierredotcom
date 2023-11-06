'use client';

import styles from './RetroGrid.module.css';
import range from '@/utils/range';
import { useWindowSize } from '@uidotdev/usehooks';

const RetroGrid = () => {
  const { width } = useWindowSize();
  const X_SPACER = 55;
  const Y_SPACER = 20;

  if (!width) {
    return <div className={styles.placeholder} />;
  }

  const xLines = Math.floor(width / X_SPACER);
  const yLines = Math.floor(200 / Y_SPACER);

  console.log(`xLines`, xLines, 'yLines', yLines, width);

  return (
    <svg height="210px" width={'100%'} className={styles.grid}>
      {/* Diagonal lines, drawn from left */}
      {range(xLines / 2 <= 18 ? xLines / 2 + 3 : xLines / 2).map((num) => {
        return (
          <line
            key={num}
            x1={num < 6 ? 0 : Math.min((num - 5) * 95, width / 2)}
            y1={num < 6 ? (num + 1) * 33.333 : 210}
            x2={Math.min((num + 1) * 57, width / 2)}
            y2={0}
            className={styles.gridLine}
          />
        );
      })}

      {/* Diagonal lines, drawn from right */}
      {range(xLines / 2 <= 18 ? xLines / 2 + 3 : xLines / 2).map((num) => {
        return (
          <line
            key={num}
            x1={num < 6 ? width : Math.max(width - (num - 5) * 95, width / 2)}
            y1={num < 6 ? (num + 1) * 33.333 : 210}
            x2={Math.max(width - (num + 1) * 57, width / 2)}
            y2={0}
            className={styles.gridLine}
          />
        );
      })}

      {/* Vertical, middle line */}
      <line
        x1={width / 2}
        y1={0}
        x2={width / 2}
        y2={210}
        className={styles.gridLine}
      />

      {/* Horizontal lines, drawn from top with increasing space between */}
      {range(yLines).map((num) => {
        const Y = num === yLines - 1 ? 210 : num * (5 + num * 2);
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
