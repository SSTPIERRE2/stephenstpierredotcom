import styles from './page.module.css';
import { NextPage } from 'next';
import TagSidebar from '@/components/TagSidebar';
import PostGalleryContainer from '@/components/PostGalleryContainer';

const TagPage: NextPage<{ params: { tag: string } }> = ({
  params: { tag },
}) => {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <h2>Posts tagged #{tag}</h2>
        <PostGalleryContainer tag={tag} numSkeletonPosts={1} />
      </main>

      <TagSidebar />
    </div>
  );
};

export default TagPage;
