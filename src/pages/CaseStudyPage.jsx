import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { Contact } from "../components/Contact/Contact";
import { getCaseStudyBySlug } from "../data/uxCaseStudies";
import { getFigmaHref, getHomeHashLink, getImageUrl } from "../utils";
import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./CaseStudyPage.module.css";

function buildSections(study) {
  const sections = [
    { id: "problem", title: "Problem", content: study.problem },
    { id: "solution", title: "Solution", content: study.solution },
    {
      id: "contribution",
      title: "My Contribution",
      list: study.contribution,
    },
    {
      id: "research",
      title: "Research & User Needs",
      personas: study.personas,
    },
    {
      id: "principles",
      title: "Design Principles",
      list: study.designPrinciples,
    },
    {
      id: "key-screens",
      title: "Key Screens",
      screens: study.keyScreens,
    },
    {
      id: "challenges",
      title: "Challenges",
      list: study.challenges,
    },
  ];

  if (study.development) {
    sections.push({
      id: "development",
      title: "Development",
      content: study.development,
    });
  }

  if (study.results) {
    sections.push({
      id: "results",
      title: "Results",
      content: study.results,
    });
  }

  sections.push({
    id: "reflection",
    title: "Reflection",
    content: study.reflection,
  });

  return sections;
}

function CaseStudySection({ section }) {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      ref={ref}
      id={section.id}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
    >
      <h2 className={styles.sectionTitle}>{section.title}</h2>

      {section.content && <p className={styles.bodyText}>{section.content}</p>}

      {section.list && (
        <ul className={styles.list}>
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      {section.personas && (
        <div className={styles.personaGrid}>
          {section.personas.map((persona) => (
            <article key={persona.name} className={styles.personaCard}>
              <h3>{persona.name}</h3>
              <ul>
                {persona.needs.map((need) => (
                  <li key={need}>{need}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}

      {section.screens && (
        <div className={styles.screenGrid}>
          {section.screens.map((screen) => (
            <article key={screen.name} className={styles.screenCard}>
              <h3>{screen.name}</h3>
              <dl>
                <div>
                  <dt>Goal</dt>
                  <dd>{screen.goal}</dd>
                </div>
                <div>
                  <dt>UX Decisions</dt>
                  <dd>{screen.uxDecisions}</dd>
                </div>
                <div>
                  <dt>User Benefits</dt>
                  <dd>{screen.userBenefits}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export function CaseStudyPage() {
  const { slug } = useParams();
  const study = getCaseStudyBySlug(slug);
  const [activeSection, setActiveSection] = useState("problem");
  const { ref: heroRef, visible: heroVisible } = useScrollReveal();

  const sections = useMemo(
    () => (study ? buildSections(study) : []),
    [study]
  );

  useEffect(() => {
    if (!study) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5],
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [study, sections]);

  if (!study) {
    return <Navigate to="/ux-projects" replace />;
  }

  const figmaHref = getFigmaHref(study.figmaUrl);

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <header
          ref={heroRef}
          className={`${styles.hero} ${heroVisible ? styles.visible : ""}`}
        >
          <div className={styles.heroNav}>
            <Link to="/ux-projects" className={styles.backLink}>
              ← All Case Studies
            </Link>
            <a href={getHomeHashLink("projects")} className={styles.backLink}>
              Projects
            </a>
          </div>

          <p className={styles.eyebrow}>{study.projectType}</p>
          <h1 className={styles.title}>{study.title}</h1>
          <p className={styles.subtitle}>{study.subtitle}</p>

          <dl className={styles.metaGrid}>
            <div>
              <dt>Role</dt>
              <dd>{study.role}</dd>
            </div>
            {study.duration && (
              <div>
                <dt>Duration</dt>
                <dd>{study.duration}</dd>
              </div>
            )}
            <div>
              <dt>Tools</dt>
              <dd>{study.tools.join(", ")}</dd>
            </div>
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

          <div className={styles.heroActions}>
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

          <div className={styles.heroImageWrap}>
            <img
              src={getImageUrl(study.heroImage)}
              alt={`${study.title} hero mockup`}
              className={styles.heroImage}
            />
          </div>
        </header>

        <div className={styles.contentLayout}>
          <aside className={styles.toc}>
            <p className={styles.tocLabel}>On this page</p>
            <nav aria-label="Case study sections">
              <ul>
                {sections.map(({ id, title }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={
                        activeSection === id ? styles.tocLinkActive : styles.tocLink
                      }
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className={styles.sections}>
            {sections.map((section) => (
              <CaseStudySection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </main>
      <Contact />
    </div>
  );
}
