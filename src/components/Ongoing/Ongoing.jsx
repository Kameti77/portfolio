import React from "react";
import { getImageUrl } from "../../utils";
import styles from "./Ongoing.module.css";

export default function Ongoing() {
    return (<div className={styles.wrapper}>
            <h2 className={styles.title}>Ongoing Projects</h2>
            {/* Project 1 */}
            <div className={styles.card}>
                <div className={styles.imageWrapper}>
                    <img className={styles.image} src={getImageUrl("Ongoing/SHM.png")} alt="SHM" />
                    {/* <div
                        className={styles.image}
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4ExkfcD8hkTXhBeXW8bxgz4H6rYKOOtitOkaCxg3kR_M4jHopHULo3ONtBjbFyXBfSOFYpJkJZ7jsjY-9oKx_088OKSoPYylSfstuqxNXac-cCBvfS-xe8mXQ0dniLVVqtzTWOcaXpFlXQALvEH8pjLOpchuskhCUtSeWVPFjQQMPvpVR6Ojl_4VOVRsW59xvS8-Lo4q1jB2wnBdjN3oE49Ol_0p6SwGn6oYudDw-aY_RPPYfJyjXkVVBRoAqBGSxs9K6a6Pw0VE")',
                        }}
                    ></div> */}
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title2}>Selamna Hiwet Ministries</h3>
                    <p className={styles.description}>
                        Selamna Hiwet Ministries’ website is a purpose-driven platform 
                        built to share vision, foster community, and enable meaningful 
                        support. It features intuitive menu navigation, multilingual 
                        content (English, Tigrinya), clearly laid-out information 
                        about ministries, programs, and humanitarian outreach, 
                        leadership bios and history to build trust—and prominent 
                        buttons or links that invite visitors to donate, volunteer, or partner.
                    </p>
                    <a href="https://www.selamnahiwetministries.com/" className={styles.button}>
                        View Project
                    </a>
                </div>
            </div>

            {/* Project 2 */}
            <div className={styles.card}>
                <div className={`${styles.imageWrapper} ${styles.orderMd2}`}>
                    <img className={styles.image} src={getImageUrl("Ongoing/WilderCards.png")} alt="SHM" />

                    {/* <div
                        className={styles.image}
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCNtgvKKaCvrv_IZRR5yJ6cIcN2-uLxW9p-1ah1c5x4Muc5gxpHItLf5njhCGhropfQ8X0uW371tynVQSrPsSaHmHLnzHwJU3Ons8rUIQemTFyD_IJbfHuFn4_cngHCYInzVbGqohp2A9019brwtqBsI3EwKvyG33SGOiSo5_l-E92j_PRF51fHIOosV5xTLJIx2nO33jg5s6uHeAOeKI-lajJ1dKixp8VR8pZHtTMzQ_m0nSZTOpHTXuehhgE5fxfR-CXXdr75EIs")',
                        }}
                    ></div> */}
                </div>
                <div className={`${styles.content} ${styles.orderMd1}`}>
                    <h3 className={styles.title2}>
                        WilderCards
                    </h3>
                    <p className={styles.description}>
                        WilderCards is an AI-powered learning mobile app designed to bridge 
                        the gap between the digital world and nature. Users can take photos 
                        of species, and the app identifies them, provides detailed information, 
                        and offers a gamified, interactive learning experience—making exploration 
                        of biodiversity fun, intuitive, and educational.
                    </p>
                    <div className={styles.tags}>
                        <span className={styles.tag}>Java</span>
                        <span className={styles.tag}>Python</span>
                        <span className={styles.tag}>Firebase</span>
                        <span className={styles.tag}>TensorFlow</span>
                    </div>
                    <a href="https://github.com/Cos229-239/2025_09_Team1" className={styles.button}>
                        View Project
                    </a>
                </div>
            </div>
        </div>
    );
}
