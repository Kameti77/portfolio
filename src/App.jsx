import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { UxProjectsPage } from "./pages/UxProjectsPage";
import { CaseStudyPage } from "./pages/CaseStudyPage";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ux-projects" element={<UxProjectsPage />} />
        <Route path="/ux-projects/:slug" element={<CaseStudyPage />} />
      </Routes>
    </div>
  );
}

export default App;
