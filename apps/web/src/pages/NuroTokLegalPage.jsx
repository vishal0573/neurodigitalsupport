import React from 'react';
import { Helmet } from 'react-helmet';
import { ArrowLeft, ArrowUpRight, FileText, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Footer from '@/components/Footer.jsx';
import Header from '@/components/Header.jsx';
import { nuroTokPolicies } from '@/content/nurotok/policies.js';
import { canonicalFor } from '@/lib/seo';

function renderInline(text, keyPrefix) {
  const segments = [];
  const urlPattern = /https?:\/\/[^\s<>]+/g;
  let lastIndex = 0;
  let match;

  while ((match = urlPattern.exec(text)) !== null) {
    const rawUrl = match[0];
    const url = rawUrl.replace(/[.,;:!?)}\]]+$/, '');
    const trailingText = rawUrl.slice(url.length);

    if (match.index > lastIndex) {
      segments.push(text.slice(lastIndex, match.index));
    }

    segments.push(
      <a
        key={`${keyPrefix}-${match.index}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-emerald-800 underline decoration-emerald-300 underline-offset-4 transition-colors hover:text-emerald-950 dark:text-emerald-300 dark:hover:text-emerald-200"
      >
        {url}
      </a>
    );
    if (trailingText) segments.push(trailingText);
    lastIndex = match.index + rawUrl.length;
  }

  if (lastIndex < text.length) segments.push(text.slice(lastIndex));
  return segments;
}

function renderMarkdown(markdown) {
  const lines = markdown.trim().split(/\r?\n/).slice(1);
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{2,6})\s+(.+)$/);
    if (heading) {
      blocks.push({
        type: 'heading',
        level: heading[1].length,
        text: heading[2],
        id: heading[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      });
      index += 1;
      continue;
    }

    const listItem = line.match(/^(\s*)([-*]|\d+\.)\s+(.+)$/);
    if (listItem) {
      const ordered = /^\d+\.$/.test(listItem[2]);
      const items = [];
      while (index < lines.length) {
        const item = lines[index].trim().match(/^([-*]|\d+\.)\s+(.+)$/);
        if (!item || /^\d+\.$/.test(item[1]) !== ordered) break;
        items.push(item[2]);
        index += 1;
      }
      blocks.push({ type: ordered ? 'ol' : 'ul', items });
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (index < lines.length) {
      const next = lines[index].trim();
      if (
        !next ||
        /^(#{1,6})\s+/.test(next) ||
        /^([-*]|\d+\.)\s+/.test(next)
      ) {
        break;
      }
      paragraph.push(next);
      index += 1;
    }
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
  }

  return blocks.map((block, blockIndex) => {
    if (block.type === 'heading') {
      const HeadingTag = `h${Math.min(block.level, 4)}`;
      return (
        <HeadingTag
          key={`heading-${blockIndex}`}
          id={block.id}
          className="scroll-mt-24 pt-3 text-xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-2xl"
        >
          {block.text}
        </HeadingTag>
      );
    }

    if (block.type === 'ul' || block.type === 'ol') {
      const ListTag = block.type;
      return (
        <ListTag
          key={`${block.type}-${blockIndex}`}
          className="space-y-2 pl-6 text-[15px] leading-7 text-slate-700 marker:text-emerald-700 dark:text-slate-300 dark:marker:text-emerald-300"
        >
          {block.items.map((item, itemIndex) => (
            <li key={`${block.type}-${itemIndex}`}>{renderInline(item, `list-${blockIndex}-${itemIndex}`)}</li>
          ))}
        </ListTag>
      );
    }

    return (
      <p
        key={`paragraph-${blockIndex}`}
        className="text-[15px] leading-7 text-slate-700 dark:text-slate-300"
      >
        {renderInline(block.text, `paragraph-${blockIndex}`)}
      </p>
    );
  });
}

const NuroTokLegalPage = () => {
  const { policy: slug } = useParams();
  const isHub = !slug || slug === 'legal';
  const policy = isHub ? null : nuroTokPolicies.find((item) => item.slug === slug);

  if (!isHub && !policy) {
    return (
      <>
        <Helmet>
          <title>Page not found | NuroTok policies</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Header />
        <main className="min-h-[60vh] bg-[#f7fffb] px-4 py-20 dark:bg-background">
          <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-sm dark:border-border dark:bg-card sm:p-12">
            <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">Policy page not found</h1>
            <p className="mx-auto mt-4 text-slate-600 dark:text-muted-foreground">The page may have moved. Browse the NuroTok policy centre to find what you need.</p>
            <Link to="/nurotok/legal" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white transition-colors hover:bg-emerald-800 focus-visible-ring">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              NuroTok policy centre
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const pageTitle = isHub ? 'NuroTok Policies and Support' : `${policy.title} | NuroTok`;
  const description = isHub
    ? 'Browse NuroTok privacy, terms, account deletion, subscriptions, wellbeing, permissions, support, and cookies information.'
    : policy.description;
  const canonicalPath = isHub ? '/nurotok/legal' : `/nurotok/${policy.slug}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalFor(canonicalPath)} />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-[#f7fffb] text-slate-950 dark:bg-background dark:text-foreground">
        <section className="border-b border-emerald-100 bg-gradient-to-br from-[#effbf6] via-white to-[#e2f5ed] dark:border-border dark:from-background dark:via-card/35 dark:to-background">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500 dark:text-muted-foreground">
              <Link to="/" className="rounded hover:text-emerald-800 focus-visible-ring dark:hover:text-emerald-300">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/nurotok" className="rounded hover:text-emerald-800 focus-visible-ring dark:hover:text-emerald-300">NuroTok</Link>
              <span aria-hidden="true">/</span>
              {isHub ? (
                <span aria-current="page" className="text-emerald-900 dark:text-emerald-300">Policies &amp; support</span>
              ) : (
                <>
                  <Link to="/nurotok/legal" className="rounded hover:text-emerald-800 focus-visible-ring dark:hover:text-emerald-300">Policies &amp; support</Link>
                  <span aria-hidden="true">/</span>
                  <span aria-current="page" className="text-emerald-900 dark:text-emerald-300">{policy.title}</span>
                </>
              )}
            </nav>
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">NUROTOK · INFORMATION CENTRE</p>
              <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                {isHub ? 'Policies & support' : policy.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-muted-foreground sm:text-lg">
                {isHub
                  ? 'Find product information, privacy choices, billing guidance, and ways to get help with NuroTok.'
                  : policy.description}
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
          <div className="space-y-6">
            {isHub ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  {nuroTokPolicies.map((item, index) => (
                    <Link
                      key={item.slug}
                      to={`/nurotok/${item.slug}`}
                      className="group flex min-h-44 flex-col rounded-2xl border border-emerald-100 bg-white p-6 shadow-[0_12px_30px_rgba(15,61,50,0.05)] transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_18px_40px_rgba(15,61,50,0.1)] focus-visible-ring dark:border-border dark:bg-card dark:hover:border-emerald-400/40"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300">
                          {index === 0 ? <ShieldCheck className="h-5 w-5" aria-hidden="true" /> : <FileText className="h-5 w-5" aria-hidden="true" />}
                        </span>
                        <ArrowUpRight className="h-5 w-5 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-300" aria-hidden="true" />
                      </div>
                      <h2 className="mt-5 text-lg font-extrabold leading-snug text-slate-950 dark:text-white">{item.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-muted-foreground">{item.description}</p>
                    </Link>
                  ))}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-border dark:bg-card">
                  <h2 className="text-lg font-extrabold text-slate-950 dark:text-white">Need help?</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-muted-foreground">Contact NeuroDigital Support for product or privacy questions. Do not send passwords, verification codes, full card details, or unnecessary sensitive information.</p>
                  <a href="mailto:info@neurodigitalsupport.com" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800 focus-visible-ring">
                    Contact support
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </>
            ) : (
              <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-[0_12px_30px_rgba(15,61,50,0.05)] dark:border-border dark:bg-card sm:p-9">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5 dark:border-border">
                  <p className="text-sm font-bold text-slate-500 dark:text-muted-foreground">NuroTok information</p>
                  <Link to="/nurotok/legal" className="inline-flex items-center gap-2 rounded-lg text-sm font-bold text-emerald-800 hover:text-emerald-950 focus-visible-ring dark:text-emerald-300 dark:hover:text-emerald-200">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    All policies
                  </Link>
                </div>
                <div className="space-y-5">
                  {renderMarkdown(policy.content)}
                </div>
              </article>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-emerald-100 bg-white p-5 dark:border-border dark:bg-card lg:sticky lg:top-24">
            <h2 className="text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-muted-foreground">NUROTOK PAGES</h2>
            <nav aria-label="NuroTok policies" className="mt-4 space-y-1">
              <Link
                to="/nurotok/legal"
                aria-current={isHub ? 'page' : undefined}
                className={`block rounded-xl px-3 py-2.5 text-sm font-bold transition-colors focus-visible-ring ${isHub ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-400/10 dark:text-emerald-200' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:text-muted-foreground dark:hover:bg-white/5 dark:hover:text-white'}`}
              >
                Policies &amp; support
              </Link>
              {nuroTokPolicies.map((item) => (
                <Link
                  key={item.slug}
                  to={`/nurotok/${item.slug}`}
                  aria-current={policy?.slug === item.slug ? 'page' : undefined}
                  className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors focus-visible-ring ${policy?.slug === item.slug ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-400/10 dark:text-emerald-200' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:text-muted-foreground dark:hover:bg-white/5 dark:hover:text-white'}`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            <Link to="/nurotok" className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-emerald-200 px-4 py-2.5 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-50 focus-visible-ring dark:border-emerald-400/25 dark:text-emerald-300 dark:hover:bg-emerald-400/10">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to NuroTok
            </Link>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NuroTokLegalPage;
