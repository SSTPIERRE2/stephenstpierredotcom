import { PostUpvote } from '@core/postUpvote';
import { revalidatePath } from 'next/cache';
import Upvotes from './Upvotes';

interface Props {
  postId: string;
  visitorId: string;
  className?: string;
}

const UpvotesContainer = async ({ postId, visitorId, className }: Props) => {
  const { votes } = await PostUpvote.getTotalPostUpvotes(postId);
  const recentVotes = await PostUpvote.getRecentUpvotesByVisitorId(postId, visitorId);

  async function incrementVotes() {
    'use server';

    await PostUpvote.createOrUpdate(postId, visitorId, recentVotes?.id);

    revalidatePath('/[postSlug]', 'page');
  }

  return <Upvotes votes={votes} className={className} incrementVotes={incrementVotes} />
}

export default UpvotesContainer;