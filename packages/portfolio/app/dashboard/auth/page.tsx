import LoginForm from '@/components/LoginForm/LoginForm';
import styles from './page.module.css';

export default function DashboardAuthPage() {
  return (
    <main className={styles.main}>
      This is the Dashboard Authentication page
      <LoginForm />
    </main>
  );
}
