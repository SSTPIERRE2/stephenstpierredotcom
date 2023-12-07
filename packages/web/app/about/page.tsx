import StackCarousel from '@/components/StackCarousel';
import styles from './page.module.css';
import Avatar from '@/components/Avatar';
import Link from 'next/link';
import Button from '@/components/Button';
import { ArrowRight } from 'react-feather';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.mainHeading}>About</h1>
        <p>
          Thanks for visiting my digital space! I'm Stephen, the human behind
          the coding content you'll find here. I started making websites when I
          was 17 with plain old HTML, CSS, and JavaScript.
        </p>
        <p>
          These days I primarily build web applications with TypeScript,
          React.js, Node.js, Express, and PostgreSQL, but am constantly
          experimenting with cutting-edge technologies like Next.js, Serverless,
          and GraphQL. Continue on to view my full tech stack and resume below!
        </p>
      </div>

      <div className={styles.fullBleed}>
        <h2 className={styles.heading} id="#techStack">
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
          Programming classes weren't common when I was going to high school,
          but during my junior year there happened to be a general multimedia
          class which involved HTML and CSS, and editing images and videos.
        </p>
        <p>
          Even in college, web development wasn't core to the Computer Science
          curriculum, but I did manage to take an elective where I got into more
          technologies including JavaScript, Bootstrap, Node.js, and Heroku.
        </p>
        <p>
          Returning to web development felt like reuniting with an old friend,
          and I've been hooked on the feedback loop ever since.
        </p>
        <p>
          Much of what I learned after school came from official documentation
          like{' '}
          <Link
            href="https://en.wikipedia.org/wiki/MDN"
            className={styles.simpleLink}
          >
            MDN Web Docs
          </Link>
          ,{' '}
          <Link href="https://react.dev/" className={styles.simpleLink}>
            react.dev
          </Link>
          , online courses and resources from{' '}
          <Link
            href="https://www.freecodecamp.org/"
            className={styles.simpleLink}
          >
            Free Code Camp
          </Link>
          ,{' '}
          <Link href="https://zerotomastery.io/" className={styles.simpleLink}>
            Zero to Mastery
          </Link>
          ,{' '}
          <Link
            href="https://www.joshwcomeau.com/"
            className={styles.simpleLink}
          >
            Josh W Comeau
          </Link>
          , and working on real projects with professional teams.
        </p>
        <p>
          In this industry{' '}
          <span className={styles.gradientText}>
            "you get out what you put in"
          </span>
          . Techniques and technologies are constantly evolving which is what
          makes it so exciting to be immersed in.
        </p>
      </div>

      <div className={`${styles.content} ${styles.bottomMargin}`}>
        <h2 className={styles.heading}>A little more</h2>
        <p>
          <strong>I live</strong> in a town called Westport, Massachusetts with
          my cat, chickens, and 50 square foot garden.
        </p>
        <p>
          <strong>I have a few hobbies.</strong> I've built a handful of
          high-end PCs from scratch over the years and take pride in a 12 year
          old Toshiba laptop I refurbished myself. I exercise and lift weights
          daily in the home gym I designed and built, as a strong body makes the
          mind strong. I love to cook and grow my own ingredients which is
          another exciting area of constant improvement and innovation - cast
          iron, dutch oven, wok, barbeque, casseroles, any style of pizza, you
          name it.
        </p>
        <p>
          <strong></strong>
        </p>
      </div>

      <div className={styles.aside}>
        <div className={styles.flourish} />
        <Avatar />
      </div>
    </main>
  );
}
