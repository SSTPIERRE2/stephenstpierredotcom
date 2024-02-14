import range from '@/utils/range';
import TextWithBorder from '../TextWithBorder';
import styles from './PostGallery.module.css';
import Link from 'next/link';

const PostGallery = () => {
  return (
    <div className={styles.container}>
      <TextWithBorder as={Link} href="/blog" className={styles.link}>
        Blog Posts
      </TextWithBorder>
      <div className={styles.gallery}>
        {range(10).map((num) => (
          <div className={styles.card} key={num}>
            <article>
              <h3>Blog Post #{num}</h3>
              <h4>Optional sub heading</h4>
              <p>
                Back in the day, centering an element was one of the trickiest
                things in CSS. As the language has evolved, we’ve been given
                lots of new tools we can use… But how do we pick the best
                option? When do we use Flexbox, or CSS Grid, or something else?
                Let's dig into it.
              </p>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostGallery;
