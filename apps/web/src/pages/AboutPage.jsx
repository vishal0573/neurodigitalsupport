import React from 'react';
import { Helmet } from 'react-helmet';
import { canonicalFor } from '@/lib/seo';
import {
  ArrowRight,
  Brain,
  BriefcaseBusiness,
  Bot,
  ChartNoAxesCombined,
  CircleCheck,
  ClipboardCheck,
  Code2,
  GraduationCap,
  Handshake,
  Layers,
  Landmark,
  Lock,
  MonitorCheck,
  Network,
  PanelsTopLeft,
  ShieldCheck,
  UsersRound
} from 'lucide-react';
import Footer from '@/components/Footer.jsx';
import Header from '@/components/Header.jsx';
import AffiliationsSection from '@/components/AffiliationsSection.jsx';

const principles = [
  {
    title: 'Calm by Design',
    description: 'No flashing content, no addictive loops, no sensory overwhelm.',
    icon: PanelsTopLeft
  },
  {
    title: 'Inclusive by Default',
    description: 'Accessibility settings are built in, not bolted on.',
    icon: CircleCheck
  },
  {
    title: 'Backed by Evidence',
    description: 'Every feature is informed by lived experience and peer-reviewed research.',
    icon: Brain
  },
  {
    title: 'Safe Digital Environments',
    description: 'Moderation, safeguarding, and well-being come first.',
    icon: ShieldCheck
  },
  {
    title: 'Ethical use of AI',
    description: 'Predictive alerts and analytics support users without exploitation.',
    icon: Lock
  },
  {
    title: 'Built for Long-term Impact',
    description: 'We are here to change outcomes, not capture attention.',
    icon: MonitorCheck
  }
];

const audiences = [
  { label: 'Autistic and neurodivergent adults', icon: Brain },
  { label: 'Care providers and supported living teams', icon: Layers },
  { label: 'Universities and students', icon: GraduationCap },
  { label: 'Employers and HR professionals', icon: BriefcaseBusiness },
  { label: 'Researchers and policymakers', icon: Network },
  { label: 'Charities and community organisations', icon: UsersRound },
  { label: 'Public sector institutions.', icon: Landmark }
];

const SectionHeading = ({ children, className = '' }) => (
  <h2 className={`text-3xl font-semibold leading-[1.15] tracking-normal text-[#0c3028] sm:text-4xl lg:text-5xl ${className}`}>
    {children}
  </h2>
);

