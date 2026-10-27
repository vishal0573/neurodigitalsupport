import privacy from './01-privacy-policy.md?raw';
import terms from './02-terms-and-conditions.md?raw';
import deletion from './03-account-and-data-deletion.md?raw';
import subscriptions from './04-subscriptions-cancellation-refunds.md?raw';
import wellbeing from './05-wellbeing-and-ai-disclaimer.md?raw';
import permissions from './06-permissions-and-device-data.md?raw';
import support from './07-support-and-contact.md?raw';
import cookies from './08-cookies-and-third-party-websites.md?raw';

export const nuroTokPolicies = [
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    description: 'What NuroTok handles on your device, online services, your choices, and data rights.',
    content: privacy
  },
  {
    slug: 'terms',
    title: 'Terms and Conditions',
    description: 'The service terms, eligibility, wellbeing limits, subscriptions, and consumer rights.',
    content: terms
  },
  {
    slug: 'delete-account',
    title: 'Account and Data Deletion',
    description: 'How to request account deletion, remove local data, and manage subscriptions separately.',
    content: deletion
  },
  {
    slug: 'subscriptions',
    title: 'Subscriptions, Cancellation and Refunds',
    description: 'Store billing, renewals, cancellations, refund requests, and restoring purchases.',
    content: subscriptions
  },
  {
    slug: 'wellbeing-disclaimer',
    title: 'Wellbeing and AI Disclaimer',
    description: 'Important limits on wellbeing tools, AI conversations, exercises, and filtering.',
    content: wellbeing
  },
  {
    slug: 'permissions',
    title: 'App Permissions and Device Data',
    description: 'Why NuroTok may request device permissions and how they support app features.',
    content: permissions
  },
  {
    slug: 'support',
    title: 'Support and Contact',
    description: 'Contact details, issue reporting guidance, and common support requests.',
    content: support
  },
  {
    slug: 'cookies',
    title: 'Cookies and Third-Party Websites',
    description: 'How embedded Lite websites and third-party services may use cookies and similar storage.',
    content: cookies
  }
];
