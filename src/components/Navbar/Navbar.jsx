import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./Navbar.module.css";
import { getHomeHashLink, getImageUrl } from "../../utils";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isUxPage = location.pathname.startsWith("/ux-projects");

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const sectionHref = (section) => {
    if (isHome || (isUxPage && section === "contact")) {
      return `#${section}`;
    }
    return getHomeHashLink(section);
  };

  return (
    <nav className={`${styles.navbar} ${hidden ? styles.hidden : ""}`}>
      <Link className={styles.title} to="/">
        <span>{"|</>|"}</span>
      </Link>
      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            menuOpen
              ? getImageUrl("nav/closeIcon.png")
              : getImageUrl("nav/menuIcon.png")
          }
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <a href={sectionHref("about")} className={styles.navLink}>
              About
            </a>
          </li>
          <li>
            <a
              href={sectionHref("technical-toolkit")}
              className={styles.navLink}
            >
              Technical Toolkit
            </a>
          </li>
          <li>
            <a href={sectionHref("projects")} className={styles.navLink}>
              Projects
            </a>
          </li>
          {!location.pathname.startsWith("/ux-projects") && (
            <li>
              <Link to="/ux-projects" className={styles.navLink}>
                UX Case Studies
              </Link>
            </li>
          )}
          <li>
            <a href={sectionHref("certifications")} className={styles.navLink}>
              Certifications
            </a>
          </li>
          <li>
            <a href={sectionHref("contact")} className={styles.contactBtn}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
