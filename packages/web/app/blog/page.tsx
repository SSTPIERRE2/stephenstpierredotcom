import styles from './page.module.css';
import TagSidebar from '@/components/TagSidebar';
import { Suspense } from 'react';
import PostSkeletonGallery from '@/components/PostSkeletonGallery';
import TagSkeletonSidebar from '@/components/TagSkeletonSidebar';
import PostGalleryContainer from '@/components/PostGalleryContainer';

const BlogPage = () => {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <Suspense fallback={<PostSkeletonGallery />}>
          <PostGalleryContainer />
        </Suspense>
      </main>
      <Suspense fallback={<TagSkeletonSidebar />}>
        <TagSidebar />
      </Suspense>
    </div>
  );
};

export default BlogPage;
