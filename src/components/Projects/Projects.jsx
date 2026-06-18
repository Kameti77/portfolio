import React from "react";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";
import styles from "./projects.module.css"

export const Projects = () => {
    return (
        <section className={styles.container} id="projects">
            <h2 className={styles.title}>Projects</h2>
            <div className={styles.projectsLayout}>
                {projects.map((project, id) => (
                    <ProjectCard key={id} project={project} />
                ))}
                <p className={styles.moreWork}>
                    Curious what else I&apos;ve built?{" "}
                    <a
                        href="https://github.com/Kameti77"
                        className={styles.moreWorkLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        See more of my work on GitHub →
                    </a>
                </p>
            </div>
        </section>
    );
};