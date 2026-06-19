import { Link } from "react-router-dom";
import { getImageUrl, getFigmaHref } from "../../utils";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import styles from "./UxCaseStudyPreview.module.css";

export function UxCaseStudyPreview({ study, reverse = false }) {
  const { ref, visible } = useScrollReveal();
  const figmaHref = getFigmaHref(study.figmaUrl);

  return (
    <article
      ref={ref}
      className={`${styles.preview} ${reverse ? styles.reverse : ""} ${
        visible ? styles.visible : ""
      }`}
    >
      <div className={styles.content}>
        <p className={styles.eyebrow}>{study.projectType}</p>
        <h2 className={styles.title}>{study.title}</h2>
        <p className={styles.summary}>{study.summary}</p>

        <dl className={styles.meta}>
          <div className={styles.metaItem}>
            <dt>Role</dt>
            <dd>{study.role}</dd>
          </div>
          <div className={styles.metaItem}>
            <dt>Tools</dt>
            <dd>{study.tools.join(", ")}</dd>
          </div>
          {study.duration && (
            <div className={styles.metaItem}>
              <dt>Duration</dt>
              <dd>{study.duration}</dd>
            </div>
          )}
        </dl>

        {study.awards?.length > 0 && (
          <div className={styles.awards}>
            <p className={styles.awardsLabel}>Awards</p>
            <ul>
              {study.awards.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.actions}>
          <Link
            to={`/ux-projects/${study.slug}`}
            className={styles.primaryBtn}
          >
            View Case Study
          </Link>
          {figmaHref ? (
            <a
              href={figmaHref}
              className={styles.secondaryBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Figma Prototype
            </a>
          ) : (
            <span className={styles.placeholderBtn} title="Add Figma link in uxCaseStudies.js">
              View Figma Prototype
            </span>
          )}
        </div>
      </div>

      <div className={styles.visual}>
        <div className={styles.imageFrame}>
          <img
            src={getImageUrl(study.heroImage)}
            alt={`${study.title} case study preview`}
            className={styles.heroImage}
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}
