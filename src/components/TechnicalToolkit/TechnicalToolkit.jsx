import React, { useCallback, useEffect, useRef, useState } from "react";
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

function SkillRow({ skill }) {
  const [failed, setFailed] = useState(false);

  return (
    <li className={styles.skillRow}>
      <span className={styles.skillIcon}>
        {!failed ? (
          <img
            src={getImageUrl(skill.imageSrc)}
            alt=""
            width={20}
            height={20}
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

function CategoryDropdown({ category }) {
  return (
    <div
      className={styles.dropdown}
      role="region"
      aria-label={`${category.title} technologies`}
    >
      <span className={styles.dropdownCaret} aria-hidden />
      <ul className={styles.skillList}>
        {category.skills.map((skill) => (
          <SkillRow key={skill.id} skill={skill} />
        ))}
      </ul>
    </div>
  );
}

function CategoryCard({
  category,
  isActive,
  canHover,
  onActivate,
  onDeactivate,
  onToggle,
}) {
  const skillCount = category.skills.length;

  const handleActivate = () => onActivate(category.id);

  return (
    <div
      className={styles.categoryWrapper}
      onMouseEnter={canHover ? handleActivate : undefined}
    >
      <button
        type="button"
        className={`${styles.categoryCard} ${isActive ? styles.categoryCardActive : ""}`}
        aria-expanded={isActive}
        aria-controls={`skills-panel-${category.id}`}
        onClick={() => {
          if (!canHover) {
            onToggle(category.id);
          }
        }}
        onFocus={handleActivate}
        onBlur={(e) => {
          if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
            onDeactivate();
          }
        }}
      >
        <span className={styles.categoryIcon} aria-hidden>
          <CategoryIcon type={category.icon} />
        </span>
        <span className={styles.categoryTitle}>{category.shortTitle}</span>
        <span className={styles.categoryCount}>
          {skillCount} skill{skillCount !== 1 ? "s" : ""}
        </span>
      </button>

      {isActive && (
        <div id={`skills-panel-${category.id}`}>
          <CategoryDropdown category={category} />
        </div>
      )}
    </div>
  );
}

const hoverMediaQuery = "(hover: hover) and (pointer: fine)";

export const TechnicalToolkit = () => {
  const [activeId, setActiveId] = useState(null);
  const [canHover, setCanHover] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(hoverMediaQuery).matches
  );
  const toolkitRef = useRef(null);

  const activate = useCallback((id) => {
    setActiveId(id);
  }, []);

  const deactivate = useCallback(() => {
    setActiveId(null);
  }, []);

  const toggle = useCallback((id) => {
    setActiveId((current) => (current === id ? null : id));
  }, []);

  useEffect(() => {
    const media = window.matchMedia(hoverMediaQuery);
    const onChange = (event) => setCanHover(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!toolkitRef.current?.contains(event.target)) {
        setActiveId(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <section className={styles.section} id="technical-toolkit">
      <header className={styles.header}>
        <h2 className={styles.title}>Technical Toolkit</h2>
        <p className={styles.subtitle}>
          Core technologies I use to build full-stack applications — organized
          by domain for quick scanning.
        </p>
      </header>

      <div
        ref={toolkitRef}
        className={styles.toolkit}
        onMouseLeave={canHover ? deactivate : undefined}
      >
        <div className={styles.categoryRow} role="list" aria-label="Skill categories">
          {skillCategories.map((category) => (
            <div key={category.id} role="listitem">
              <CategoryCard
                category={category}
                isActive={activeId === category.id}
                canHover={canHover}
                onActivate={activate}
                onDeactivate={deactivate}
                onToggle={toggle}
              />
            </div>
          ))}
        </div>

        <p className={styles.hint}>
          {canHover
            ? "Hover over a category to see details"
            : "Tap a category to see details · tap again to close"}
        </p>
      </div>
    </section>
  );
};
