import styles from './page.module.css';
import { Post } from '@core/post';
import { dbUtils } from '@core/utils';
import PrimaryLink from '@/components/PrimaryLink';
import SupportingLink from '@/components/SupportingLink';

const TagPage = async () => {
  const posts = await Post.getPublishedPostsWithTags();
  const allTags = await dbUtils.listTableRecords('tag');

  return (
    <div className={styles.wrapper}>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <span>{post.published_on}</span>
          {post.tags.map((tag) => (
            <SupportingLink key={tag} href={`/blog/tags/${tag}`}>
              #{tag}
            </SupportingLink>
          ))}
          <p>{post.abstract}</p>
        </div>
      ))}
      <div>
        <h2>Tags</h2>
        {allTags.map((tag) => (
          <PrimaryLink key={tag.id} href={`/blog/tags/${tag.id}`}>
            #{tag.name}
          </PrimaryLink>
        ))}
      </div>
    </div>
  );
};

export default TagPage;
