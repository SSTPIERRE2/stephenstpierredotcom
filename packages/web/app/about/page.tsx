import StackCarousel from '@/components/StackCarousel';
import styles from './page.module.css';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import { ArrowRight } from 'react-feather';
import PrimaryLink, { PrimaryNewTabLink } from '@/components/PrimaryLink';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.mainHeading}>About</h1>
        <p>
          Thanks for visiting my digital space! I'm{' '}
          <em className={styles.emphasized}>Stephen</em>, the full stack
          JavaScript developer behind this blog. I started making websites when
          I was 16 with plain old HTML, CSS, and JavaScript.
        </p>
        <p>
          These days I primarily build web applications with TypeScript,
          React.js, Node.js, Express, and PostgreSQL, but am constantly
          experimenting with cutting-edge technologies like Next.js, Serverless,
          and GraphQL.
        </p>
        <p>
          <strong>
            You won't find any AI generated content or layout templates here.
          </strong>{' '}
          This website is built from scratch with love and inspiration drawn
          from a wide variety of sources.
        </p>
        <p>
          Continue on to view my{' '}
          <PrimaryLink href="/about/#techStack">full tech stack</PrimaryLink>{' '}
          and{' '}
          <PrimaryNewTabLink href="/Resume2024.pdf">resume</PrimaryNewTabLink>{' '}
          below!
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
          <PrimaryNewTabLink
            href="/Resume2024.pdf"
            className={styles.resumeLink}
          >
            <Button size="medium">
              View Resume{' '}
              <ArrowRight className={styles.resumeLinkArrow} size="1.5rem" />
            </Button>
          </PrimaryNewTabLink>
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
          <PrimaryNewTabLink href="https://en.wikipedia.org/wiki/MDN">
            MDN Web Docs
          </PrimaryNewTabLink>
          ,{' '}
          <PrimaryNewTabLink href="https://react.dev/">
            react.dev
          </PrimaryNewTabLink>
          , online courses and resources from{' '}
          <PrimaryNewTabLink href="https://www.freecodecamp.org/">
            Free Code Camp
          </PrimaryNewTabLink>
          ,{' '}
          <PrimaryNewTabLink href="https://zerotomastery.io/">
            Zero to Mastery
          </PrimaryNewTabLink>
          ,{' '}
          <PrimaryNewTabLink href="https://www.joshwcomeau.com/">
            Josh W Comeau
          </PrimaryNewTabLink>
          , and working on real projects with professional teams.
        </p>
        <p>
          In this industry{' '}
          <em className={styles.emphasized}>you get out what you put in</em>.
          Techniques and technologies are constantly evolving which is what
          makes it so exciting to be immersed in.
        </p>
      </div>

      <div className={`${styles.content} ${styles.bottomMargin}`}>
        <h2 className={styles.heading}>A little more</h2>
        <p>
          <strong>I live</strong> in a town called Westport, Massachusetts with
          my cat Leon, chickens, and an extra large garden.
        </p>
        <p>
          <strong>I have a few hobbies.</strong> I've built a handful of
          high-end PCs from scratch over the years and take pride in a 12 year
          old Toshiba laptop I refurbished myself.
        </p>
        <p>
          <strong>I exercise and train weights every day</strong> in the home
          gym I designed and built, as a strong body makes the mind strong.
        </p>
        <p>
          <strong>I love to cook</strong> and grow my own ingredients which is
          another exciting area of constant improvement and innovation.
        </p>
      </div>

      <div className={styles.aside}>
        <div className={styles.flourish} />
        <Avatar />
      </div>
    </main>
  );
}
