import { Link } from "react-router-dom";
import styles from "./UxCaseStudiesCTA.module.css";

export function UxCaseStudiesCTA() {
  return (
    <Link to="/ux-projects" className={styles.cta}>
      <span className={styles.ctaLabel}>View UX/UI Case Studies</span>
      <span className={styles.ctaHint}>
        Explore immersive design work for AetherView, MamaBloom & WilderCards
      </span>
      <span className={styles.ctaArrow} aria-hidden>
        →
      </span>
    </Link>
  );
}
