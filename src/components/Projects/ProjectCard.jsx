import React from "react";
import { getImageUrl, hasProjectLink } from "../../utils";
import styles from "./ProjectCard.module.css";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, source },
}) => {
  const showDemo = hasProjectLink(demo);
  const showSource = hasProjectLink(source);
  const showLinks = showDemo || showSource;

  return (
    <article className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          src={getImageUrl(imageSrc)}
          alt={`Screenshot of ${title}`}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.skills}>
        {skills.map((skill, id) => (
          <li key={id} className={styles.skill}>
            {skill}
          </li>
        ))}
      </ul>
      {showLinks && (
        <div
          className={`${styles.links} ${
            !showDemo || !showSource ? styles.linksSingle : ""
          }`}
        >
          {showDemo && (
            <a
              href={demo.trim()}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Demo
            </a>
          )}
          {showSource && (
            <a
              href={source.trim()}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>
          )}
        </div>
      )}
    </article>
  );
};
