import React, { useState } from "react";
import { getImageUrl } from "../../utils";
import { skillCategories } from "../../data/skillCategories";
import styles from "./TechnicalToolkit.module.css";

function CategoryIcon({ type }) {
  switch (type) {
    case "frontend":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M8 7L4 12L8 17M16 7L20 12L16 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "backend":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="4" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
          <rect x="3" y="14" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="7" cy="7" r="1" fill="currentColor" />
          <circle cx="7" cy="17" r="1" fill="currentColor" />
        </svg>
      );
    case "database":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M4 6V18C4 19.66 7.58 21 12 21C16.42 21 20 19.66 20 18V6"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path d="M4 12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12" stroke="currentColor" strokeWidth="1.75" />
        </svg>
      );
    case "languages":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 8H19M5 12H14M5 16H11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M17 14L20 16L17 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "tools":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.1 2.1-3.3-3.3 2.1-2.1z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function InitialsFallback({ label }) {
  const initials = label
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <span className={styles.fallback} aria-hidden>
      {initials}
    </span>
  );
}

function SkillChip({ skill }) {
  const [failed, setFailed] = useState(false);

  return (
    <li className={styles.skillChip}>
      <span className={styles.skillIcon}>
        {!failed ? (
          <img
            src={getImageUrl(skill.imageSrc)}
            alt=""
            width={18}
            height={18}
            onError={() => setFailed(true)}
            draggable={false}
          />
        ) : (
          <InitialsFallback label={skill.label} />
        )}
      </span>
      <span className={styles.skillLabel}>{skill.label}</span>
    </li>
  );
}

function CategoryPanel({ category }) {
  return (
    <article
      className={styles.panel}
      style={{ "--category-accent": category.accent }}
    >
      <header className={styles.panelHeader}>
        <span className={styles.iconGlass} aria-hidden>
          <CategoryIcon type={category.icon} />
        </span>
        <div className={styles.panelHeading}>
          <h3 className={styles.panelTitle}>{category.shortTitle}</h3>
          <p className={styles.panelCount}>
            {category.skills.length} technologies
          </p>
        </div>
      </header>
      <ul className={styles.skillGrid} aria-label={`${category.title} skills`}>
        {category.skills.map((skill) => (
          <SkillChip key={skill.id} skill={skill} />
        ))}
      </ul>
    </article>
  );
}

export const TechnicalToolkit = () => {
  return (
    <section className={styles.section} id="technical-toolkit">
      <header className={styles.header}>
        <h2 className={styles.title}>Technical Toolkit</h2>
        <p className={styles.subtitle}>
          Core technologies I use to build full-stack applications — organized
          by domain for quick scanning.
        </p>
      </header>

      <div className={styles.grid}>
        {skillCategories.map((category) => (
          <CategoryPanel key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};
