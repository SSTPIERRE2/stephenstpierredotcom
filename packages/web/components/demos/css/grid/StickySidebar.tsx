import Sandpack from '@/components/Sandpack';

const StickySidebar = () => {
  return (
    <Sandpack
      template="react"
      files={{
        'App.js': `import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.container}>
      <header>
        <h1>Yet Another Developer Blog</h1>
      </header>
      <main>
        <section>
          <h2 id="demo-4-title">CSS Grid is Awesome</h2>
          <p>Grid is the latest and greatest layout mode.</p>
          <p>
            This grid is made of multiple columns in order to distribute
            elements dynamically based on the screen size.
          </p>
          <p>
            Try editing the number of columns and/or the grid-column property on
            the article and aside elements to change how much space they take
            up!
          </p>
        </section>
        <section>
          <h2 id="demo-4-grid-properties">Grid Properties</h2>
          <p>
            <code>grid-template-columns</code> controls the number and size of
            columns
          </p>
          <p>
            <code>grid-template-rows</code> controls the number and size of rows
          </p>
          <p>
            <code>gap</code> controls the amount of space between columns and
            rows
          </p>
          <p>
            <code>grid-column</code> controls the columns a particular element
            spans
          </p>
          <p>
            <code>grid-row</code> controls the rows a particular element spans
          </p>
          <p>
            <code>grid-area</code> controls the position of a particular element
            within defined grid areas
          </p>
        </section>
      </main>
      <aside>
        <div className={styles.sticky}>
          <h3>Other Layout Modes</h3>
          <ol>
            <li>Flow</li>
            <li>Positioned</li>
            <li>Flexbox</li>
            <li>Float</li>
            <li>Multi-Column</li>
            <li>Flow</li>
            <li>Positioned</li>
            <li>Flexbox</li>
            <li>Float</li>
            <li>Multi-Column</li>
            <li>Flow</li>
            <li>Positioned</li>
            <li>Flexbox</li>
            <li>Float</li>
            <li>Multi-Column</li>
            <li>Flow</li>
            <li>Positioned</li>
            <li>Flexbox</li>
            <li>Float</li>
            <li>Multi-Column</li>
            <li>Flow</li>
            <li>Positioned</li>
            <li>Flexbox</li>
            <li>Float</li>
            <li>Multi-Column</li>
            <li>Flow</li>
            <li>Positioned</li>
            <li>Flexbox</li>
            <li>Float</li>
            <li>Multi-Column</li>
            <li>Flow</li>
            <li>Positioned</li>
            <li>Flexbox</li>
            <li>Float</li>
            <li>Multi-Column</li>
            <li>Flow</li>
            <li>Positioned</li>
            <li>Flexbox</li>
            <li>Float</li>
            <li>Multi-Column</li>
            <li>Flow</li>
            <li>Positioned</li>
            <li>Flexbox</li>
            <li>Float</li>
            <li>Multi-Column</li>
          </ol>
        </div>
      </aside>
      <footer>
        <p>Copyright &copy;</p>
      </footer>
    </div>
  );
}`,
        'App.module.css': `* {
  margin: 0;
}

h1 {
  font-size: 2rem;
}

h2 {
  margin-bottom: 1.25rem;
}

h3 {
  margin-bottom: 1rem;
  font-size: 1rem;
}

p {
  margin: 1rem 0;
}

footer > p {
  margin: 0;
}

ol {
  padding-inline-start: 1rem;
}

li {
  margin-top: 0.5rem;
}

.container {
  display: grid;
  grid-row-gap: 1rem;
  margin: 0 auto;
  max-width: 800px;
}

header {
  border-bottom: 1px solid #ccc;
  padding: 1rem;
  grid-row: 1;
  position: sticky;
  top: 0;
  background: white;
  z-index: 2;
  text-align: center;
}

main {
  padding: 0 1rem;
  /* This is to simulate some scrollable content */
  min-height: 250vh;
}

section {
  max-width: 65ch;
}

aside {
  font-size: 0.75rem;
  position: relative;
}

footer {
  border-top: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
}

@media (min-width: 320px) {
  .container {
    grid-template-columns: repeat(12, 1fr);
  }

  header {
    grid-column: 1 / -1;
  }

  main {
    grid-column: 1 / 9;
  }

  aside {
    grid-column: 10 / -1;
    grid-row: 2;
    /* Try setting sticky properties directly on the grid child
      and then comment out the .sticky container
    */
    /* position: sticky;
    top: 5rem;
    align-self: start; */
  }

  .sticky {
    position: sticky;
    top: 5rem;
  }

  footer {
    grid-column: 1 / -1;
    grid-row: 3;
  }
}`,
      }}
    />
  );
};

export default StickySidebar;
