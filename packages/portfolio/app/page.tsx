'use client';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  const handleSignin = () => {
    router.push('/auth/google/authorize');
  };

  return (
    <main className={styles.main}>
      This is the home page
      <button onClick={handleSignin}>Sign in with Google</button>
    </main>
  );
}