const AboutPage = () => (
  <>
    <Helmet>
      <title>About NeuroDigital Support | Inclusive digital well-being</title>
      <meta
        name="description"
        content="Learn how NeuroDigital Support designs research-driven digital products that prioritise neurodivergent wellbeing, accessibility, and inclusive support."
      />
            <link rel="canonical" href={canonicalFor('/about')} />
</Helmet>

    <Header />

    <main className="theme-aware-page min-h-screen overflow-hidden bg-[#fbfffd] text-[#142d26]">
      <section className="relative overflow-hidden bg-[linear-gradient(140deg,#ffffff_0%,#fbfffd_50%,#eef9f5_100%)] dark:bg-none">
        <div className="absolute right-[8%] top-1/2 hidden h-[28rem] w-[28rem] -translate-y-1/2 rounded-full border border-[#cfe7de]/60 lg:block dark:border-emerald-400/10" aria-hidden="true" />
        <div className="absolute right-[18%] top-[53%] hidden grid-cols-8 gap-3 opacity-55 lg:grid" aria-hidden="true">
          {Array.from({ length: 56 }).map((_, index) => (
            <span key={index} className="h-1.5 w-1.5 rounded-full bg-[#9ccfbd] dark:bg-emerald-300/25" />
          ))}
        </div>
        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1220px] flex-col justify-center px-5 py-20 sm:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_0.72fr]">
            <div className="max-w-3xl text-center lg:text-left">
              <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-normal text-[#0c3028] sm:text-5xl lg:text-[4rem] dark:text-foreground">
                About
                <br />
                NeuroDigital Support
              </h1>
              <p className="mt-8 max-w-2xl text-balance text-2xl font-semibold leading-snug text-[#28745f] sm:text-3xl dark:text-emerald-300">
                Changing Digital Environments,
                <br className="hidden sm:block" />
                Changing Outcomes.
              </p>
              <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-[#2f4841] sm:text-xl dark:text-muted-foreground">
                We build digital spaces that are sensory-aware, inclusive, and backed by evidence, so everyone can belong, participate, and thrive.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[390px] lg:ml-auto">
              <div className="absolute -inset-5 rounded-[2rem] bg-[#dff3ec]/55 blur-2xl dark:bg-emerald-500/10" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.7rem] border border-[#d7eee5] bg-white/72 p-3 shadow-[0_28px_80px_rgba(15,61,50,0.13)] backdrop-blur-xl dark:border-border dark:bg-card/85 dark:shadow-[0_28px_80px_rgba(0,0,0,0.34)]">
                <img
                  src="/images/products/about.png"
                  alt="About NeuroDigital Support"
                  className="aspect-[4/3] w-full rounded-[1.25rem] object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-6 border-t border-[#d4e9e1] pt-8 dark:border-border md:grid-cols-3 lg:mt-16 lg:max-w-[980px]">
            {[
              {
                title: 'Our Mission',
                description: 'We design digital environments that put neurodivergent people first.',
                icon: ClipboardCheck
              },
              {
                title: 'Our Purpose',
                description: 'We create sensory-aware platforms built on research and real human needs.',
                icon: Layers
              },
              {
                title: 'Our Promise',
                description: 'Evidence-led, ethically built, and focused on meaningful impact.',
                icon: ShieldCheck
              }
            ].map(({ title, description, icon: Icon }, index) => (
              <article
                key={title}
                className={`flex gap-5 md:pr-6 ${index > 0 ? 'md:border-l md:border-[#d4e9e1] md:pl-8 dark:md:border-border' : ''}`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e8f7f1] text-[#167158] shadow-[0_12px_30px_rgba(15,61,50,0.06)] dark:bg-emerald-950/30 dark:text-emerald-300">
                  <Icon className="h-5 w-5 stroke-[1.9]" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-base font-semibold leading-tight tracking-normal text-[#102f28] dark:text-foreground">{title}</h2>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#405b54] dark:text-muted-foreground">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f8fffb] pb-8 pt-24 dark:bg-background sm:pb-10 sm:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(196,235,222,0.32),transparent_34%),linear-gradient(135deg,#fbfffd_0%,#f6fcf9_48%,#eef8f4_100%)] dark:bg-none" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1220px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <article className="max-w-[620px]">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#cfe7de] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#0f765a] shadow-[0_10px_28px_rgba(15,61,50,0.05)] backdrop-blur dark:border-border dark:bg-card dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0f765a] dark:bg-emerald-300" aria-hidden="true" />
              Founder Story
            </div>
            <h2 className="mt-6 max-w-xl text-3xl font-semibold leading-[1.08] tracking-normal text-[#0c3028] sm:text-4xl lg:text-[3rem] dark:text-foreground">
              Founded by Kofi Ofori-Mensah
            </h2>
            <p className="mt-4 max-w-xl text-xl font-semibold leading-snug text-[#28745f] dark:text-emerald-300 sm:text-2xl">
              Researcher, advocate, and inclusive digital design lead.
            </p>
            <p className="mt-6 max-w-[34rem] text-base font-medium leading-8 text-[#405951] dark:text-muted-foreground sm:text-lg">
              Kofi Ofori-Mensah is a recognised researcher exploring neurodiversity, social media platforms, and algorithmic inclusion. His work combines lived experience, digital technology, and academic research to understand how platform design affects autistic and neurodivergent users. His dissertation on autistic adults and social media marketing in the UK directly shapes the design of our ecosystem.
            </p>

            <div className="theme-surface mt-7 grid gap-5 rounded-2xl border border-[#d9eee6] bg-white/70 p-5 shadow-[0_18px_54px_rgba(15,61,50,0.055)] backdrop-blur-xl sm:grid-cols-[0.76fr_1fr] sm:p-6">
              <div className="flex items-center gap-4">
                <a
                  href="https://kofioforimensah.neurodigitalsupport.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-[0_14px_34px_rgba(15,61,50,0.2)]"
                >
                  <img src="/images/products/kofi-ofori-mensah.jpeg" alt="Kofi Ofori-Mensah" className="h-full w-full object-cover" />
                </a>
                <div>
                  <a
                    href="https://kofioforimensah.neurodigitalsupport.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-[#0c3028] hover:text-[#0f765a] hover:underline"
                  >
                    Kofi Ofori-Mensah
                  </a>
                  <p className="text-sm font-medium text-[#28745f]">Researcher & Advocate</p>
                </div>
              </div>
              <p className="border-[#cfe7de] text-sm font-medium italic leading-6 text-[#314f47] sm:border-l sm:pl-6">
                Our mission is to build inclusive digital experiences grounded in research and human understanding.
              </p>
            </div>
            <a
              href="https://kofioforimensah.neurodigitalsupport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-[48px] items-center justify-center gap-3 rounded-lg border border-[#0f765a] bg-white/70 px-6 text-sm font-semibold text-[#0f765a] transition duration-300 hover:-translate-y-0.5 hover:bg-[#eaf8f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f765a] focus-visible:ring-offset-2"
            >
              Explore personal project and portfolio
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </article>

          <div className="grid items-end gap-6 sm:grid-cols-2 lg:gap-7">
            <div className="theme-surface rounded-2xl border border-[#cfe7de] bg-white/74 p-5 shadow-[0_24px_70px_rgba(15,61,50,0.08)] backdrop-blur-xl sm:p-6">
              <h3 className="text-lg font-semibold text-[#0c3028] sm:text-xl">Research Focus</h3>
              <div className="mt-4 h-0.5 w-14 rounded-full bg-[#0f765a]" />
              <div className="mt-5">
                {[
                  { title: 'Neurodiversity', text: 'Understanding diverse cognitive experiences', icon: Brain },
                  { title: 'Digital Platforms', text: 'Examining platform design and user impact', icon: PanelsTopLeft },
                  { title: 'Algorithmic Inclusion', text: 'Building fair, transparent and inclusive systems', icon: ShieldCheck },
                  { title: 'Evidence-Based Design', text: 'Turning research into meaningful solutions', icon: MonitorCheck }
                ].map(({ title, text, icon: Icon }) => (
                  <div key={title} className="flex gap-4 border-b border-[#d8e9e2] py-4 first:pt-0 last:border-b-0 last:pb-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f5ef] text-[#167158] sm:h-12 sm:w-12">
                      <Icon className="h-5 w-5 stroke-[1.8]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-snug text-[#0c3028] sm:text-base">{title}</p>
                      <p className="mt-1.5 text-sm font-medium leading-5 text-[#415b53]">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-[#cfe7de] bg-white/74 p-7 text-center shadow-[0_28px_80px_rgba(15,61,50,0.08)] backdrop-blur-xl">
              <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-[conic-gradient(from_0deg,#bde6d9_0_18%,#0f765a_18%_68%,#d5f0e7_68%_100%)] p-3 shadow-[inset_0_0_0_1px_rgba(15,118,90,0.08)] dark:bg-[conic-gradient(from_0deg,rgba(16,185,129,0.22)_0_18%,rgba(16,185,129,0.72)_18%_68%,rgba(45,212,191,0.18)_68%_100%)] sm:h-40 sm:w-40">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#fbfffd] px-5">
                  <p className="text-center text-lg font-semibold leading-snug text-[#0c3028] sm:text-xl">Driven by Research</p>
                </div>
              </div>
              <div className="mx-auto mt-6 h-0.5 w-16 rounded-full bg-[#0f765a]" />
              <p className="mx-auto mt-6 max-w-[250px] text-sm font-medium leading-7 text-[#2f4841] sm:text-base">
                Every product and decision in our ecosystem is grounded in rigorous research, lived experience, and a commitment to inclusive design.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f8fffb] pb-8 pt-8 dark:bg-background sm:pb-10 sm:pt-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_14%,rgba(196,235,222,0.32),transparent_34%),linear-gradient(225deg,#fbfffd_0%,#f6fcf9_48%,#eef8f4_100%)] dark:bg-none" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1220px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <article className="max-w-[620px]">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#cfe7de] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#0f765a] shadow-[0_10px_28px_rgba(15,61,50,0.05)] backdrop-blur dark:border-border dark:bg-card dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0f765a] dark:bg-emerald-300" aria-hidden="true" />
              Co-Founder Story
            </div>
            <h2 className="mt-6 max-w-xl text-3xl font-semibold leading-[1.08] tracking-normal text-[#0c3028] sm:text-4xl lg:text-[3rem] dark:text-foreground">
              Shubham Nagore
            </h2>
            <p className="mt-4 max-w-xl text-xl font-semibold leading-snug text-[#28745f] dark:text-emerald-300 sm:text-2xl">
              Full-stack technologist, AI specialist, and market strategist.
            </p>
            <div className="mt-6 max-w-[34rem] space-y-4 text-base font-medium leading-8 text-[#405951] dark:text-muted-foreground sm:text-lg">
              <p>Shubham is an AI specialist, full-stack technologist, and market strategist with deep expertise in agentic AI systems and modern product engineering. As a Co-Founder, he combines the technical depth required to architect complex systems with the commercial instincts needed to position and scale them.</p>
              <p>Backed by an established network across London&apos;s business ecosystem, Shubham spearheads NeuroDigital Support&apos;s go-to-market strategy, technology partnerships, and brand positioning. He brings an extensive track record of delivering digital transformation across the hospitality and events sectors—from custom booking engines and venue management platforms to end-to-end digital experiences.</p>
              <p>He also acts as an AI specialist and tutor, helping teams and leaders master emerging AI architectures.</p>
            </div>

            <div className="theme-surface mt-7 grid gap-5 rounded-2xl border border-[#d9eee6] bg-white/70 p-5 shadow-[0_18px_54px_rgba(15,61,50,0.055)] backdrop-blur-xl sm:grid-cols-[0.76fr_1fr] sm:p-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white bg-[#123d32] shadow-[0_14px_34px_rgba(15,61,50,0.2)]">
                  <img src="/images/products/shubham-nagore.jpeg?v=20260820" alt="Shubham Nagore" className="h-full w-full object-cover object-[center_20%]" />
                </div>
                <div>
                  <p className="text-base font-semibold text-[#0c3028] dark:text-foreground">Shubham Nagore</p>
                  <p className="text-sm font-medium text-[#28745f] dark:text-emerald-300">Co-Founder</p>
                </div>
              </div>
              <p className="border-[#cfe7de] text-sm font-medium italic leading-6 text-[#314f47] dark:text-muted-foreground sm:border-l sm:pl-6">
                Building intelligent systems and clear market strategies that create meaningful, lasting impact.
              </p>
            </div>
          </article>

          <div className="grid items-end gap-6 sm:grid-cols-2 lg:gap-7">
            <div className="theme-surface rounded-2xl border border-[#cfe7de] bg-white/74 p-5 shadow-[0_24px_70px_rgba(15,61,50,0.08)] backdrop-blur-xl sm:p-6">
              <h3 className="text-lg font-semibold text-[#0c3028] dark:text-foreground sm:text-xl">Strategic Focus</h3>
              <div className="mt-4 h-0.5 w-14 rounded-full bg-[#0f765a]" />
              <div className="mt-5">
                {[
                  { title: 'Agentic AI Systems', text: 'Architecting intelligent, practical AI workflows', icon: Bot },
                  { title: 'Product Engineering', text: 'Building robust, end-to-end digital products', icon: Code2 },
                  { title: 'Go-to-Market Strategy', text: 'Positioning products to reach and grow their market', icon: ChartNoAxesCombined },
                  { title: 'Technology Partnerships', text: 'Creating valuable commercial and technical alliances', icon: Handshake }
                ].map(({ title, text, icon: Icon }) => (
                  <div key={title} className="flex gap-4 border-b border-[#d8e9e2] py-4 first:pt-0 last:border-b-0 last:pb-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f5ef] text-[#167158] sm:h-12 sm:w-12">
                      <Icon className="h-5 w-5 stroke-[1.8]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-snug text-[#0c3028] dark:text-foreground sm:text-base">{title}</p>
                      <p className="mt-1.5 text-sm font-medium leading-5 text-[#415b53] dark:text-muted-foreground">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="theme-surface rounded-2xl border border-[#cfe7de] bg-white/74 p-7 text-center shadow-[0_28px_80px_rgba(15,61,50,0.08)] backdrop-blur-xl">
              <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-[conic-gradient(from_0deg,#bde6d9_0_18%,#0f765a_18%_68%,#d5f0e7_68%_100%)] p-3 shadow-[inset_0_0_0_1px_rgba(15,118,90,0.08)] dark:bg-[conic-gradient(from_0deg,rgba(16,185,129,0.22)_0_18%,rgba(16,185,129,0.72)_18%_68%,rgba(45,212,191,0.18)_68%_100%)] sm:h-40 sm:w-40">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#fbfffd] px-5 dark:bg-card">
                  <p className="text-center text-lg font-semibold leading-snug text-[#0c3028] dark:text-foreground sm:text-xl">Built to Scale</p>
                </div>
              </div>
              <div className="mx-auto mt-6 h-0.5 w-16 rounded-full bg-[#0f765a]" />
              <p className="mx-auto mt-6 max-w-[250px] text-sm font-medium leading-7 text-[#2f4841] dark:text-muted-foreground sm:text-base">
                Turning complex technology into scalable products, strong partnerships, and trusted digital experiences.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-white pb-20 pt-10 sm:pb-24 sm:pt-12">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-10">
          <div className="text-center">
            <SectionHeading>Our Principles</SectionHeading>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {principles.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-[1.05rem] border border-[#e4f0eb] bg-white p-6 shadow-[0_18px_52px_rgba(15,61,50,0.052)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,61,50,0.085)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#dceee7] bg-white text-[#28745f] shadow-[0_10px_28px_rgba(15,61,50,0.055)]">
                  <Icon className="h-5 w-5 stroke-[1.8]" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold leading-tight tracking-normal text-[#0c3028]">{title}</h3>
                <p className="mt-4 text-sm font-medium leading-6 text-[#536b64]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-24 dark:bg-background sm:pb-28">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-10">
          <div className="theme-surface relative overflow-hidden rounded-[1.6rem] border border-[#d9eee6] bg-[linear-gradient(135deg,#e7f7f1_0%,#f7fffb_54%,#ffffff_100%)] px-6 py-16 text-center text-[#0c3028] shadow-[0_24px_76px_rgba(15,61,50,0.1)] dark:bg-none sm:px-10">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-[#b8ded0]/45 dark:border-emerald-400/15" />
            <div className="absolute -right-8 top-10 h-72 w-72 rounded-full border border-[#b8ded0]/35 dark:border-emerald-400/10" />
            <h2 className="text-3xl font-semibold leading-[1.15] tracking-normal text-[#0c3028] sm:text-4xl lg:text-5xl">
              Who We Serve
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-balance text-base font-medium leading-8 text-[#4f665f]">
              Whether you are an individual seeking a calmer experience, a support worker, a researcher, or an employer, we provide the tools you need to thrive.
            </p>

            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
              {audiences.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-[#b8ded0] bg-white/78 px-5 py-3 text-sm font-semibold text-[#123d32] shadow-[0_12px_32px_rgba(15,61,50,0.06)]"
                >
                  <Icon className="h-4 w-4 text-[#28745f]" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="theme-surface mt-9 grid items-center gap-8 rounded-[1.4rem] border border-[#e4f0eb] bg-white p-8 shadow-[0_22px_70px_rgba(15,61,50,0.07)] sm:p-10 lg:grid-cols-[0.12fr_1fr_0.25fr]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f1f7f4] text-[#28745f]">
              <ClipboardCheck className="h-7 w-7" aria-hidden="true" />
            </div>
            <p className="text-balance text-lg font-medium leading-8 text-[#0c3028] sm:text-xl">
              NeuroDigital Support is more than a suite of apps. It is a movement toward technology that respects human sensory needs, protects well-being, and creates genuine belonging
            </p>
            <div className="hidden justify-self-end text-[#28745f] lg:block">
              <MonitorCheck className="h-24 w-24 opacity-30" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
    </main>

    <AffiliationsSection />
    <Footer />
  </>
);

export default AboutPage;
