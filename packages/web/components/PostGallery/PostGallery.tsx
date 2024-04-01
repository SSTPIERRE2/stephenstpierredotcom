'use client';

import styles from './PostGallery.module.css';
import { PublishedPost } from '@core/post-dynamo';
import PostCard from '@/components/PostCard';
import { useEffect, useState } from 'react';
import PostSkeletonGallery from '../PostSkeletonGallery';
import LogRocket from 'logrocket';
import { toErrorWithMessage } from '@/utils/getError';

interface Props {
  getPosts: () => Promise<PublishedPost[]>;
  numSkeletonPosts: number;
}

const PostGallery = ({ getPosts, numSkeletonPosts }: Props) => {
  const [posts, setPosts] = useState<PublishedPost[]>();

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
  }, []);

  return (
    <div className={styles.gallery}>
      {posts ?
        posts.map((post) => {
          const { id, title, slug, publishedOn, abstract, tags, updated } =
            post;
          return (
            <PostCard
              key={id}
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
