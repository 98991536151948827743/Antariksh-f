import { BrowserRouter, Routes, Route } from "react-router-dom";
import { inject } from "@vercel/analytics";

import { lazy, Suspense } from "react";
import AntarikshLoader from "./components/layout/lazy.loader";

// Components
import FloatingButtons from "./components/layout/top";
import ScrollToTop from "./pages/extraPages/ScrollToTop";
import TechspardhaPopup from "./components/popUP/techspardha.pupup";

// Pages
import Home1 from "./pages/homePage";
import Contact from "./pages/contactPage";
import EventPage from "./pages/eventPage";
import About from "./pages/aboutPage";
import LayoutWrapper from "./pages/LayoutWrapper";
import NotFoundPage from "./pages/NotFoundPage";
import PdfUpload from "./pages/Upload_pdf/PdfUpload";
import BuiltByPage from "./pages/extraPages/builtBy";

// Teams
import KalpaPage from "./pages/teams/kalpa.page";
import ObservatoryPage from "./pages/teams/observatory.page";
import NewsletterPage from "./pages/teams/newsletter.page";
import DesignMediaPage from "./pages/teams/media.page";
import WebTechPage from "./pages/teams/tech.page";
import CoreManagementPage from "./pages/teams/management.page";
import ManagementPage from "./pages/teams/management.page";
import KhagolQuizzingPage from "./pages/teams/khagol.page";
import DiscussionPage from "./pages/teams/discussion.page";

// Lazy-loaded pages
const Gallery = lazy(() => import("./pages/galleryPage"));
const LaunchpadPage = lazy(() => import("./pages/launchpad/launchPadPage"));
const BlogPage = lazy(() => import("./pages/Blog/blogPage"));
const BlogDetailsPage = lazy(() => import("./pages/Blog/blogDetailsPage"));
const AstroFactsPage = lazy(() => import("./pages/Blog/astroFacts"));
const SpaceExplorationsPage = lazy(() => import("./pages/Blog/SpaceExplorationsPage"));

// ✅ Initialize Vercel Analytics
inject();



function App() {
  return (
    <BrowserRouter>
        <ScrollToTop />
        <FloatingButtons />
        <TechspardhaPopup />


          <Routes>
            {/* Homepage */}
            <Route path="/" element={<Home1 />} />

            {/* Layout Wrapper for Inner Pages */}
            <Route element={<LayoutWrapper />}>
              {/* Core Pages */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={
    <Suspense fallback={<AntarikshLoader />}>
      <Gallery />
    </Suspense>
} />

              <Route path="/events" element={<EventPage />} />

              {/* Teams */}
              <Route path="/teams/observatory" element={<ObservatoryPage />} />
              <Route path="/teams/kalpa" element={<KalpaPage />} />
              <Route path="/teams/newsletter" element={<NewsletterPage />} />
              <Route path="/teams/design-media" element={<DesignMediaPage />} />
              <Route path="/teams/web-tech" element={<WebTechPage />} />
              <Route path="/teams/core-management" element={<CoreManagementPage />} />
              <Route path="/teams/management" element={<ManagementPage />} />
              <Route path="/teams/khagol" element={<KhagolQuizzingPage />} />
              <Route path="/teams/discussion" element={<DiscussionPage />} />

              {/* Blogs */}
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetailsPage />} />
              <Route path="/blog/facts" element={<AstroFactsPage />} />
              <Route path="/blog/space" element={<SpaceExplorationsPage />} />

              {/* Other */}
              <Route path="/upload-pdf" element={<PdfUpload />} />
              <Route path="/built-by" element={<BuiltByPage />} />
              <Route path="/launchpad" element={<LaunchpadPage />} />

              {/* 404 Page */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>

    </BrowserRouter>
  );
}

export default App;
