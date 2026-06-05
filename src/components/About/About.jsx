import React from "react";
import { getImageUrl } from "../../utils";
import styles from "./About.module.css";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <img
          src={getImageUrl("about/aboutImageMe.png")}
          alt="Me sitting with a laptop"
          className={styles.aboutImage}
        />
        <div className={styles.aboutText}>
          <p>
            I genuinely care about people. In everyday life, that means trying to
            understand others and help where I can. In tech, I guess you&apos;d call
            that being user-centric.
          </p>
          <p>
            That mindset shapes how I build software. I want to create applications
            that aren&apos;t just functional, but genuinely useful and easy to use.
            Whether I&apos;m working on the front end or back end, I focus on the
            experience of the person on the other side of the screen.
          </p>
          <p>
            I&apos;m currently growing as a full-stack developer through hands-on
            projects and continuous learning. I also enjoy collaborating with
            others, because great ideas and great software are often built together.
          </p>
        </div>
      </div>
    </section>
  );
};
