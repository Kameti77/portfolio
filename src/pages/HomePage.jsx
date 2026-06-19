import { Navbar } from "../components/Navbar/Navbar";
import { Hero } from "../components/Hero/Hero";
import { About } from "../components/About/About";
import { TechnicalToolkit } from "../components/TechnicalToolkit/TechnicalToolkit";
import { Projects } from "../components/Projects/Projects";
import { Certifications } from "../components/Certifications/Certifications";
import { Contact } from "../components/Contact/Contact";
import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <Hero />
      <About />
      <TechnicalToolkit />
      <Projects />
      <Certifications />
      <Contact />
    </div>
  );
}
