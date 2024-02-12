import range from '@/utils/range';
import styles from './PageViews.module.css';
import { Post } from '@core/post';

interface Props {
  id: string;
  initialViews: number;
}

async function incrementPostViews(postId: string) {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  const result = await Post.incrementViews(postId);

  return result.views;
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
  const views = await incrementPostViews(id);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <span>{getDisplay(views || initialViews)}</span>
      </div>
    </div>
  );
};

export default PageViews;
