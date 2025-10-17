import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { inject } from '@vercel/analytics';
import { HelmetProvider } from 'react-helmet-async';

// components
import FloatingButtons from './components/layout/top';
import ScrollToTop from './pages/extraPages/ScrollToTop';
import TechspardhaPopup from './components/popUP/techspardha.pupup';

// pages
import Home1 from './pages/homePage';
import Contact from './pages/contactPage';
import Gallery from './pages/galleryPage';
import About from './pages/aboutPage';
import EventPage from './pages/eventPage';
import LayoutWrapper from './pages/LayoutWrapper';
import NotFoundPage from './pages/NotFoundPage';
import PdfUpload from './pages/Upload_pdf/PdfUpload';
import BuiltByPage from './pages/extraPages/builtBy';
import LaunchpadPage from '../src/pages/launchpad/launchPadPage';

// teams
import KalpaPage from './pages/teams/kalpa.page';
import ObservatoryPage from './pages/teams/observatory.page';
import NewsletterPage from './pages/teams/newsletter.page';
import DesignMediaPage from './pages/teams/media.page';
import WebTechPage from './pages/teams/tech.page';
import CoreManagementPage from './pages/teams/management.page';
import ManagementPage from './pages/teams/management.page';
import KhagolQuizzingPage from './pages/teams/khagol.page';
import DiscussionPage from './pages/teams/discussion.page';

// blogs
import BlogPage from './pages/Blog/blogPage';
import BlogDetailsPage from './pages/Blog/blogDetailsPage';
import AstroFactsPage from './pages/Blog/astroFacts';
import SpaceExplorationsPage from './pages/Blog/SpaceExplorationsPage';

// ✅ Initialize Vercel Analytics once here (outside JSX)
inject();

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <ScrollToTop />
        <FloatingButtons />
        <TechspardhaPopup />

        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Home1 />} />

          {/* Layout wrapper for inner pages */}
          <Route element={<LayoutWrapper />}>
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
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

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
