'use client';

import { useLayoutEffect } from 'react';

interface Props {
  title: string;
  abstract: string;
  tags: string[];
}

const PostMetadata = ({ title, abstract, tags }: Props) => {
  useLayoutEffect(() => {
    document.title = title;
    const head = document.querySelector('head');

    if (head) {
      const description = document.createElement('meta');
      description.name = 'description';
      description.content = abstract;
      const keywords = document.createElement('meta');
      keywords.name = 'keywords';
      keywords.content = tags.join(',');
      head.appendChild(description);
      head.appendChild(keywords);
    }
  }, [title, abstract, tags]);

  return null;
};

export default PostMetadata;
