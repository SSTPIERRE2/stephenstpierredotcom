'use client';

import styled from 'styled-components';
import Logo from '@/components/Logo';
import { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from 'urql';

const AnalyticsQuery = gql`
  query {
    analyticsEvents {
      id
    }
  }
`;

const CreateAnalyticsQuery = gql`
  mutation ($name: String!, $email: String!, $metadata: String!) {
    createAnalyticsEvent(name: $name, email: $email, metadata: $metadata) {
      name
      email
      metadata
    }
  }
`;

export default function Home() {
  const [key, setKey] = useState(0);
  const [result, reexecuteQuery] = useQuery({
    query: AnalyticsQuery,
  });
  const [result2, createAnalytic] = useMutation(CreateAnalyticsQuery);

  const { data, fetching, error } = result;

  console.log(data, fetching, error);
  console.log(result2);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      console.log(
        'clientX',
        e.clientX,
        'clientY',
        e.clientY,
        'movementX',
        e.movementX,
        'movementY',
        e.movementY
      );
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const handleClick = () => {
    setKey(key + 1);
    createAnalytic({
      name: 'buttonClick',
      email: 'tester@gmail.com',
      metadata: JSON.stringify({ a: 'Hello' }),
    });
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
