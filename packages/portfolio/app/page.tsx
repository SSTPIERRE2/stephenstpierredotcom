'use client';
import MessageForm from '@/components/MessageForm/MessageForm';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      This is the home page
      <MessageForm />
    </main>
  );
}
