import React from "react";
import { getImageUrl } from "../../utils";
import styles from "./Contact.module.css";

export const Contact = () =>{
    return(<footer id="contact" className={styles.container}>
        <div  className={styles.text}>
            <h2>Get in Touch</h2>
            <p>
              Interested in working together, discussing opportunities, or learning
              more about my work? I&apos;d love to connect.
            </p>
        </div>
        <ul  className={styles.links}>
            <li  className={styles.link}>
                <img src={getImageUrl("contact/emailIcon.png")} alt="Email icon" />
                <a href="mailto:kametidanielk@gmail.com">kametidanielk@gmail.com</a>
            </li>
            <li className={styles.link}>
                <img src={getImageUrl("contact/linkedinIcon.png")} alt="LinkedIn icon" />
                <a href="https://www.linkedin.com/in/kameti-kumbi/">Kameti Kumbi</a>
            </li>
            <li className={styles.link}>
                <img src={getImageUrl("contact/githubIcon.png")} alt="GitHub icon" />
                <a href="https://github.com/Kameti77">github.com/Kameti77</a>
            </li>
        </ul>
    </footer>);
};