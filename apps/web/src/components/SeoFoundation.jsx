import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { canonicalFor } from '@/lib/seo';

const siteName = 'NeuroDigital Support';
const defaultTitle = 'NeuroDigital Support | Inclusive digital support for neurodivergent adults';
const defaultDescription = 'NeuroDigital Support builds sensory-aware digital platforms and evidence-led tools for autistic and neurodivergent adults, caregivers, and teams.';
const socialImage = canonicalFor('/logo.png');

const pageNames = {
  '/': 'Home',
  '/about': 'About',
  '/blogs': 'Blog',
  '/contact': 'Contact',
  '/features': 'Features',
  '/nurotok': 'NuroTok',
  '/altitok': 'AltiTok',
  '/olitok': 'OliTok',
  '/care-logging': 'Care Logging',
  '/digital-advocacy-hub': 'Digital Advocacy Hub',
  '/research': 'Research',
  '/research-insights-hub': 'Research & Insights Hub',
  '/social-listening-dashboard': 'Social Listening Dashboard',
  '/thank-you': 'Thank You'
};

const pageMetadata = {
  '/': { title: defaultTitle, description: defaultDescription },
  '/about': {
    title: 'About NeuroDigital Support | Inclusive digital well-being',
    description: 'Learn how NeuroDigital Support designs research-driven digital products that prioritise neurodivergent wellbeing, accessibility, and inclusive support.'
  },
  '/blogs': {
    title: 'NeuroDigital Support Blog | Neurodivergent wellbeing insights',
    description: 'Read stories, research updates, and practical insights on accessible digital wellbeing for autistic and neurodivergent adults.'
  },
  '/contact': {
    title: 'Contact NeuroDigital Support | Demo, partnership, support',
    description: 'Contact NeuroDigital Support for demos, partnerships, accessibility advice, research enquiries, or support.'
  },
  '/features': {
    title: 'Features | NeuroDigital Support ecosystem',
    description: 'Explore wellbeing, social, advocacy, research, and care tools built for neurodivergent adults and teams.'
  },
  '/nurotok': {
    title: 'NuroTok | Sensory regulation app for neurodivergent adults',
    description: 'NuroTok is a calming digital companion supporting sensory regulation, emotional wellbeing, and stress reduction.'
  },
  '/altitok': {
    title: 'AltiTok | NeuroDigital Support',
    description: 'AltiTok is a social platform designed around safety, calm interaction, and meaningful connection.'
  },
  '/olitok': {
    title: 'OliTok | NeuroDigital Support',
    description: 'OliTok connects autistic and neurodivergent individuals with trained volunteers for safe, structured companionship.'
  },
  '/care-logging': {
    title: 'Care Logging | NeuroDigital Support',
    description: 'Care Logging helps care teams securely record routines, incidents, mood, sensory observations, and reports.'
  },
  '/digital-advocacy-hub': {
    title: 'Digital Advocacy Hub | NeuroDigital Support',
    description: 'Campaigns, educational resources, and practical tools supporting neurodiversity awareness and accessible societal change.'
  },
  '/research-insights-hub': {
    title: 'Research & Insights Hub | NeuroDigital Support',
    description: 'A research intelligence hub for searchable evidence, ethical data intelligence, and inclusive digital care.'
  },
  '/social-listening-dashboard': {
    title: 'Social Listening Dashboard | NeuroDigital Support',
    description: 'Monitor public conversations, identify emerging themes, and understand neurodivergent digital experiences.'
  }
};

const SeoFoundation = () => {
  const { pathname } = useLocation();
  const pageName = pageNames[pathname] || (pathname.startsWith('/blogs/') ? 'Blog article' : siteName);
  const metadata = pageMetadata[pathname] || { title: defaultTitle, description: defaultDescription };
  const canonicalUrl = canonicalFor(pathname === '/research' ? '/research-insights-hub' : pathname);
  const isPrivatePage = pathname === '/admin' || pathname === '/thank-you';
  const breadcrumbItems = pathname === '/'
    ? [{ name: 'Home', url: canonicalFor('/') }]
    : [{ name: 'Home', url: canonicalFor('/') }, { name: pageName, url: canonicalUrl }];

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${canonicalFor('/')}#organization`,
    name: siteName,
    url: canonicalFor('/'),
    logo: socialImage,
    description: defaultDescription,
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom'
    },
    knowsAbout: ['neurodiversity', 'autism', 'digital accessibility', 'inclusive technology', 'digital wellbeing', 'assistive technology']
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${canonicalFor('/')}#website`,
    name: siteName,
    url: canonicalFor('/'),
    inLanguage: 'en-GB',
    publisher: { '@id': `${canonicalFor('/')}#organization` }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <Helmet>
      <html lang="en-GB" />
      <meta name="author" content={siteName} />
      <meta name="language" content="en-GB" />
      <meta name="geo.region" content="GB" />
      <meta name="geo.placename" content="United Kingdom" />
      <meta name="theme-color" content="#0b5f49" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={pathname.startsWith('/blogs/') ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:alt" content={`${siteName} logo`} />
      <meta property="og:locale" content="en_GB" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={socialImage} />
      {isPrivatePage ? <meta name="robots" content="noindex, nofollow" /> : null}
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </Helmet>
  );
};

export default SeoFoundation;
