import StackCarousel from '@/components/StackCarousel';
import styles from './page.module.css';
import Avatar from '@/components/Avatar';
import Link from 'next/link';
import Button from '@/components/Button';
import { ArrowRight } from 'react-feather';
import Shuriken from '@/components/Shuriken';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.greetingLeft}>
        <h2 className={styles.heading}>Hey there! 👋</h2>
        <p>
          Thanks for visiting my digital space! I'm Stephen, the human behind
          the coding content you'll find here. I'm 30 years old and started
          making websites when I was 17, starting with plain old HTML, CSS, and
          JavaScript. These days I primarily build web applications with
          TypeScript, React.js, Node.js, Express, and PostgreSQL, but am
          constantly experimenting with cutting-edge technologies like Next.js,
          Serverless, and GraphQL. Continue on to view my full tech stack and
          resume below!
        </p>
      </div>

      <div className={styles.greetingRight}>
        <div className={styles.flourish} />
        <Avatar />
      </div>

      <div className={styles.techStackIntro}>
        <div>
          <h2 className={styles.heading}>Tech Stack</h2>
          <p>
            Here is the full list of technologies I've built web applications
            with in the past, am currently experimenting with, or am generally
            interested in, in no particular order. By the way, you can scroll or
            drag this list to navigate, take it for a spin!
          </p>
        </div>

        <Link
          href="/Resume2023.pdf"
          target="_blank"
          rel="noopener noreferrer"
          locale={false}
          className={styles.resumeLink}
        >
          <Button size="medium">
            View my Resume{' '}
            <ArrowRight className={styles.resumeLinkArrow} size="1.5rem" />
          </Button>
        </Link>
      </div>

      <div className={`${styles.fullBleed} ${styles.carouselWrapper}`}>
        <StackCarousel />
      </div>

      <div>
        <h2 className={styles.heading}>Background</h2>
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
        <p className={styles.heading}>
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
      </div>

      <h2 className={styles.heading}>A little more about me</h2>

      <div>
        <h3>Hobbies</h3>
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
      </div>

      <h3 className={styles.heading}>Favorites</h3>
    </main>
  );
}
