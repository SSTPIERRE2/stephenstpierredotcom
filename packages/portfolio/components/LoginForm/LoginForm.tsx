'use client';

import { API_ENDPOINTS } from '@/utils/constant';
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
    if (!result.fetching && !!result?.data?.signIn?.isAuthorized) {
      // make request to auth API route
      fetch(`${API_ENDPOINTS.magicLink}?email=${result.data.signIn.email}`);
    }
  }, [result]);

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">Email:</label>
      <input id="email" value={email} onChange={onChange} />
      <label htmlFor="password">Password:</label>
      <input id="password" value={password} onChange={onChange} />
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
