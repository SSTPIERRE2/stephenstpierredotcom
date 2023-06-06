import Shuriken from '../Shuriken/Shuriken';
import styles from './logo.module.css';

const Logo = () => {
  return (
    <a className={styles.wrapper}>
      <span className={`${styles.text} ${styles.mainText}`}>Stephen</span>
      <span className={`${styles.text} ${styles.subCopy}`}>Stephen</span>
      <Shuriken className={styles.star} />
      <Shuriken className={`${styles.star} ${styles.starTwo}`} />
      <div className={`${styles.wrapper} ${styles.lastNameWrapper}`}>
        <span
          className={`${styles.text} ${styles.mainText} ${styles.lastNameText}`}
        >
          St.Pierre
        </span>
        <span
          className={`${styles.text} ${styles.subCopy} ${styles.lastNameText}`}
        >
          St.Pierre
        </span>
      </div>
    </a>
  );
};

export default Logo;
