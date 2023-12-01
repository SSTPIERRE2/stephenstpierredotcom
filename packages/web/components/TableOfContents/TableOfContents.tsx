import { link } from '@/utils/constant';
import styles from './TableOfContents.module.css';
import Link from 'next/link';

interface Props {
  links: link[];
}

const TableOfContents = ({ links }: Props) => {
  return (
    <aside className={styles.aside}>
      <nav>
        <h2>TABLE OF CONTENTS</h2>
        {links.map(({ href, slug, label }) => (
          <Link key={slug} href={href}>
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default TableOfContents;
