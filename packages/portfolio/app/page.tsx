import MessageForm from '@/components/MessageForm';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h2>Welcome to my website</h2>
      <MessageForm />
    </main>
  );
}
