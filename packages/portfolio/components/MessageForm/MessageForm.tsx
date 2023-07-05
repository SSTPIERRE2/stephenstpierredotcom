'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useCreateAnalytic } from '@/hooks/useAnalytics';
import { useEffect, useState } from 'react';
import { gql, useMutation } from 'urql';

const defaultState = {
  email: '',
  message: '',
};

const MessageQuery = gql`
  mutation ($email: String!, $text: String!) {
    createMessage(email: $email, text: $text) {
      id
    }
  }
`;

const MessageForm = () => {
  const [value, setValue] = useState(defaultState);
  const { email, message } = value;
  const [result, createMessage] = useMutation(MessageQuery);
  const { createAnalytic } = useCreateAnalytic();
  const { setEmail } = useAuth();

  console.log('Login result: ', result);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue({
      ...value,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMessage({ email, text: message });
  };

  useEffect(() => {
    if (!result.fetching && !!result?.data) {
      setEmail(email);
      createAnalytic({
        name: 'form',
        metadata: JSON.stringify(result.data),
      });
    }
  }, [result]);

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">Email:</label>
      <input id="email" value={email} onChange={onChange} />
      <label htmlFor="message">Message:</label>
      <textarea id="message" value={message} onChange={onChange} />
      <button type="submit" disabled={result.fetching}>
        Send
      </button>
      {!!result?.data?.createMessage && (
        <p>
          Success! Thanks for engaging with my website! I went ahead and saved
          your email for future messages.
        </p>
      )}
    </form>
  );
};

export default MessageForm;
