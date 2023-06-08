'use client';

import styled from 'styled-components';
import Logo from '@/components/Logo';
import { useState } from 'react';
import { useQueryAnalytics } from '@/hooks/useAnalytics';

export default function Home() {
  const [key, setKey] = useState(0);
  // const { result } = useQueryAnalytics({
  //   fields: [{ name: 'email', value: 'tester@gmail.com' }],
  // });
  // console.log('got result?', result);

  const handleClick = () => {
    setKey(key + 1);
    // createAnalytic({
    //   name: 'buttonClick',
    //   email: 'tester@gmail.com',
    //   metadata: JSON.stringify({ a: 'Hello' }),
    // });
  };

  return (
    <Main>
      <Logo key={key} />
      <button style={{ marginTop: '100px' }} onClick={handleClick}>
        Animate
      </button>
    </Main>
  );
}

const Main = styled.main`
  padding: 1rem;
`;

const Header = styled.header``;
