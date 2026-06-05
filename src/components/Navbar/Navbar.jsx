import React, { useState, useEffect } from "react";

import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);

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

    return (
        <nav className={`${styles.navbar} ${hidden ? styles.hidden : ""}`}>
            <a className={styles.title} href="/"><span>{"|</>|"}</span></a>
            <div className={styles.menu}>
                <img className={styles.menuBtn}
                    src={menuOpen
                        ? getImageUrl("nav/closeIcon.png")
                        : getImageUrl("nav/menuIcon.png")}
                    alt="menu-button"
                    onClick={() => setMenuOpen(!menuOpen)}
                />
                <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`} onClick={() => setMenuOpen(false)}>
                    <li>
                        <a href="#about" className={styles.navLink}>About</a>
                    </li>
                    <li>
                        <a href="#technical-toolkit" className={styles.navLink}>Technical Toolkit</a>
                    </li>
                    <li>
                        <a href="#projects" className={styles.navLink}>Projects</a>
                    </li>
                    <li>
                        <a href="#contact" className={styles.contactBtn}>Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
} 