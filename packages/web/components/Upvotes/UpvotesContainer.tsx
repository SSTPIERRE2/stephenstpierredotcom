import { Post } from '@core/post';
import Upvotes from './Upvotes';

interface Props {
  postSlug: string;
  initialVotes: number;
  className?: string;
}

const UpvotesContainer = ({ postSlug, initialVotes, className }: Props) => {
  async function incrementVotes() {
    'use server';

    const updated = await Post.increment(postSlug, 'likes');
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
