import { Post } from '@core/post';
import Upvotes from './Upvotes';

interface Props {
  postId: string;
  initialVotes: number;
  className?: string;
}

const UpvotesContainer = ({ postId, initialVotes, className }: Props) => {
  async function incrementVotes() {
    'use server';

    const updated = await Post.increment(postId, 'likes');
    return updated;
  }

  return (
    <Upvotes
      initialVotes={initialVotes}
      className={className}
      incrementVotes={incrementVotes}
    />
  );
};

export default UpvotesContainer;
