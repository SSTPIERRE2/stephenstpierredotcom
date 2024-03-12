import styles from './page.module.css';
import { NextPage } from 'next';
import { Post } from '@core/post';
import PostCard from '@/components/PostCard';
import TagSidebar from '@/components/TagSidebar';

const TagPage: NextPage<{ params: { tag: string } }> = async ({
  params: { tag },
}) => {
  const posts = await Post.getByTagWithRelations(tag);

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <h2>Posts tagged #{tag}</h2>
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
      </main>
      <TagSidebar />
    </div>
  );
};

export default TagPage;
