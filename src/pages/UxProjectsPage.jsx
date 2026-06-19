import { Navbar } from "../components/Navbar/Navbar";
import { Contact } from "../components/Contact/Contact";
import { UxCaseStudyPreview } from "../components/Ux/UxCaseStudyPreview";
import { uxCaseStudies } from "../data/uxCaseStudies";
import { getHomeHashLink } from "../utils";
import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./UxProjectsPage.module.css";

export function UxProjectsPage() {
  const { ref: heroRef, visible: heroVisible } = useScrollReveal();

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <header
          ref={heroRef}
          className={`${styles.hero} ${heroVisible ? styles.visible : ""}`}
        >
          <a href={getHomeHashLink("projects")} className={styles.backLink}>
            ← Back to Projects
          </a>
          <p className={styles.eyebrow}>UX / UI Design</p>
          <h1 className={styles.title}>Case Studies</h1>
          <p className={styles.intro}>
            Immersive product design work spanning sports technology, health
            tech, and gamified education — from research through high-fidelity
            prototypes.
          </p>
        </header>

        <div className={styles.studies}>
          {uxCaseStudies.map((study, index) => (
            <UxCaseStudyPreview
              key={study.slug}
              study={study}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </main>
      <Contact />
    </div>
  );
}
