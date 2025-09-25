import React from "react";
import { getImageUrl } from "../../utils";
import styles from "./About.module.css";

export const About = () => {
    return <section className={styles.container} id='about'>
        <h2  className={styles.title}>About</h2>
        <div  className={styles.content}><img
            src={getImageUrl("about/aboutImageMe.png")}
            alt="Me sitting with a laptop" 
             className={styles.aboutImage}/>
            <ul  className={styles.aboutItems}>
                <li  className={styles.aboutItem}>
                    <img src={getImageUrl("about/uiIcon.png")} alt="Bulb icon" />
                    <div className={styles.aboutItemText}>
                        <h2>What drives me:</h2>
                        <p>Building full-stack apps that solve real problems and delight users.</p>
                    </div>
                </li>
                <li className={styles.aboutItem}>
                    <img src={getImageUrl("about/serverIcon.png")} alt="Server icon" />
                    <div  className={styles.aboutItemText}>
                        <h2>How I work:</h2>
                        <p>Clean, user-focused code; strong design, performance, teamwork + solo hustle.</p>
                    </div >
                </li>
                <li className={styles.aboutItem}>
                    <img src={getImageUrl("about/cursorIcon.png")} alt="UI Icon" />
                    <div  className={styles.aboutItemText}>
                        <h2>Goals:</h2>
                        <p>Do meaningful work, level up full-stack skills, stay impactful.</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>;
};
