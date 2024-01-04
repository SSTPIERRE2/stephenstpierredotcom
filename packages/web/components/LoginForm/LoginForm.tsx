'use client';

import { useCreateAnalytic } from '@/hooks/useAnalytics';
import { useEffect, useState } from 'react';
import { gql, useMutation } from 'urql';

const defaultState = {
  email: '',
  password: '',
};

const LoginQuery = gql`
  mutation ($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      error
      isAuthorized
    }
  }
`;

const LoginForm = () => {
  const [value, setValue] = useState(defaultState);
  const { email, password } = value;
  const [result, signIn] = useMutation(LoginQuery);
  const { createAnalytic } = useCreateAnalytic();

  console.log('Login result: ', result);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn({ email, password });
  };

  useEffect(() => {
    if (!result.fetching && !!result?.data) {
      createAnalytic({
        name: 'form',
        metadata: JSON.stringify(result.data),
      });
    }

    if (!result.fetching && !!result?.data?.signIn?.isAuthorized) {
      // make request to magic link auth route
      // fetch(`${API_URL}/auth/link/authorize?email=${result.data.signIn.email}`);
    }
  }, [result, createAnalytic]);

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">Email:</label>
      <input id="email" value={email} onChange={onChange} />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={onChange}
      />
      <button type="submit" disabled={result.fetching}>
        Submit
      </button>
      {!!result?.data?.signIn?.isAuthorized && (
        <p>Success! A magic link has been sent to your email.</p>
      )}
    </form>
  );
};

export default LoginForm;
