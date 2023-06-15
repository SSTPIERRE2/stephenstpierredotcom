'use client';

import { useEffect, useState } from 'react';
import { gql, useMutation } from 'urql';

const defaultState = {
  username: '',
  password: '',
};

const LoginQuery = gql`
  mutation ($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      error
      token
    }
  }
`;

const LoginForm = () => {
  const [value, setValue] = useState(defaultState);
  const { username, password } = value;
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
    signIn({ username, password });
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token && !result.fetching && !!result.data.signIn.token) {
      localStorage.setItem('authToken', result.data.signIn.token);
    }
  }, [result]);

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">Username:</label>
      <input id="username" value={username} onChange={onChange} />
      <label htmlFor="password">Password:</label>
      <input id="password" value={password} onChange={onChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
