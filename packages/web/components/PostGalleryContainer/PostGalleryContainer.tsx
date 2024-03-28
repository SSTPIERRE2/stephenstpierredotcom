import { Post } from '@core/post';
import PostGallery from '../PostGallery';

interface Props {
  tag?: string;
}

const PostGalleryContainer = ({ tag }: Props) => {
  async function getPosts() {
    'use server';

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

    return posts;
  }

  return <PostGallery getPosts={getPosts} />;
};

export default PostGalleryContainer;
