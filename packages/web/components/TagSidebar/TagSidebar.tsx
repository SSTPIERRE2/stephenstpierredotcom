import PrimaryLink from '../PrimaryLink';
import TagSkeleton from '../TagSkeleton';
import styles from './TagSidebar.module.css';
import { Tag } from '@core/tag';

const TagList = async () => {
  const tags = await Tag.list();

  return (
    <aside className={styles.aside}>
      <h2>Tags</h2>
      <div className={styles.flexRow}>
        {tags ?
          tags.map((tag) => (
            <PrimaryLink key={tag.name} href={`/blog/tags/${tag.name}`}>
              #{tag.name}
            </PrimaryLink>
          ))
        : <TagSkeleton />}
      </div>
    </aside>
  );
};

export default TagList;
