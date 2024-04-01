import styles from './page.module.css';
import TagSidebar from '@/components/TagSidebar';
import PostGalleryContainer from '@/components/PostGalleryContainer';

const BlogPage = () => {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <PostGalleryContainer />
      </main>
      <TagSidebar />
    </div>
  );
};

export default BlogPage;
