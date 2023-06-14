import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.innerContainer}>
        Copyright Stephen St.Pierre 2023
      </div>
    </footer>
  );
};

export default Footer;
