import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { certifications } from "../../data/certifications";
import { getImageUrl } from "../../utils";
import styles from "./Certifications.module.css";

const TOTAL = certifications.length;
const TRANSITION_MS = 420;

function mod(n, m) {
  return ((n % m) + m) % m;
}

function ChevronIcon({ direction }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={direction === "left" ? styles.chevronLeft : styles.chevronRight}
    >
      <path
        d={direction === "left" ? "M15 6L9 12L15 18" : "M9 6L15 12L9 18"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 3H5C3.895 3 3 3.895 3 5V8M21 8V5C21 3.895 20.105 3 19 3H16M16 21H19C20.105 21 21 20.105 21 19V16M8 21H5C3.895 21 3 20.105 3 19V16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 10L20 4M20 4H15M20 4V9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CertificationCard({ cert, offset, isActive, onSelect, onView }) {
  const positionClass =
    offset === 0
      ? styles.cardActive
      : offset === -1
        ? styles.cardPrev
        : offset === 1
          ? styles.cardNext
          : styles.cardHidden;

  return (
    <article
      className={`${styles.card} ${positionClass}`}
      aria-hidden={Math.abs(offset) > 1}
    >
      <div
        className={styles.cardButton}
        data-card=""
        role="button"
        tabIndex={isActive ? 0 : -1}
        onClick={() => {
          if (isActive) {
            onView(cert);
          } else {
            onSelect(cert.id);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (isActive) {
              onView(cert);
            } else {
              onSelect(cert.id);
            }
          }
        }}
        aria-label={
          isActive
            ? `View ${cert.title} certificate in fullscreen`
            : `Show ${cert.title} certificate`
        }
      >
        <div className={styles.imageFrame}>
          <img
            src={getImageUrl(cert.imageSrc)}
            alt={`${cert.title} from ${cert.organization}`}
            className={styles.cardImage}
            loading="lazy"
            draggable={false}
          />
          {isActive && (
            <button
              type="button"
              className={styles.expandIcon}
              data-expand-btn=""
              aria-label={`Open ${cert.title} certificate in fullscreen`}
              onClick={(event) => {
                event.stopPropagation();
                onView(cert);
              }}
            >
              <ExpandIcon />
            </button>
          )}
        </div>
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{cert.title}</h3>
          <p className={styles.cardOrg}>{cert.organization}</p>
        </div>
      </div>
    </article>
  );
}

function CertificateModal({
  activeIndex,
  onClose,
  onPrev,
  onNext,
  prefersReducedMotion,
}) {
  const cert = certifications[activeIndex];
  const backdropRef = useRef(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        onPrev();
      } else if (event.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  const handleBackdropClick = (event) => {
    if (event.target === backdropRef.current) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={styles.modalBackdrop}
      ref={backdropRef}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
      >
        <button
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close certificate preview"
        >
          <CloseIcon />
        </button>

        <button
          type="button"
          className={`${styles.modalNav} ${styles.modalNavPrev}`}
          onClick={onPrev}
          aria-label="Previous certificate"
        >
          <ChevronIcon direction="left" />
        </button>

        <button
          type="button"
          className={`${styles.modalNav} ${styles.modalNavNext}`}
          onClick={onNext}
          aria-label="Next certificate"
        >
          <ChevronIcon direction="right" />
        </button>

        <div
          className={`${styles.modalContent} ${
            prefersReducedMotion ? styles.noMotion : ""
          }`}
        >
          <img
            src={getImageUrl(cert.imageSrc)}
            alt={`${cert.title} certificate from ${cert.organization}`}
            className={styles.modalImage}
          />
          <div className={styles.modalMeta}>
            <h3 id="cert-modal-title" className={styles.modalTitle}>
              {cert.title}
            </h3>
            <p className={styles.modalOrg}>{cert.organization}</p>
          </div>
        </div>

        <p className={styles.modalCounter} aria-live="polite">
          {activeIndex + 1} of {TOTAL}
        </p>
      </div>
    </div>,
    document.body
  );
}

export const Certifications = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(0);
  const dragDelta = useRef(0);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  const goTo = useCallback((index) => {
    setActiveIndex(mod(index, TOTAL));
  }, []);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const selectById = useCallback(
    (id) => {
      const index = certifications.findIndex((c) => c.id === id);
      if (index >= 0) {
        goTo(index);
      }
    },
    [goTo]
  );

  const openModal = useCallback((cert) => {
    const index = certifications.findIndex((c) => c.id === cert.id);
    if (index >= 0) {
      setActiveIndex(index);
    }
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleKeyDown = (event) => {
      if (modalOpen) return;
      if (!section.contains(document.activeElement) && document.activeElement !== document.body) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, goPrev, goNext]);

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (event.target.closest("[data-expand-btn]")) return;
    if (event.target.closest("[data-card]")) return;
    setIsDragging(true);
    dragStartX.current = event.clientX;
    dragDelta.current = 0;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;
    dragDelta.current = event.clientX - dragStartX.current;
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 60;
    if (dragDelta.current > threshold) {
      goPrev();
    } else if (dragDelta.current < -threshold) {
      goNext();
    }
    dragDelta.current = 0;
  };

  const getOffset = (index) => {
    let diff = index - activeIndex;
    if (diff > TOTAL / 2) diff -= TOTAL;
    if (diff < -TOTAL / 2) diff += TOTAL;
    return diff;
  };

  return (
    <section
      className={styles.section}
      id="certifications"
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Certifications showcase"
      tabIndex={0}
    >
      <header className={styles.header}>
        <h2 className={styles.title}>Certifications</h2>
        <p className={styles.subtitle}>
          Credentials and achievements that reflect my commitment to continuous
          learning, technical growth, and professional excellence.
        </p>
      </header>

      <div className={styles.showcase}>
        <button
          type="button"
          className={`${styles.navBtn} ${styles.navPrev}`}
          onClick={goPrev}
          aria-label="Previous certification"
        >
          <ChevronIcon direction="left" />
        </button>

        <div
          className={styles.viewport}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            ref={trackRef}
            className={`${styles.track} ${
              isDragging ? styles.trackDragging : ""
            } ${prefersReducedMotion ? styles.noMotion : ""}`}
            style={{
              "--transition-ms": prefersReducedMotion ? "0ms" : `${TRANSITION_MS}ms`,
            }}
          >
            {certifications.map((cert, index) => (
              <CertificationCard
                key={cert.id}
                cert={cert}
                offset={getOffset(index)}
                isActive={index === activeIndex}
                onSelect={selectById}
                onView={openModal}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`${styles.navBtn} ${styles.navNext}`}
          onClick={goNext}
          aria-label="Next certification"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Certification slides">
        {certifications.map((cert, index) => (
          <button
            key={cert.id}
            type="button"
            role="tab"
            className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
            aria-selected={index === activeIndex}
            aria-label={`Go to ${cert.title}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>

      {modalOpen && (
        <CertificateModal
          activeIndex={activeIndex}
          onClose={closeModal}
          onPrev={goPrev}
          onNext={goNext}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}
    </section>
  );
};
