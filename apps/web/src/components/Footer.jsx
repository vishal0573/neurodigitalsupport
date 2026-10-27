import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Instagram, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { submitNewsletterSignup } from '@/api/api.js';
const logoSrc = '/logo-footer.jpeg';

const navigationLinks = [
  { name: 'About', path: '/about' },
  { name: 'Features', path: '/features' },
  { name: 'Ecosystem', path: '/modules' },
  { name: 'Research', path: '/research' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact', path: '/contact' }
];

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' }
];

const Footer = () => {
  const navigate = useNavigate();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsSubmitting(true);

    try {
      await submitNewsletterSignup(newsletterEmail);
      setNewsletterEmail('');
      navigate('/thank-you', { state: { message: 'Thanks for subscribing to our newsletter.' } });
    } catch (error) {
      toast.error(error.message || 'We could not subscribe you right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full border-t border-emerald-100 bg-[#fbfdfc] dark:border-border dark:bg-background" data-focus-distraction>
      <div className="mx-auto w-full max-w-[1240px] px-4 pb-6 pt-10 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-14 lg:gap-16">
          <div>
            <Link
              to="/"
              className="relative flex h-16 w-auto items-center overflow-hidden rounded-md focus-visible-ring"
              aria-label="NeuroDigital Support home"
            >
              <img
                src={logoSrc}
                alt="NeuroDigital Support"
                className="h-full w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600 dark:text-muted-foreground">
              Creating sensory-aware digital spaces that support neurodivergent wellbeing and reduce overwhelm.
            </p>
          </div>

          <div className="min-w-0 md:pl-3 lg:pl-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-foreground">Navigation</span>
            <nav className="mt-5 space-y-3" aria-label="Footer navigation">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block rounded text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring dark:text-muted-foreground dark:hover:text-foreground"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="min-w-0">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-foreground">Contact</span>
            <div className="mt-5 space-y-4">
              <a href="mailto:info@neurodigitalsupport.com" className="flex items-center gap-3 rounded text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring dark:text-muted-foreground dark:hover:text-foreground">
                <span className="flex h-5 w-5 items-center justify-center">
                  <Mail className="h-[18px] w-[18px] text-[#5aa88f]" aria-hidden="true" />
                </span>
                <span>info@neurodigitalsupport.com</span>
              </a>
              <a href="tel:+447825354088" className="flex items-center gap-3 rounded text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring dark:text-muted-foreground dark:hover:text-foreground">
                <span className="flex h-5 w-5 items-center justify-center">
                  <Phone className="h-[18px] w-[18px] text-[#5aa88f]" aria-hidden="true" />
                </span>
                <span>+447825354088</span>
              </a>
              <div className="inline-flex items-center gap-3 pt-1">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-100 bg-white text-slate-600 shadow-sm transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring dark:border-border dark:bg-card dark:text-muted-foreground dark:hover:text-foreground"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-foreground">Newsletter</span>
            <p className="mt-5 text-sm font-medium leading-relaxed text-slate-600 dark:text-muted-foreground">
              Stay updated on neuroinclusive technology and research.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mt-4 flex w-full flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
              <Input
                type="email"
                placeholder="Your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="h-11 flex-1 border-emerald-100 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-[#5aa88f] dark:border-border dark:bg-card dark:text-foreground dark:placeholder:text-muted-foreground"
                aria-label="Email address for newsletter"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full shrink-0 rounded-lg bg-[#5aa88f] px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#4a957e] active:scale-[0.98] sm:w-auto"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 py-4 dark:border-border">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm font-semibold text-slate-600 dark:text-muted-foreground">
              &copy; 2026 NeuroDigital Support. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-600 dark:text-muted-foreground">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
                className="rounded transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring dark:hover:text-foreground"
              >
                Cookie settings
              </button>
              <Link to="/accessibility" className="rounded transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring dark:hover:text-foreground">
                Accessibility Statement
              </Link>
              <Link to="/nurotok/privacy" className="rounded transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring dark:hover:text-foreground">
                Privacy Policy
              </Link>
              <Link to="/nurotok/terms" className="rounded transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring dark:hover:text-foreground">
                Terms of Service
              </Link>
              <Link to="/nurotok/cookies" className="rounded transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring dark:hover:text-foreground">
                Cookie policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
