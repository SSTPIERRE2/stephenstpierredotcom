import PrimaryLink from '../PrimaryLink';
import styles from './TagSidebar.module.css';
import { dbUtils } from '@core/utils';

const TagList = async () => {
  let allTags = [];

  try {
    allTags = await dbUtils.listTableRecords('tag');
  } catch (err) {
    allTags = await dbUtils.listTableRecords('tag');
  }

  return (
    <aside className={styles.aside}>
      <h2>Tags</h2>
      <div className={styles.flexRow}>
        {allTags.map((tag) => (
          <PrimaryLink key={tag.id} href={`/blog/tags/${tag.name}`}>
            #{tag.name}
          </PrimaryLink>
        ))}
      </div>
    </aside>
  );
};

export default TagList;
