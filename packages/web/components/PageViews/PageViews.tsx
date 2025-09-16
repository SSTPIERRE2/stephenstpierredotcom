import range from '@/utils/range';
import styles from './PageViews.module.css';
import { incrementViews } from '@/app/actions/incrementViews';

interface Props {
  postSlug: string;
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

const PageViews = async ({ postSlug, initialViews }: Props) => {
  const views = await incrementViews(postSlug);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <span>{getDisplay(views || initialViews)}</span>
      </div>
    </div>
  );
};

export default PageViews;
