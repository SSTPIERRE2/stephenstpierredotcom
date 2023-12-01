import StackCarousel from '@/components/StackCarousel';
import styles from './page.module.css';
import Avatar from '@/components/Avatar';
import Link from 'next/link';
import Button from '@/components/Button';
import { ArrowRight } from 'react-feather';
import Shuriken from '@/components/Shuriken';
import TableOfContents from '@/components/TableOfContents';
import { link } from '@/utils/constant';

const tableOfContents: link[] = [
  {
    slug: 'techStack',
    href: '#techStack',
    label: 'Tech Stack',
  },
  {
    slug: 'background',
    href: '#background',
    label: 'Background',
  },
  {
    slug: 'hobbies',
    href: '#hobbies',
    label: 'Hobbies',
  },
];

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.greeting}>
        <div className={styles.greetingLeft} style={{ maxWidth: '65ch' }}>
          <h1
            style={{
              padding: '1rem 0',
              paddingTop: '3rem',
            }}
          >
            About
          </h1>
          <p style={{ marginBottom: '0.5rem' }}>
            Thanks for visiting my digital space! I'm Stephen, the human behind
            the coding content you'll find here. I started making websites when
            I was 17 with plain old HTML, CSS, and JavaScript.
          </p>
          <p>
            These days I primarily build web applications with TypeScript,
            React.js, Node.js, Express, and PostgreSQL, but am constantly
            experimenting with cutting-edge technologies like Next.js,
            Serverless, and GraphQL. Continue on to view my full tech stack and
            resume below!
          </p>
        </div>
      </div>

      <div className={styles.techStackIntro}>
        <h2 style={{ paddingBottom: '1rem' }} id="#techStack">
          Tech Stack
        </h2>
        <div className={styles.techStackDescriptionGroup}>
          <p className={styles.techStackDescription}>
            Here is the full list of technologies I've built web applications
            with in the past, am currently experimenting with, or am generally
            interested in, in no particular order. Go ahead, take it for a spin!
          </p>
          <Link
            href="/Resume2023.pdf"
            target="_blank"
            rel="noopener noreferrer"
            locale={false}
            className={styles.resumeLink}
          >
            <Button size="medium">
              View Resume{' '}
              <ArrowRight className={styles.resumeLinkArrow} size="1.5rem" />
            </Button>
          </Link>
        </div>
      </div>

      <div className={`${styles.fullBleed} ${styles.carouselWrapper}`}>
        <StackCarousel />
      </div>

      <div className={styles.content}>
        <h2 className={styles.heading} id="#background">
          Background
        </h2>
        <p>
          I'll be honest I'm not a prodigy who was introduced to coding at a
          young age, really the first time I touched code was in high school by
          a stroke of luck. In my junior year of high school there happened to
          be a general multimedia class which involved basic web development
          with HTML and CSS, and editing images and videos. Programming classes
          weren't common in high schools at the time, and even when I made it to
          college to study Computer Science Java was the first language they
          taught, until soon Python took over as the more approachable
          object-oriented language for teaching beginners. Furthermore, my
          college lacked specific web development classes where my only option
          was a single elective where I got into more advanced web technologies
          including JavaScript, Bootstrap, Node.js, and Heroku.
        </p>
        <p style={{ padding: '1rem 0' }}>
          All of this is to say that getting into web development is different
          for everyone depending on your background, and for some like me the
          path was ill-defined. Most of what I've learned about web development
          has come from official documentation like{' '}
          <Link href="https://en.wikipedia.org/wiki/MDN">MDN Web Docs</Link> ,{' '}
          <Link href="https://react.dev/">react.dev</Link>, online courses and
          resources from{' '}
          <Link href="https://www.freecodecamp.org/">Free Code Camp</Link>,{' '}
          <Link href="https://zerotomastery.io/">Zero to Mastery</Link>,{' '}
          <Link href="https://www.joshwcomeau.com/">Josh W Comeau</Link>, and
          more. It's very much a "you get out what you put in" type industry
          where techniques and technologies are constantly evolving which is
          what makes it so exciting to be immersed in.
        </p>

        <h2 className={styles.heading}>A little more about me</h2>

        <h3 id="#hobbies">Hobbies</h3>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          <li
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Shuriken
              size="2rem"
              style={{
                display: 'inline-block',
                marginRight: '1rem',
                transform: 'rotate(-30deg)',
              }}
            />{' '}
            Olympic weight training
          </li>
          <li
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Shuriken
              size="2rem"
              style={{
                display: 'inline-block',
                marginRight: '1rem',
                transform: 'rotate(-35deg)',
              }}
            />{' '}
            Cooking
          </li>
          <li
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Shuriken
              size="2rem"
              style={{
                display: 'inline-block',
                marginRight: '1rem',
                transform: 'rotate(-40deg)',
              }}
            />{' '}
            Hiking
          </li>
          <li>Gaming</li>
          <li>Gardening</li>
          <li>Archery</li>
          <li>Woodworking</li>
        </ul>

        <h3 className={styles.heading}>Favorites</h3>
      </div>

      <div className={styles.aside}>
        {/* <TableOfContents links={tableOfContents} /> */}
        {/* <div className={styles.greetingRight}> */}
        <div className={styles.flourish} />
        <Avatar />
        {/* </div> */}
      </div>
    </main>
  );
}
