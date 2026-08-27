import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock3, Facebook, Linkedin, Link2, Mail, Twitter } from 'lucide-react';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';
import { getBlogs } from '@/api/api.js';
import Footer from '@/components/Footer.jsx';
import AffiliationsSection from '@/components/AffiliationsSection.jsx';
import Header from '@/components/Header.jsx';
import { Button } from '@/components/ui/button';
import { canonicalFor } from '@/lib/seo';
import { Input } from '@/components/ui/input';

const fallbackImage = '/images/products/research and insight hub.jpeg';

const normalizeImageUrl = (image) => {
  if (!image) {
    return fallbackImage;
  }

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  return `https://neurodigital.oraclesforce.com/${image.replace(/^\/+/, '')}`;
};

const stripHtml = (value = '') => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const truncateText = (value, maxLength = 110) => {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trimEnd()}...`;
};

const normalizePost = (item) => {
  const minutes = Number(item.Time);
  const plainContent = stripHtml(item.content || '');

  return {
    id: item.id,
    slug: item.slug || item.id,
    title: item.title || 'Untitled article',
    content: item.content || '',
    excerpt: truncateText(plainContent || 'No content available yet.'),
    category: item.category || 'Uncategorized',
    date: item.date || '',
    readTime: `${Number.isFinite(minutes) && minutes > 0 ? minutes : 0} min read`,
    image: normalizeImageUrl(item.image),
    metaTitle: item.meta_title || '',
    metaDescription: item.meta_description || '',
    targetKeyword: item.target_keyword || '',
    secondaryKeywords: item.secondary_keywords || ''
  };
};

const looksLikeHtml = (value = '') => /<\/?[a-z][\s\S]*>/i.test(value);

const ArticleContent = ({ content }) => {
  if (!content || !content.trim()) {
    return <p className="text-base font-medium leading-8 text-[#31544c]">No content available yet.</p>;
  }

  if (looksLikeHtml(content)) {
    const safeHtml = DOMPurify.sanitize(content, { ADD_ATTR: ['target', 'rel'] });

    return (
      <div
        className="prose prose-lg max-w-none text-[#31544c] prose-headings:text-[#0b3b31] prose-a:text-[#0f765a] prose-strong:text-[#0b3b31] prose-img:rounded-[1.2rem]"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    );
  }

  const paragraphs = content.split(/\n{2,}/).filter(Boolean);

  return (
    <div className="space-y-6">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="whitespace-pre-line text-lg font-medium leading-9 text-[#31544c]">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      try {
        setIsLoading(true);
        setError('');

        const data = await getBlogs();

        if (!isMounted) {
          return;
        }

        setPosts(data.map(normalizePost));
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError(loadError.message || 'We could not load this article right now.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  const post = useMemo(() => posts.find((item) => String(item.slug) === String(slug)) || null, [posts, slug]);

  const relatedPosts = useMemo(() => {
    if (!post) {
      return [];
    }

    return posts
      .filter((item) => item.id !== post.id && item.category === post.category)
      .slice(0, 3)
      .concat(posts.filter((item) => item.id !== post.id && item.category !== post.category))
      .slice(0, 3);
  }, [posts, post]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard.');
    } catch {
      toast.error('We could not copy the link right now.');
    }
  };

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address.');
      return;
    }

    toast.success('Thanks for joining our community.');
    setEmail('');
  };

  const pageTitle = post ? (post.metaTitle || `${post.title} | NeuroDigital Support Blog`) : 'NeuroDigital Support Blog';
  const pageDescription = post ? (post.metaDescription || post.excerpt || '') : '';
  const pageKeywords = post ? [post.targetKeyword, post.secondaryKeywords].filter(Boolean).join(', ') : '';
  const socialImage = post?.image || canonicalFor('/logo.png');

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalFor(`/blogs/${slug}`)} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalFor(`/blogs/${slug}`)} />
        <meta property="og:image" content={socialImage} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={socialImage} />
      </Helmet>

      <Header />

      <main className="theme-aware-page min-h-screen overflow-hidden bg-[#fbfffd] text-[#102f28]">
        {isLoading ? (
          <section className="border-b border-[#e2f0ea] bg-[linear-gradient(180deg,#fbfffd_0%,#f1faf6_100%)] py-24">
            <div className="mx-auto max-w-[820px] px-5 text-center sm:px-8 lg:px-10">
              <p className="text-base font-semibold text-[#31544c]">Loading article...</p>
            </div>
          </section>
        ) : error || !post ? (
          <section className="border-b border-[#e2f0ea] bg-[linear-gradient(180deg,#fbfffd_0%,#f1faf6_100%)] py-24">
            <div className="mx-auto max-w-[820px] px-5 text-center sm:px-8 lg:px-10">
              <div className="rounded-[1.5rem] border border-[#f1d5d5] bg-[#fff8f8] p-8">
                <p className="text-base font-semibold text-[#8a2f2f]">{error || 'This article could not be found.'}</p>
              </div>
              <Button asChild className="mt-6 rounded-full bg-[#0b5f49] px-6 text-sm font-semibold text-white hover:bg-[#084d3c]">
                <Link to="/blogs">
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </section>
        ) : (
          <>
            <section className="relative border-b border-[#e2f0ea] bg-[linear-gradient(180deg,#fbfffd_0%,#f1faf6_100%)] pb-0 pt-14 sm:pt-20">
              <div className="relative mx-auto max-w-[860px] px-5 sm:px-8 lg:px-10">
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-[#d7e6e0] bg-white/85 px-5 text-sm font-semibold text-[#163d34] shadow-none backdrop-blur hover:bg-white hover:text-[#0b5f49]"
                  >
                    <Link to="/blogs">
                      <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                      Back to Blog
                    </Link>
                  </Button>

                  <span className="inline-flex items-center gap-2 rounded-full border border-[#a8d4c3] bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#0f765a] shadow-[0_10px_28px_rgba(15,61,50,0.06)]">
                    {post.category}
                  </span>
                </div>

                <h1 className="mt-8 text-balance text-3xl font-semibold leading-[1.15] tracking-normal text-[#0b3b31] sm:text-4xl lg:text-[3.2rem] lg:leading-[1.1]">
                  {post.title}
                </h1>

                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#e2f0ea] pb-8 pt-6 text-sm font-semibold text-[#536b64]">
                  {post.date ? (
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#0f765a]" aria-hidden="true" />
                      {post.date}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-[#0f765a]" aria-hidden="true" />
                    {post.readTime}
                  </span>

                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#7a8f88]">Share</span>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#dcece6] bg-white text-[#31544c] transition-colors hover:border-[#a8d4c3] hover:text-[#0f765a]"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#dcece6] bg-white text-[#31544c] transition-colors hover:border-[#a8d4c3] hover:text-[#0f765a]"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#dcece6] bg-white text-[#31544c] transition-colors hover:border-[#a8d4c3] hover:text-[#0f765a]"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#dcece6] bg-white text-[#31544c] transition-colors hover:border-[#a8d4c3] hover:text-[#0f765a]"
                      aria-label="Copy link"
                    >
                      <Link2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mx-auto max-w-[1040px] px-5 pb-14 sm:px-8 lg:px-10">
                <div className="overflow-hidden rounded-[1.75rem] border border-[#dcece6] bg-[#edf8f3] shadow-[0_30px_90px_rgba(15,61,50,0.12)]">
                  <img src={post.image} alt="" className="aspect-[2.1/1] w-full object-cover" />
                </div>
              </div>
            </section>

            <section className="bg-white py-14 sm:py-20">
              <div className="mx-auto grid max-w-[1040px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_260px] lg:px-10">
                <article className="max-w-[720px]">
                  <ArticleContent content={post.content} />

                  {post.secondaryKeywords ? (
                    <div className="mt-8 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#7a8f88]">Related topics</span>
                      {post.secondaryKeywords
                        .split(',')
                        .map((keyword) => keyword.trim())
                        .filter(Boolean)
                        .map((keyword) => (
                          <span
                            key={keyword}
                            className="rounded-full border border-[#dcece6] bg-[#f1faf6] px-3 py-1 text-xs font-semibold text-[#0b5f49]"
                          >
                            {keyword}
                          </span>
                        ))}
                    </div>
                  ) : null}

                  <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-[1.4rem] border border-[#dcece6] bg-[#fbfffd] p-6">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest text-[#0f765a]">Written by</p>
                      <p className="mt-2 text-lg font-semibold text-[#0b3b31]">NeuroDigital Support Editorial Team</p>
                    </div>
                    <Button asChild variant="outline" className="rounded-full border-[#9fd0bd] bg-white px-5 text-sm font-semibold text-[#0b5f49] shadow-none hover:bg-[#f1faf6] hover:text-[#0b5f49]">
                      <Link to="/contact">
                        Contact Us
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </article>

                <aside className="lg:sticky lg:top-24 lg:h-fit">
                  {relatedPosts.length > 0 ? (
                    <div className="rounded-[1.4rem] border border-[#eef2f0] bg-white p-6 shadow-[0_18px_50px_rgba(15,61,50,0.05)]">
                      <h3 className="text-base font-bold text-[#102f28]">Popular post</h3>
                      <div className="mt-5 space-y-5">
                        {relatedPosts.map((related) => (
                          <Link
                            key={related.id}
                            to={`/blogs/${related.slug}`}
                            className="group flex items-center gap-3"
                          >
                            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#edf8f3]">
                              <img src={related.image} alt="" className="h-full w-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="line-clamp-2 text-sm font-bold leading-snug text-[#102f28] transition-colors group-hover:text-[#0b5f49]">
                                {related.title}
                              </p>
                              {related.date ? (
                                <p className="mt-1 text-xs font-medium text-[#8a9c96]">{related.date}</p>
                              ) : null}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-6 rounded-[1.4rem] border border-[#d6eee5] bg-[linear-gradient(135deg,#e8f8f2_0%,#f9fffc_60%,#dff5ec_100%)] p-6 shadow-[0_18px_50px_rgba(15,61,50,0.08)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[#0f765a] shadow-sm">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold leading-tight text-[#0b3b31]">Join our community</h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-[#536b64]">
                      Get research and digital safety tips delivered to your inbox.
                    </p>
                    <form onSubmit={handleSubscribe} className="mt-4 grid gap-2">
                      <Input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        aria-label="Email address"
                        placeholder="Enter your email"
                        className="h-11 rounded-full border-[#d7e6e0] bg-white px-4 text-sm font-medium shadow-none focus-visible:ring-[#167158]"
                      />
                      <Button type="submit" className="h-11 rounded-full bg-[#0b5f49] text-sm font-semibold text-white shadow-[0_14px_32px_rgba(11,95,73,0.2)] hover:bg-[#084d3c]">
                        Subscribe
                      </Button>
                    </form>
                  </div>
                </aside>
              </div>
            </section>
          </>
        )}
      </main>

      <AffiliationsSection />
      <Footer />
    </>
  );
};

export default BlogDetailPage;
