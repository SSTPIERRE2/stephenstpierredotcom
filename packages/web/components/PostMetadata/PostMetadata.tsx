'use client';

import { useLayoutEffect } from 'react';

interface Props {
  title: string;
  description: string;
}

const PostMetadata = ({ title, description }: Props) => {
  useLayoutEffect(() => {
    if (!!title && !!description) {
      document.title = title;
      const head = document.querySelector('head');

      if (head) {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        head.appendChild(meta);
      }
    }
  }, [title, description]);

  return null;
};

export default PostMetadata;
