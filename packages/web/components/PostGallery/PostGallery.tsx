'use client';

import styles from './PostGallery.module.css';
import { Post } from '@core/post';
import PostCard from '@/components/PostCard';
import { useEffect, useState } from 'react';
import PostSkeletonGallery from '../PostSkeletonGallery';
import LogRocket from 'logrocket';
import { toErrorWithMessage } from '@/utils/getError';

interface Props {
  getPosts: () => Promise<Post[]>;
  numSkeletonPosts: number;
}

const PostGallery = ({ getPosts, numSkeletonPosts }: Props) => {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    const getData = async () => {
      const data = await getPosts();

      setPosts(data);
    };

    try {
      getData();
    } catch (err) {
      LogRocket.captureException(toErrorWithMessage(err));
    }
  }, [getPosts]);

  return (
    <div className={styles.gallery}>
      {posts ?
        posts.map((post) => {
          const { title, slug, publishedOn, abstract, tags, updated } = post;
          return (
            <PostCard
              key={slug}
              title={title}
              slug={slug}
              publishedOn={publishedOn}
              abstract={abstract}
              tags={tags}
              updated={updated}
            />
          );
        })
      : <PostSkeletonGallery numPosts={numSkeletonPosts} />}
    </div>
  );
};

export default PostGallery;
