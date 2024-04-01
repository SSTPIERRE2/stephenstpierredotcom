import { Post } from '@core/post';
import PostGallery from '../PostGallery';
import { Table } from 'sst/node/table';

const PostTable = Table.Post.tableName;

interface Props {
  tag?: string;
  numSkeletonPosts?: number;
}

const PostGalleryContainer = ({ tag, numSkeletonPosts = 4 }: Props) => {
  async function getPosts() {
    'use server';

    const posts = await Post.queryPublished(PostTable, tag);
    return posts;
  }

  return (
    <PostGallery getPosts={getPosts} numSkeletonPosts={numSkeletonPosts} />
  );
};

export default PostGalleryContainer;
