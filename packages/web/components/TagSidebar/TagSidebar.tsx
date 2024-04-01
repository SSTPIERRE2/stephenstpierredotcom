import PrimaryLink from '../PrimaryLink';
import TagSkeleton from '../TagSkeleton';
import styles from './TagSidebar.module.css';
import { Tag } from '@core/tag';
import { Table } from 'sst/node/table';

const TagTable = Table.Tag.tableName;

const TagList = async () => {
  const tags = await Tag.list(TagTable);

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
