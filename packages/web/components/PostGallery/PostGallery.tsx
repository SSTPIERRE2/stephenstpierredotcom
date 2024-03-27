import styles from './PostGallery.module.css';
import { PublishedPostWithTags } from '@core/post';
import PostCard from '@/components/PostCard';

interface Props {
  posts: PublishedPostWithTags[];
}

const PostGallery = ({ posts }: Props) => {
  return (
    <div className={styles.gallery}>
      {posts.map((post) => {
        const { id, title, slug, published_on, abstract, tags, updated } = post;
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
};

export default PostGallery;
