'use client';

import { useState } from 'react';

export default function Home() {
  const [key, setKey] = useState(0);

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Hello world!</h1>
      <button style={{ marginTop: '100px' }} onClick={() => setKey(key + 1)}>
        Animate
      </button>
    </main>
  );
}
