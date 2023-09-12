'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useCreateAnalytic } from '@/hooks/useAnalytics';
import { useEffect, useState } from 'react';
import { gql, useMutation } from 'urql';
import styles from './MessageForm.module.css';

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

  console.log('MessageForm ', email, message, result);

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
    console.log('onSubmit ran!');
    createMessage({ email, text: message });
  };

  useEffect(() => {
    if (!result.fetching && !!result?.data) {
      console.log(`setting email with result now`);

      setEmail(email);
      createAnalytic({
        name: 'form',
        metadata: JSON.stringify(result.data),
      });
    }
  }, [result]);

  return (
    <div className={styles.wrapper}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Let's get in touch!</h2>
        <p>
          I would appreciate any job inquiries and/or feedback about this
          website, so shoot me a message any time. In the future I plan to let
          subscribers know when I publish new content, but you can unsubuscribe
          any time, stay tuned.{' '}
        </p>
      </div>
      <form onSubmit={onSubmit} className={styles.formContainer}>
        <div className={styles.emailFlexContainer}>
          <div className={styles.container}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              value={email}
              onChange={onChange}
              className={styles.email}
              autoComplete="email"
              type="email"
            />
          </div>
        </div>
        <div className={styles.messageFlexContainer}>
          <div className={styles.container}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={onChange}
              className={styles.message}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={result?.fetching || false}
          className={styles.send}
        >
          <span className={styles.sendText}>Send</span>
        </button>
        {!!result?.data?.createMessage && (
          <p className={styles.successText}>
            Success! Thanks for engaging with my website! I went ahead and saved
            your email for future messages.
          </p>
        )}
      </form>
    </div>
  );
};

export default MessageForm;
