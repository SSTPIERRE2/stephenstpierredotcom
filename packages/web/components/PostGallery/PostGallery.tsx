import TextWithBorder from '../TextWithBorder';
import styles from './PostGallery.module.css';
import Link from 'next/link';
import { Post } from '@core/post';
import PostCard from '@/components/PostCard';

const PostGallery = async () => {
  const posts = await Post.getPublishedPostsWithTags();

  return (
    <div className={styles.container}>
      <TextWithBorder as={Link} href="/blog" className={styles.link}>
        Blog Posts
      </TextWithBorder>
      <div className={styles.gallery}>
        {posts.map((post) => {
          const { id, title, slug, published_on, abstract, tags } = post;
          return (
            <PostCard
              key={id}
              title={title}
              slug={slug}
              publishedOn={published_on}
              abstract={abstract}
              tags={tags}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostGallery;
