import Sandpack from '@/components/Sandpack';

const DynamicRow = () => {
  return (
    <Sandpack
      template="react"
      files={{
        'App.js': `import styles from './App.module.css';

export default function App() {
  return (
    <main>
      <section>
        <h1>CSS Grid is Awesome</h1>
        <p>Grid is the latest and greatest layout mode.</p>
        <p>
          This grid is made of multiple columns in order to distribute elements
          dynamically based on the screen size.
        </p>
        <p>
          Try editing the number of columns and/or the grid-column property on
          the article and aside elements to change how much space they take up!
        </p>
      </section>
      <section className={styles.properties}>
        <h2 id="demo-2-grid-properties">Grid Properties</h2>
        <p>
          <code>grid-template-columns</code> controls the number and size of
          columns
        </p>
        <p>
          <code>grid-template-rows</code> controls the number and size of rows
        </p>
        <p>
          <code>gap</code> controls the amount of space between columns and rows
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
      <aside>
        <h3>Other Layout Modes</h3>
        <ul>
          <li>Flow</li>
          <li>Positioned</li>
          <li>Flexbox</li>
        </ul>
      </aside>
    </main>
  );
}`,
        'App.module.css': `* {
  margin: 0;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

h3 {
  margin-bottom: 1rem;
  font-size: 1rem;
}

p {
  margin-top: 1rem;
}

ul {
  padding-inline-start: 1rem;
}

li {
  margin-top: 0.5rem;
}

main {
  padding: 1rem;
  display: grid;
  grid-row-gap: 1rem;
  margin: 0 auto;
  max-width: 800px;
}

section {
  max-width: 65ch;
}

aside {
  font-size: 0.75rem;
}

@media (min-width: 320px) {
  main {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
  
  section {
    grid-column: 1 / 9;
  }
  
  aside {
    grid-column: 10 / -1;
    grid-row: 1;
  }

  .properties {
    grid-row: 3;
  }
}`,
      }}
    />
  );
};

export default DynamicRow;
