import styles from './page.module.css';
import { NextPage } from 'next';
import TagSidebar from '@/components/TagSidebar';
import TagSkeletonSidebar from '@/components/TagSkeletonSidebar';
import { Suspense } from 'react';
import PostGalleryContainer from '@/components/PostGalleryContainer';
import PostSkeletonGallery from '@/components/PostSkeletonGallery';

const TagPage: NextPage<{ params: { tag: string } }> = ({
  params: { tag },
}) => {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <h2>Posts tagged #{tag}</h2>
        <Suspense fallback={<PostSkeletonGallery numPosts={2} />}>
          <PostGalleryContainer tag={tag} />
        </Suspense>
      </main>

      <Suspense fallback={<TagSkeletonSidebar />}>
        <TagSidebar />
      </Suspense>
    </div>
  );
};

export default TagPage;
