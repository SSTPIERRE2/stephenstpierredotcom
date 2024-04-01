import { Post } from '@core/post';
import Upvotes from './Upvotes';
import { Table } from 'sst/node/table';

const PostTable = Table.Post.tableName;

interface Props {
  postId: string;
  initialVotes: number;
  className?: string;
}

const UpvotesContainer = ({ postId, initialVotes, className }: Props) => {
  async function incrementVotes() {
    'use server';

    const updated = await Post.increment(PostTable, postId, 'likes');
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
