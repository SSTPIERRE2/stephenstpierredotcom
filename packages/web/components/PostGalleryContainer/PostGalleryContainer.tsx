import { Post } from '@core/post-dynamo';
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

    return Post.queryPublished(PostTable, tag);
  }

  return (
    <PostGallery getPosts={getPosts} numSkeletonPosts={numSkeletonPosts} />
  );
};

export default PostGalleryContainer;
