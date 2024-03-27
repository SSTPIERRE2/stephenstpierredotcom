import { Post } from '@core/post';
import PostGallery from '../PostGallery';

interface Props {
  tag?: string;
}

const PostGalleryContainer = async ({ tag }: Props) => {
  let posts = [];
  let query = Post.getPublishedPostsWithTags;

  if (tag) {
    query = () => Post.getPublishedPostsByTagWithRelations(tag);
  }

  try {
    posts = await query();
  } catch (err) {
    posts = await query();
  }

  return <PostGallery posts={posts} />;
};

export default PostGalleryContainer;
