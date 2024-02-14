import SupportingLink from '../SupportingLink';
import styles from './PostCard.module.css';

interface Props {
  title: string;
  slug: string;
  abstract: string;
  publishedOn: string;
  tags: string[];
}

const PostCard = ({ title, slug, abstract, publishedOn, tags }: Props) => {
  return (
    <div key={slug}>
      <h2>{title}</h2>
      <span>{publishedOn}</span>
      {tags.map((tag) => (
        <SupportingLink key={tag} href={`/blog/tags/${tag}`}>
          #{tag}
        </SupportingLink>
      ))}
      <p>{abstract}</p>
    </div>
  );
};

export default PostCard;
