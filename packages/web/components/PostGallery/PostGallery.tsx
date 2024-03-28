'use client';

import styles from './PostGallery.module.css';
import { PublishedPostWithTags } from '@core/post';
import PostCard from '@/components/PostCard';
import { useEffect, useState } from 'react';
import PostSkeletonGallery from '../PostSkeletonGallery';

interface Props {
  getPosts: Function;
}

const PostGallery = ({ getPosts }: Props) => {
  const [posts, setPosts] = useState<PublishedPostWithTags[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getPosts();
      setPosts(data);
    };

    getData();
  }, []);

  if (posts.length) {
    return (
      <div className={styles.gallery}>
        {posts.map((post) => {
          const { id, title, slug, published_on, abstract, tags, updated } =
            post;
          return (
            <PostCard
              key={id}
              title={title}
              slug={slug}
              publishedOn={published_on}
              abstract={abstract}
              tags={tags}
              updated={updated}
            />
          );
        })}
      </div>
    );
  }

  return <PostSkeletonGallery />;
};

export default PostGallery;
