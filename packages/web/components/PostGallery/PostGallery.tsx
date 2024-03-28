'use client';

import styles from './PostGallery.module.css';
import { PublishedPostWithTags } from '@core/post';
import PostCard from '@/components/PostCard';
import { useEffect, useState } from 'react';
import PostSkeletonGallery from '../PostSkeletonGallery';
// import useAbortController from '@/hooks/useAbortController';

interface Props {
  getPosts: Function;
}

const PostGallery = ({ getPosts }: Props) => {
  // const signal = useAbortController();
  const [posts, setPosts] = useState<PublishedPostWithTags[]>([]);

  useEffect(() => {
    const getData = async () => {
      // return new Promise((resolve) => {
      //   setTimeout(async () => {
      console.log(`PostGallery getting posts...`);
      const data = await getPosts();
      console.log(`PostGallery got posts`, data);

      if (!!data && data.length) {
        setPosts(data);
      }
      //     resolve();
      //   }, 5000);
      // });
    };

    getData();
  }, []);

  if (!!posts && posts.length) {
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
