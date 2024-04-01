import range from '@/utils/range';
import styles from './PageViews.module.css';
import { Post } from '@core/post-dynamo';
import { Table } from 'sst/node/table';

const PostTable = Table.Post.tableName;

interface Props {
  id: string;
  initialViews: number;
}

const getDisplay = (views: number) => {
  const MAX_LENGTH = 6;
  const zerosToAdd = MAX_LENGTH - String(views).length;
  let display = '';

  range(zerosToAdd).forEach(() => {
    display += '0';
  });

  return display + views;
};

const PageViews = async ({ id, initialViews }: Props) => {
  const views = await Post.increment(PostTable, id, 'views');

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <span>{getDisplay(views || initialViews)}</span>
      </div>
    </div>
  );
};

export default PageViews;
