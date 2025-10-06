import React from "react";
import styles from "./Hero.module.css";


export const Hero = () => {
    return (
        <section className={styles.container}>
            <div className={styles.mainContent}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Hi, I'm Kameti.</h1>
                    <h1 className={styles.title2}>Developer by trade. <br />Problem-solver by nature.</h1>
                </div>
                <div className={styles.heroImg}>{"\|<\/>\|"}</div>
            </div>
            <div className={styles.content2}>
                <p className={styles.description}>In seventh grade, a friend's mention
                    of '<span>software engineering</span>' sparked a curiosity I couldn't ignore.
                    Though I didn't fully understand it then, I promised myself
                    I'd explore it one day. By sophomore year of high school,
                    I dove into the world of programming and computer science.
                    Since then, I've been captivated by the art of solving real-world
                    problems through technology. It's not just a field of study, it's
                    my passion, and it's what drives me every day.<br /><br />
                    Let's build something impactful together.</p>
                <a href="mailto:kametidanielk@gmail.com" className={styles.contactBtn}>Contact Me</a>
            </div>
            <div className={styles.topBlur} />
            <div className={styles.bottomBlur} />

        </section>
    );
}