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

  console.log(`pageViews?`, result);


  return result.views;
}

const PageViews = async ({ id, initialViews }: Props) => {
  const views = await incrementPostViews(id);

  return (
    <div>
      Page Views: {views || initialViews}
    </div>
  )
}

export default PageViews;