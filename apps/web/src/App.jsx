import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext.jsx';
import ScrollToTop from './components/ScrollToTop';
import AboutPage from './pages/AboutPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import AltiTokPage from './pages/AltiTokPage.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import CareLoggingPage from './pages/CareLoggingPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import DigitalAdvocacyHubPage from './pages/DigitalAdvocacyHubPage.jsx';
import FeaturesPage from './pages/FeaturesPage.jsx';
import HomePage from './pages/HomePage.jsx';
import NuroTokPage from './pages/NuroTokPage.jsx';
import OliTokPage from './pages/OliTokPage.jsx';
import ResearchInsightsHubPage from './pages/ResearchInsightsHubPage.jsx';
import SocialListeningDashboardPage from './pages/SocialListeningDashboardPage.jsx';
import ThankYouPage from './pages/ThankYouPage.jsx';
import SeoFoundation from './components/SeoFoundation.jsx';

function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <SeoFoundation />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/nurotok" element={<NuroTokPage />} />
          <Route path="/altitok" element={<AltiTokPage />} />
          <Route path="/olitok" element={<OliTokPage />} />
          <Route path="/care-logging" element={<CareLoggingPage />} />
          <Route path="/digital-advocacy-hub" element={<DigitalAdvocacyHubPage />} />
          <Route path="/research" element={<ResearchInsightsHubPage />} />
          <Route path="/research-insights-hub" element={<ResearchInsightsHubPage />} />
          <Route path="/social-listening-dashboard" element={<SocialListeningDashboardPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AccessibilityProvider>
  );
}

export default App;
