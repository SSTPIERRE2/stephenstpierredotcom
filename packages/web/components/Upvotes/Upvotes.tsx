'use client';

import { useAuth } from '@/app/context/AuthContext';
import styles from './Upvotes.module.css';
import { gql, useMutation, useQuery } from 'urql';
import { ThumbsUp } from 'react-feather';
import clsx from 'clsx';

interface Props {
  postId: string;
  className?: string;
}

const TotalUpvotesQuery = gql`
  query($postId: String!) {
    totalPostUpvotes(postId: $postId) {
      votes
    }
  }
`

const RecentVisitorUpvotesQuery = gql`
  query($postId: String!, $visitorId: String!) {
    recentUpvotesByVisitorId(postId: $postId, visitorId: $visitorId) {
      votes
    }
  }
`

const CreateOrUpdateUpvoteQuery = gql`
  mutation($postId: String!, $visitorId: String!) {
    createOrUpdateUpvote(postId: $postId, visitorId: $visitorId) {
      votes
    }
  }
`

const Upvotes = ({ postId, className }: Props) => {
  const { visitorId } = useAuth();
  const [totalUpvotes] = useQuery({
    query: TotalUpvotesQuery,
    variables: {
      postId
    }
  });
  // const [recentVisitorUpvotes] = useQuery({
  //   query: RecentVisitorUpvotesQuery,
  //   variables: {
  //     postId,
  //     visitorId
  //   }
  // });
  // const [result, createOrUpdateUpvote] = useMutation(CreateOrUpdateUpvoteQuery);

  // console.log(`Upvotes`, totalUpvotes, recentVisitorUpvotes);
  console.log(`hello upvotes`, totalUpvotes);



  return (
    <button className={clsx(styles.wrapper, className)}>
      <ThumbsUp size="1.5rem" />
    </button>
  )
}

export default Upvotes;