import { Post } from '@core/post-dynamo';
import Upvotes from './Upvotes';
import { Table } from 'sst/node/table';

const PostTable = Table.Post.tableName;

interface Props {
  postId: string;
  initialVotes: number;
  className?: string;
}

const UpvotesContainer = async ({ postId, initialVotes, className }: Props) => {
  async function incrementVotes() {
    'use server';

    return Post.increment(PostTable, postId, 'likes');
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
