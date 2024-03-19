'use client';

import styles from './RetroGrid.module.css';
import range from '@/utils/range';
import { useWindowSize } from '@uidotdev/usehooks';

const RetroGrid = () => {
  const { width } = useWindowSize();
  const X_SPACER = 50;
  const Y_SPACER = 20;

  if (!width) {
    return <div className={styles.placeholder} />;
  }

  const dividedWidth = Math.floor(width / X_SPACER);
  const xLines = dividedWidth < 5 ? 5 : dividedWidth;
  const yLines = Math.floor(200 / Y_SPACER);
  const modifier = width < 550 ? 4 : 5;

  // console.log(`xLines`, xLines, 'yLines', yLines, width);

  return (
    <svg height="210px" width={'100%'} className={styles.grid}>
      {/* Diagonal lines, drawn from left/bottom to top */}
      {range(xLines / 2 <= 10 ? xLines : xLines / 2).map((num) => {
        return (
          <line
            key={num}
            x1={num < modifier ? 0 : Math.min((num - modifier) * 88, width / 2)}
            y1={num < modifier ? (num + 1) * 33.333 : 210}
            x2={Math.min((num + 1) * 57, width / 2)}
            y2={0}
            className={styles.gridLine}
          />
        );
      })}

      {/* Diagonal lines, drawn from right/bottom to top */}
      {range(xLines / 2 <= 10 ? xLines : xLines / 2).map((num) => {
        return (
          <line
            key={num}
            x1={
              num < modifier ? width : (
                Math.max(width - (num - modifier) * 88, width / 2)
              )
            }
            y1={num < modifier ? (num + 1) * 33.333 : 210}
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
