import styles from './page.module.css';
import { NextPage } from 'next';
import { Post } from '@core/post';
import { dbUtils } from '@core/utils';

const TagPage: NextPage<{ params: { tag: string; } }> = async ({ params: { tag } }) => {
  const posts = await Post.getByTagWithRelations(tag);
  const allTags = await dbUtils.listTableRecords('tag');

  return (
    <div className={styles.wrapper}>
      <h2>Posts tagged #{tag}</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <span>{post.published_on}</span>
          {post.tags.map(tag => <span key={tag}>#{tag}</span>)}
          <p>{post.abstract}</p>
        </div>
      ))}
      <div>
        <h2>Tags</h2>
        {allTags.map(tag => (
          <span key={tag.id}>#{tag.name}</span>
        ))}
      </div>
    </div>
  )
}

export default TagPage;