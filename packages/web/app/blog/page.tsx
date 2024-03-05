import styles from './page.module.css';
import { Post } from '@core/post';
import PostCard from '@/components/PostCard';
import TagSidebar from '@/components/TagSidebar';

const BlogPage = async () => {
  const posts = await Post.getPublishedPostsWithTags();

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
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
      </main>
      <TagSidebar />
    </div>
  );
};

export default BlogPage;
