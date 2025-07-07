import React from "react";
import { getImageUrl } from "../../utils";
import styles from "./Hero.module.css";


export const Hero = () => {
    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Hi, I'm Kameti</h1>
                <p className={styles.description}>I'm a web developer and computer science student who enjoys building
                    clean, user-friendly web experiences and solving problems through code.
                    Always learning and improving. Open to opportunities, collaborations,
                    or a good tech chat — let’s connect!</p>
                <a href="mailto:kametidanielk@gmail.com" className={styles.contactBtn}>Contact Me</a>
            </div>
            <div className={styles.heroImg}>{"\|<\/>\|"}</div>
            <div className={styles.topBlur} />
            <div className={styles.bottomBlur} />

        </section>
    );
}