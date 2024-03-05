import Sandpack from '@/components/Sandpack';

const NotFound = () => {
  return (
    <Sandpack
      template="react"
      files={{
        'App.js': `import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <a>Home</a>
        <a>Blog</a>
        <a>About</a>
      </header>

      <main>
        <h1>404 Not Found</h1>
        <p>This page does not exist. Please check the URL and try again.</p>
      </main>

      <footer>
        <div className={styles.links}>
          <h3>Links</h3>
          <a>Github</a>
          <a>Twitter</a>
          <a>Stackoverflow</a>
        </div>
      </footer>
    </div>
  );
}`,
        'App.module.css': `* {
  margin: 0;
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr min-content;
  min-height: 100svh;
}

main {
  padding: 1rem 0;
  text-align: center;
}

h1 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.header {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
}

footer {
  border-top: 1px solid #ccc;
  padding: 1rem;
}

.links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@media (min-width: 600px) {
  h1 {
    margin-top: 128px;
  }

  .links {
    flex-direction: column;
    align-items: flex-start;
  }
}`,
      }}
    />
  );
};

export default NotFound;
