import { useEffect } from "react";
import { createPortal } from "react-dom";
import { experience } from "../../data/experience";
import { resumeProjects } from "../../data/resumeProjects";
import styles from "./ResumeModal.module.css";

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ResumeModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close resume"
        >
          <CloseIcon />
        </button>

        <header className={styles.header}>
          <p className={styles.eyebrow}>Resume</p>
          <h2 id="resume-modal-title" className={styles.title}>
            Experience
          </h2>
        </header>

        <div className={styles.list}>
          {experience.map((job) => (
            <article key={job.id} className={styles.job}>
              <div className={styles.jobTop}>
                <div>
                  <h3 className={styles.jobTitle}>
                    {job.company} — {job.role}
                  </h3>
                  <p className={styles.location}>{job.location}</p>
                </div>
                <p className={styles.dates}>{job.dates}</p>
              </div>
              <ul className={styles.bullets}>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className={styles.projects} aria-labelledby="resume-projects-title">
          <p className={styles.eyebrow}>Selected work</p>
          <h3 id="resume-projects-title" className={styles.sectionTitle}>
            Projects
          </h3>
          <div className={styles.list}>
            {resumeProjects.map((project) => (
              <article key={project.id} className={styles.job}>
                <div className={styles.jobTop}>
                  <div>
                    <h4 className={styles.jobTitle}>
                      {project.title} — {project.type}
                    </h4>
                  </div>
                  <p className={styles.dates}>{project.dates}</p>
                </div>
                <ul className={styles.bullets}>
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <a
                  className={styles.projectLink}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Chrome Web Store ↗
                </a>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>,
    document.body
  );
}
