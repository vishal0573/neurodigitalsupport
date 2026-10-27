import React from 'react';
import { Helmet } from 'react-helmet';
import { canonicalFor } from '@/lib/seo';
import { Link } from 'react-router-dom';
import {
  Activity,
  Apple,
  BarChart3,
  Bell,
  Brain,
  CalendarCheck,
  ChevronRight,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  ShieldCheck,
  Twitter,
  UserRound,
  Zap
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import AffiliationsSection from '@/components/AffiliationsSection.jsx';

const storeButtons = [
  { label: 'App Store', icon: Apple },
  { label: 'Google Play' }
];

const visionItems = [
  { title: 'Reduce Overstimulation', icon: Zap },
  { title: 'Build Resilience', icon: ShieldCheck },
  { title: 'Understand Triggers', icon: Brain }
];

const features = [
  {
    title: 'Personal Sensory Profile',
    description: 'Tailored profile based on light, sound, texture, routine, and touch sensitivities.',
    icon: UserRound
  },
  {
    title: 'Adaptive Regulation Toolkit',
    description: 'Access guided breathing, white noise, screen dimming, and calm modes.',
    icon: Activity
  },
  {
    title: 'Daily Check-Ins',
    description: 'Stress-free tracking of your mood, energy, and sensory load.',
    icon: CalendarCheck
  },
  {
    title: 'Weekly Insights',
    description: 'Understand patterns in wellbeing, routines, and triggers.',
    icon: BarChart3
  },
  {
    title: 'Predictive Overload Alerts',
    description: 'Supportive reminders when patterns suggest rising sensory stress.',
    icon: Bell
  }
];

const screens = [
  { label: 'Home', subtitle: 'Distraction-free daily navigation.' },
  { label: 'Profile', subtitle: 'Personal sensory preferences.' },
  { label: 'Toolkit', subtitle: 'Calming tools within easy reach.' },
  { label: 'Insights', subtitle: 'Weekly wellbeing patterns.' }
];

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

const AppScreenContent = ({ label }) => {
  if (label === 'Home') {
    return (
      <>
        <p className="text-[10px] font-bold text-emerald-700">NuroTok</p>
        <h5 className="mt-3 text-left text-[13px] font-extrabold leading-tight text-slate-950">Hello [Name]</h5>
        <p className="mt-1 text-left text-[6px] font-semibold leading-tight text-slate-500">Your check-in habit warms your daily regulation routine.</p>
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {[
            ['Mon', 'Calm', 'bg-emerald-100 text-emerald-800'],
            ['Tue', 'Focus', 'bg-amber-100 text-amber-800'],
            ['Wed', 'Wind', 'bg-sky-100 text-sky-800']
          ].map(([day, mood, className]) => (
            <div key={day} className={`rounded-lg px-1.5 py-2 text-center ${className}`}>
              <p className="text-[6px] font-black">{day}</p>
              <p className="mt-1 text-[5px] font-bold">{mood}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-white p-2 shadow-sm ring-1 ring-emerald-100">
          <p className="text-left text-[7px] font-extrabold text-slate-900">Main app screen</p>
          {['Text Noise', 'Daily Check-In', 'Widget Document'].map((item) => (
            <div key={item} className="mt-1.5 flex items-center justify-between rounded-md bg-emerald-50 px-2 py-1 text-[6px] font-bold text-slate-600">
              <span>{item}</span>
              <span className="text-emerald-700">&gt;</span>
            </div>
          ))}
          <div className="mt-2 rounded-full bg-emerald-500 py-1.5 text-center text-[6px] font-extrabold text-white">Magic Screen</div>
        </div>
      </>
    );
  }

  if (label === 'Profile') {
    return (
      <>
        <h5 className="mt-1 text-left text-[12px] font-extrabold leading-tight text-slate-950">Personal Sensory Profile</h5>
        <div className="mt-3 space-y-2">
          {['Name', 'Email'].map((field) => (
            <div key={field}>
              <p className="text-left text-[6px] font-bold text-slate-600">{field}</p>
              <div className="mt-1 h-5 rounded-md bg-white shadow-sm ring-1 ring-slate-200" />
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl bg-white p-2 shadow-sm ring-1 ring-emerald-100">
          <p className="text-left text-[7px] font-extrabold text-slate-900">Sensory Checkboxes</p>
          {['Advanced', 'Sensitivity', 'Sensory listener', 'Noise sensitive', 'Routine support'].map((item, itemIndex) => (
            <div key={item} className="mt-1 flex items-center gap-1 text-[6px] font-semibold text-slate-600">
              <span className={`flex h-2.5 w-2.5 items-center justify-center rounded-sm ${itemIndex < 4 ? 'bg-emerald-500' : 'bg-white ring-1 ring-slate-300'}`}>
                {itemIndex < 4 ? <span className="h-1 w-1 rounded-full bg-white" /> : null}
              </span>
              {item}
            </div>
          ))}
        </div>
      </>
    );
  }

  if (label === 'Toolkit') {
    return (
      <>
        <h5 className="mt-1 text-left text-[12px] font-extrabold leading-tight text-slate-950">Adaptive Regulation Toolkit</h5>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            ['Guided Breathing', Activity, 'bg-sky-100 text-sky-700'],
            ['White Noise', Brain, 'bg-rose-100 text-rose-700'],
            ['Focus Stack', Bell, 'bg-emerald-100 text-emerald-700'],
            ['Nature Sounds', Zap, 'bg-lime-100 text-lime-700'],
            ['Responsive', CalendarCheck, 'bg-orange-100 text-orange-700'],
            ['Lengthen', BarChart3, 'bg-violet-100 text-violet-700']
          ].map(([item, Icon, className]) => (
            <div key={item} className={`rounded-xl px-1.5 py-2 text-center shadow-sm ${className}`}>
              <Icon className="mx-auto h-3.5 w-3.5" aria-hidden="true" />
              <p className="mt-1 text-[5.5px] font-extrabold leading-tight">{item}</p>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h5 className="mt-1 text-left text-[12px] font-extrabold leading-tight text-slate-950">Weekly Wellbeing Dashboard</h5>
      <div className="mt-4 rounded-xl bg-white p-2 shadow-sm ring-1 ring-emerald-100">
        <p className="text-left text-[7px] font-extrabold text-slate-900">Weekly Insights</p>
        <svg viewBox="0 0 92 56" className="mt-1 h-16 w-full" aria-hidden="true">
          <path d="M4 44 C18 18, 28 36, 40 24 S62 14, 88 8" fill="none" stroke="#ef7f91" strokeWidth="2.5" />
          <path d="M4 48 C20 38, 28 28, 42 35 S66 20, 88 24" fill="none" stroke="#65bfa4" strokeWidth="2.5" />
          <path d="M4 42 C22 44, 30 18, 48 28 S66 38, 88 18" fill="none" stroke="#f0c45f" strokeWidth="2.5" />
        </svg>
      </div>
      <div className="mt-3 rounded-xl bg-white p-2 shadow-sm ring-1 ring-emerald-100">
        <p className="text-left text-[7px] font-extrabold text-slate-900">Wellness data</p>
        <div className="mt-2 grid grid-cols-6 items-end gap-1">
          {[22, 34, 28, 44, 38, 50].map((height) => (
            <span key={height} className="rounded-t bg-emerald-300" style={{ height }} />
          ))}
        </div>
      </div>
    </>
  );
};

const GooglePlayMark = () => (
  <svg viewBox="0 0 28 30" className="h-7 w-7 shrink-0" aria-hidden="true">
    <path d="M2.2 1.2c-.6.4-1 1.2-1 2.2v23.2c0 1 .4 1.8 1 2.2l13.1-13.8L2.2 1.2Z" fill="#42d7a2" />
    <path d="m19.4 10.7-4.1 4.3 4.1 4.3 5.2-3c1.7-1 1.7-2.6 0-3.6l-5.2-3Z" fill="#ffd36a" />
    <path d="m2.2 1.2 13.1 13.8 4.1-4.3L4.9 2.1C3.9 1.5 2.9.9 2.2 1.2Z" fill="#5ab6ff" />
    <path d="m2.2 28.8c.7.4 1.7-.2 2.7-.9l14.5-8.6-4.1-4.3L2.2 28.8Z" fill="#f15f6f" />
  </svg>
);

const StoreButton = ({ label, icon: Icon, light = false }) => (
  <button
    type="button"
    className={`group inline-flex h-[54px] min-w-[158px] items-center justify-center gap-3 rounded-[14px] border px-4 text-left shadow-[0_14px_30px_rgba(15,23,42,0.14)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(15,23,42,0.18)] active:scale-[0.98] ${
      light
        ? 'border-slate-900 bg-slate-950 text-white'
        : 'border-slate-950 bg-slate-950 text-white'
    }`}
    aria-label={`Download on ${label}`}
  >
    <span className="flex h-7 w-7 shrink-0 items-center justify-center text-white">
      {label === 'App Store' && Icon ? <Icon className="h-6 w-6" aria-hidden="true" /> : <GooglePlayMark />}
    </span>
    <span className="flex min-w-0 flex-col leading-none">
      <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-white/80">
        {label === 'App Store' ? 'Download on the' : 'Get it on'}
      </span>
      <span className="mt-1 whitespace-nowrap text-[18px] font-extrabold tracking-normal text-white">
        {label}
      </span>
    </span>
  </button>
);

const PhoneMockup = ({ label = 'NuroTok', variant = 'hero' }) => (
  <div className={`relative mx-auto rounded-[2.35rem] border-[7px] border-[#07101f] bg-[#07101f] shadow-[0_28px_70px_rgba(15,23,42,0.34),0_12px_24px_rgba(79,159,132,0.2)] ${variant === 'hero' ? 'h-[378px] w-[190px]' : 'h-[250px] w-[126px]'}`}>
    <div className="absolute -left-2 top-20 h-10 w-1 rounded-l bg-slate-800" aria-hidden="true" />
    <div className="absolute -right-2 top-28 h-14 w-1 rounded-r bg-slate-800" aria-hidden="true" />
    <div className="absolute left-1/2 top-2 z-20 h-[19px] w-[68px] -translate-x-1/2 rounded-full bg-black shadow-inner" />
    <div className="relative h-full overflow-hidden rounded-[1.8rem] bg-gradient-to-b from-[#f8fffc] via-[#edf9f4] to-[#d8f2e9]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(125,211,252,0.24),transparent_28%),radial-gradient(circle_at_82%_24%,rgba(244,114,182,0.16),transparent_24%),radial-gradient(circle_at_50%_92%,rgba(16,185,129,0.2),transparent_34%)]" aria-hidden="true" />
      <div className="relative flex h-full flex-col px-4 pb-4 pt-8 text-left">
        <div className="flex items-center justify-between text-[7px] font-black text-slate-700">
          <span>9:41</span>
          <span className="flex items-center gap-0.5">
            <span className="h-1.5 w-3 rounded-[2px] border border-slate-700" />
            <span className="h-1 w-0.5 rounded-r bg-slate-700" />
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-emerald-700">{label}</p>
            <h5 className="mt-1 text-[14px] font-extrabold leading-tight text-slate-950">Regulation Toolkit</h5>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-white shadow-[0_8px_18px_rgba(15,23,42,0.12)] ring-1 ring-emerald-100">
            <Activity className="h-4 w-4 text-emerald-700" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-4 rounded-[18px] bg-white/90 p-3 shadow-[0_14px_28px_rgba(15,23,42,0.12)] ring-1 ring-white/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[7px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Sensory load</p>
              <p className="mt-1 text-[19px] font-black leading-none text-slate-950">Calm</p>
            </div>
            <div className="relative h-12 w-12">
              <div
                className="absolute inset-0 rounded-full opacity-80"
                style={{ background: 'conic-gradient(from 140deg, #34d399, #7dd3fc, #fb7185, #34d399)' }}
              />
              <div className="absolute inset-1.5 rounded-full bg-white" />
              <div className="absolute inset-[13px] rounded-full bg-emerald-400" />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[
              ['Light', '72%', 'bg-amber-100 text-amber-700'],
              ['Sound', '38%', 'bg-sky-100 text-sky-700'],
              ['Touch', '54%', 'bg-rose-100 text-rose-700']
            ].map(([name, value, className]) => (
              <div key={name} className={`rounded-xl px-1.5 py-2 text-center ${className}`}>
                <p className="text-[5.5px] font-black">{name}</p>
                <p className="mt-0.5 text-[8px] font-extrabold">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            ['Breathe', Activity, 'bg-emerald-500 text-white'],
            ['White Noise', Brain, 'bg-white text-slate-700'],
            ['Dim Mode', Zap, 'bg-white text-slate-700'],
            ['Routine', CalendarCheck, 'bg-violet-100 text-violet-700']
          ].map(([item, Icon, className]) => (
            <div key={item} className={`rounded-2xl p-2 shadow-[0_8px_18px_rgba(15,23,42,0.08)] ring-1 ring-white/70 ${className}`}>
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              <p className="mt-2 text-[6.5px] font-extrabold leading-tight">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto rounded-[18px] bg-[#101828] p-3 text-white shadow-[0_14px_28px_rgba(15,23,42,0.2)]">
          <div className="flex items-center justify-between">
            <p className="text-[8px] font-extrabold">Personal Sensory Profile</p>
            <span className="rounded-full bg-emerald-400 px-1.5 py-0.5 text-[5px] font-black text-emerald-950">LIVE</span>
          </div>
          <div className="mt-3 space-y-1.5">
            {[86, 62, 74].map((width, index) => (
              <div key={width} className="h-1.5 overflow-hidden rounded-full bg-white/15">
                <span
                  className={`block h-full rounded-full ${index === 0 ? 'bg-emerald-300' : index === 1 ? 'bg-sky-300' : 'bg-rose-300'}`}
                  style={{ width: `${width}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MiniScreen = ({ label, subtitle }) => (
  <div className="flex flex-col items-center text-center">
    <div className="inline-flex rounded-[1.85rem] border-[4px] border-slate-950 bg-slate-950 shadow-[0_22px_44px_rgba(15,23,42,0.24)]">
      <div className="relative h-[270px] w-[134px] overflow-hidden rounded-[1.38rem] bg-gradient-to-b from-[#fbfffd] via-[#f0fbf6] to-[#e0f4ec] px-3 py-5">
        <div className="absolute left-1/2 top-1.5 h-3.5 w-11 -translate-x-1/2 rounded-full bg-black" />
        <div className="mt-4 flex items-center justify-between text-[6px] font-bold text-slate-800 [&>span:nth-child(2)]:hidden">
          <span>9:41</span>
          <span>LTE</span>
          <span>● ●</span>
        </div>
        <AppScreenContent label={label} />
        <div className="absolute bottom-4 left-3 right-3 flex items-center justify-around border-t border-emerald-100 pt-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="h-2 w-2 rounded-full bg-slate-300" />
        </div>
      </div>
    </div>
    <h4 className="mt-5 w-full text-center text-2xl font-extrabold text-slate-950">{label}</h4>
    <p className="mt-2 min-h-[2.5rem] max-w-[10.5rem] text-center text-xs font-medium leading-snug text-slate-600">{subtitle}</p>
  </div>
);

const NuroTokPage = () => {
  return (
    <>
      <Helmet>
        <title>NuroTok | Sensory regulation app for neurodivergent adults</title>
        <meta name="description" content="NuroTok is a calming digital companion that supports sensory regulation, emotional wellbeing, and stress reduction for autistic and neurodivergent adults." />
              <link rel="canonical" href={canonicalFor('/nurotok')} />
</Helmet>

      <Header />

      <main className="product-detail-page bg-[#f7fffb] text-slate-950 transition-colors duration-300 dark:bg-background dark:text-foreground">
        <section className="overflow-hidden bg-gradient-to-br from-[#effbf6] via-white to-[#daf3eb] dark:from-background dark:via-card/35 dark:to-background">
          <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1180px] items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.72fr] lg:px-10">
            <div className="text-center lg:text-left">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_18px_46px_rgba(15,23,42,0.12)] ring-1 ring-emerald-100 lg:mx-0">
                <img
                  src="/images/products/nurotok-logo.jpeg"
                  alt="NuroTok logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-3xl font-black leading-[1.15] tracking-tight text-[#46987d] drop-shadow-[0_10px_24px_rgba(79,159,132,0.18)] sm:text-4xl lg:text-5xl">NuroTok</p>
              <h1 className="mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-950 dark:text-foreground sm:text-4xl lg:text-5xl">Sensory Regulation App</h1>
              <p className="mx-auto mt-5 max-w-xl text-lg font-semibold leading-relaxed text-slate-700 dark:text-muted-foreground lg:mx-0">
                A calming wellbeing companion designed to help you manage sensory overload and emotional stress.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                {storeButtons.map((button) => <StoreButton key={button.label} {...button} />)}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-x-10 bottom-0 h-28 rounded-full bg-emerald-300/25 blur-3xl" aria-hidden="true" />
              <PhoneMockup />
            </div>
          </div>
        </section>

        <section className="bg-white py-20 dark:bg-background">
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-emerald-800 dark:text-emerald-300 sm:text-4xl lg:text-5xl">Designed for Sensory Harmony</h2>
                <div className="mt-6 grid gap-4 text-sm font-medium leading-relaxed text-slate-600 dark:text-muted-foreground sm:grid-cols-2">
                  <p>
                    Most digital platforms are overwhelming. They compete for attention, increase noise, and make regulation harder during already difficult moments.
                  </p>
                  <p>
                    NuroTok creates a softer alternative: a focused sensory wellbeing space that helps adults understand patterns, reduce stress, and regain calm.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {visionItems.map(({ title, icon: Icon }) => (
                  <div key={title} className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 text-center shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-sm font-extrabold text-slate-900">{title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f4fbf8] py-20 dark:bg-card/25">
          <div className="mx-auto max-w-[1180px] px-4 text-center sm:px-6 lg:px-10">
            <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">Adaptive Features for Wellbeing</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {features.map(({ title, description, icon: Icon }) => (
                <article key={title} className="rounded-2xl border border-emerald-100 bg-white p-7 text-center shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-base font-extrabold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#eaf9f2] via-[#fbfffd] to-[#dcf4ea] py-20">
          <div className="mx-auto max-w-[1180px] px-4 text-center sm:px-6 lg:px-10">
            <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">A Calming, Intuitive Experience</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-slate-950">Distraction-free, easy navigation.</p>
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
              {screens.map((screen) => <MiniScreen key={screen.label} {...screen} />)}
            </div>
            <p className="mx-auto mt-10 max-w-xl text-base font-medium leading-relaxed text-slate-950">
              Minimal, calming, and distraction-free with easy navigation:
              <br />
              Home | Profile | Toolkit | Insights
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#e9f9f3] via-[#f7fffb] to-[#dff4ec] py-16">
          <div className="mx-auto max-w-[1180px] px-4 text-center sm:px-6 lg:px-10">
            <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">Ready to manage your sensory wellbeing?</h2>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {storeButtons.map((button) => <StoreButton key={button.label} {...button} light />)}
            </div>
          </div>
        </section>
      </main>

      <AffiliationsSection />

      <footer className="w-full border-t border-emerald-100 bg-[#fbfdfc] dark:border-border dark:bg-background">
        <div className="mx-auto w-full max-w-[1240px] px-4 py-14 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-20 lg:gap-20">
            <div>
              <Link to="/" className="relative flex h-16 w-auto items-center overflow-hidden rounded-md focus-visible-ring" aria-label="NeuroDigital Support home">
                <img src="/logo-footer.jpeg" alt="NeuroDigital Support" className="h-full w-auto object-contain" />
              </Link>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600 dark:text-muted-foreground">
                Creating sensory-aware digital spaces that support neurodivergent wellbeing and reduce overwhelm.
              </p>
            </div>

            <div className="min-w-0 md:pl-3 lg:pl-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-foreground">Navigation</span>
              <nav className="mt-5 space-y-3" aria-label="Footer navigation">
                {navigationLinks.map((link) => (
                  <Link key={link.path} to={link.path} className="block text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring rounded dark:text-muted-foreground dark:hover:text-foreground">
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="min-w-0">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-foreground">Contact</span>
              <div className="mt-5 space-y-4">
                <a href="mailto:info@neurodigitalsupport.com" className="flex items-center gap-3 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring rounded dark:text-muted-foreground dark:hover:text-foreground">
                  <span className="flex h-5 w-5 items-center justify-center"><Mail className="h-[18px] w-[18px] text-[#5aa88f]" aria-hidden="true" /></span>
                  <span>info@neurodigitalsupport.com</span>
                </a>
                <a href="tel:+447825354088" className="flex items-center gap-3 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring rounded dark:text-muted-foreground dark:hover:text-foreground">
                  <span className="flex h-5 w-5 items-center justify-center"><Phone className="h-[18px] w-[18px] text-[#5aa88f]" aria-hidden="true" /></span>
                  <span>+447825354088</span>
                </a>
                <div className="inline-flex items-center gap-3 pt-1">
                  {socialLinks.map((social) => (
                    <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-100 bg-white text-slate-600 shadow-sm transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring dark:border-border dark:bg-card dark:text-muted-foreground dark:hover:text-foreground" aria-label={social.name}>
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
              <Link to="/" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#5aa88f] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#4a957e]">
                Back Home
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-100 py-7 dark:border-border">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm font-semibold text-slate-600 dark:text-muted-foreground">&copy; 2026 NeuroDigital Support. All rights reserved.</p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-600 dark:text-muted-foreground">
                <button type="button" onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))} className="transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring rounded dark:hover:text-foreground">Cookie settings</button>
                <Link to="/accessibility" className="transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring rounded dark:hover:text-foreground">Accessibility Statement</Link>
                <Link to="/nurotok/privacy" className="transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring rounded dark:hover:text-foreground">Privacy Policy</Link>
                <Link to="/nurotok/terms" className="transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring rounded dark:hover:text-foreground">Terms of Service</Link>
                <Link to="/nurotok/legal" className="transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring rounded dark:hover:text-foreground">All NuroTok policies</Link>
                <Link to="/nurotok/cookies" className="transition-colors duration-200 hover:text-[#4a957e] focus-visible-ring rounded dark:hover:text-foreground">Cookie policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default NuroTokPage;
