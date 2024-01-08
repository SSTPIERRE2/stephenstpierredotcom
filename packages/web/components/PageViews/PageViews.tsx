'use client';

import styles from './PageViews.module.css';
import { gql, useMutation } from 'urql';
import { useEffect, useState } from 'react';

interface Props {
  views: number;
  postId: string;
}

const IncrementViewsQuery = gql`
  mutation IncrementViews ($postId: String!) {
    incrementViews(postId: $postId) {
      views
    }
  }
`

const PageViews = ({ views, postId }: Props) => {
  const [result, incrementViews] = useMutation(IncrementViewsQuery);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    incrementViews({ postId });
  }, [postId, incrementViews]);


  return (
    <div>
      {result?.data?.incrementViews?.views || views}
    </div>
  )
}

export default PageViews;