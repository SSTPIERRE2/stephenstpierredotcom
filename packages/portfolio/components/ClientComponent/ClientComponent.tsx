'use client';

import styles from './ClientComponent.module.css';
import { Portal } from '@headlessui/react';

const ClientComponent = () => {
  return (
    <Portal>
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '50%',
        }}
      >
        <p>ClientComponent here!</p>
      </div>
    </Portal>
  );
};

export default ClientComponent;
