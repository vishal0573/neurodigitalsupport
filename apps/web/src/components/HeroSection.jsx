import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Download,
  Brain,
  Shield,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibility.jsx";

const slides = [
  {
    image: "/images/products/homepage.jpeg",
    imagePosition: "center 42%",
    mobilePosition: "center center",
    title: "Technology Designed Around Human Sensory Needs",
    text: "A premium digital ecosystem built to support autistic and neurodivergent adults across the UK",
  },
  {
    image: "/images/products/2image.jpeg",
    imagePosition: "center 48%",
    mobilePosition: "center center",
    title: (
      <>
        Through calming tools, safer online spaces, research intelligence, and
        inclusive support <br className="hidden sm:block" /> systems
      </>
    ),
    text: "",
  },
  {
    image: "/images/products/3image.jpeg",
    imagePosition: "center center",
    mobilePosition: "center center",
    title:
      "We believe technology should adapt to people, not the other way around",
    text: "",
  },
];

const HeroSection = () => {
  const { reducedMotion } = useAccessibility();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback((index) => {
    setActiveSlide((index + slides.length) % slides.length);
  }, []);

  const goToPrevious = useCallback(() => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  }, []);

  const goToNext = useCallback(() => {
    setActiveSlide((current) => (current + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (reducedMotion || isPaused) return undefined;

    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [reducedMotion, isPaused]);

  const currentSlide = slides[activeSlide];

  return (
    <section
      className="relative min-h-[41rem] overflow-hidden transition-colors duration-300 sm:min-h-[calc(100svh-4rem)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide.image}
          className="hero-slide-bg absolute inset-0 z-0 hidden h-full w-full bg-no-repeat bg-center bg-cover sm:block sm:bg-center sm:bg-cover sm:brightness-[0.84] sm:grayscale-[8%] sm:saturate-[0.9] sm:contrast-[0.98]"
          style={{
            backgroundImage: `url('${currentSlide.image}')`,
            "--hero-bg-position": currentSlide.imagePosition,
            "--hero-mobile-bg-position": currentSlide.mobilePosition,
          }}
          aria-hidden="true"
          {...(reducedMotion
            ? {}
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration: 0.9, ease: "easeInOut" },
              })}
        />
      </AnimatePresence>

      <div className="absolute inset-x-0 top-0 z-0 h-[22rem] overflow-hidden sm:hidden" aria-hidden="true">
        <img
          src={currentSlide.image}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: currentSlide.mobilePosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/95" />
      </div>

      <div className="absolute inset-0 z-0 bg-transparent sm:bg-slate-950/62" aria-hidden="true" />

      {/* Subtle neutral grid for depth without green cast */}
      <div
        className="absolute inset-0 z-0 hidden pointer-events-none opacity-10 sm:block"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 container mx-auto flex min-h-[41rem] items-end justify-center px-0 pb-0 pt-10 sm:min-h-[calc(100svh-4rem)] sm:items-center sm:px-6 sm:py-16 lg:px-8">
        <div className="flex w-full items-center justify-center">
          {/* LEFT — Text content */}
          <motion.div
            className="mx-auto flex w-full max-w-none flex-col items-center justify-center bg-slate-950 px-5 py-4 text-center sm:max-w-4xl sm:bg-transparent sm:px-0 sm:py-0 sm:space-y-8"
            {...(reducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, ease: "easeOut" },
                })}
          >
            {/* Main Content Grouping */}
            <div className="w-full sm:space-y-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  className="mx-auto flex w-full max-w-[19rem] flex-col justify-start space-y-3 sm:max-w-none sm:space-y-7"
                  {...(reducedMotion
                    ? {}
                    : {
                        initial: { opacity: 0, y: 12 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -12 },
                        transition: { duration: 0.45, ease: "easeOut" },
                      })}
                >
                  {currentSlide.title ? (
                    <>
                      <h1 className="mx-auto max-w-[19rem] text-center text-[1.45rem] font-extrabold leading-[1.06] tracking-tight text-white sm:max-w-4xl sm:text-4xl sm:leading-[1.15] lg:text-5xl">
                        {currentSlide.title}
                      </h1>

                      {currentSlide.text ? (
                        <p className="mx-auto max-w-3xl text-center text-xs font-semibold leading-5 text-white/90 sm:text-base sm:leading-relaxed">
                          {currentSlide.text}
                        </p>
                      ) : null}
                    </>
                  ) : currentSlide.text ? (
                    <p className="mx-auto max-w-[19rem] text-[1.45rem] font-extrabold leading-[1.12] tracking-tight text-white sm:max-w-4xl sm:text-3xl sm:leading-[1.18] lg:text-5xl">
                      {currentSlide.text}
                    </p>
                  ) : null}
                </motion.div>
              </AnimatePresence>

              {/* Supporting text — Professional callout style */}
            </div>

            {/* CTA Buttons - Sized down to fit on one line */}
            <motion.div
              className="hidden"
              {...(reducedMotion
                ? {}
                : {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 0.5, delay: 0.2 },
                  })}
            >
              <Button
                size="sm"
                className="inline-flex h-9 min-w-[14rem] items-center justify-center gap-1.5 rounded-full bg-[#34967C] px-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#2a7a65] hover:shadow-lg hover:shadow-emerald-900/35 active:scale-[0.98] sm:h-10 sm:min-w-0 sm:px-5"
              >
                Explore Our Ecosystem
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" aria-hidden="true" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="inline-flex h-9 min-w-[12.5rem] items-center justify-center gap-1.5 rounded-full border-white/30 bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/18 hover:text-white active:scale-[0.98] sm:h-10 sm:min-w-0 sm:px-5"
              >
                <Download className="w-3.5 h-3.5 mr-0.5" aria-hidden="true" />
                Download NuroTok
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="inline-flex h-9 min-w-[12.5rem] items-center justify-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/18 hover:text-white active:scale-[0.98] sm:h-10 sm:min-w-0 sm:px-5"
              >
                <Calendar className="w-3.5 h-3.5 mr-0.5" aria-hidden="true" />
                Book a Demo
              </Button>
            </motion.div>

            <div
              className="mt-3 flex items-center justify-center gap-2 sm:mt-0 sm:pt-1"
              aria-label="Hero slides"
              data-focus-distraction
            >
              {slides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                    activeSlide === index
                      ? "w-8 bg-white"
                      : "w-2 bg-white/45 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={activeSlide === index ? "true" : undefined}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            {/* Trust strip */}
            <motion.div
              className="mt-3 flex max-w-[19rem] flex-wrap items-center justify-center gap-x-3 gap-y-1.5 border-t border-white/20 pt-3 sm:mt-0 sm:max-w-none sm:gap-x-5 sm:gap-y-2 sm:pt-6"
              data-focus-distraction
              {...(reducedMotion
                ? {}
                : {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 0.6, delay: 0.4 },
                  })}
            >
              {[
                "Care Providers",
                "Universities",
                "Employers",
                "Public Sector",
              ].map((label) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-[0.7rem] font-semibold text-white/90 sm:text-sm"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Glassmorphism Visual Card Cluster (Desktop only) */}
          <div className="hidden">
            {/* Main Premium Card */}
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden bg-background/60 backdrop-blur-xl border border-border shadow-2xl">
              {/* Card header bar */}
              <div className="px-6 py-4 flex items-center justify-between bg-muted/40 border-b border-border/50">
                <span className="text-sm font-semibold tracking-wide text-primary">
                  NeuroDigital Hub
                </span>
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400/80 shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/80 shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-green-400/80 shadow-sm" />
                </div>
              </div>

              {/* Mini stats row - Glass styling  jojo ji */}
              <div className="mx-6 my-6 rounded-2xl px-5 py-4 grid grid-cols-3 divide-x divide-border/50 bg-muted/30 backdrop-blur-md border border-border/40">
                {[
                  { label: "Sensory Tools", value: "7+" },
                  { label: "Care Partners", value: "100+" },
                  { label: "Wellbeing", value: "↑ 94%" },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center px-2">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      {label}
                    </p>
                    <p className="text-lg font-extrabold text-foreground">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge: NuroTok (top-left) */}
            <motion.div
              className="absolute -top-4 -left-8 rounded-2xl px-4 py-3 flex items-center gap-3 bg-background/90 backdrop-blur-xl border border-border shadow-xl"
              {...(reducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 15 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.5, delay: 0.5 },
                  })}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
                <Brain className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground leading-none mb-1">
                  NuroTok
                </p>
                <p className="text-[11px] font-medium text-muted-foreground leading-none">
                  Sensory regulation
                </p>
              </div>
            </motion.div>

            {/* Floating badge: AltiTok (bottom-right) */}
            <motion.div
              className="absolute -bottom-4 -right-8 rounded-2xl px-4 py-3 flex items-center gap-3 bg-background/90 backdrop-blur-xl border border-border shadow-xl"
              {...(reducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 15 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.5, delay: 0.65 },
                  })}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-500/10 text-purple-500">
                <Shield className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground leading-none mb-1">
                  AltiTok
                </p>
                <p className="text-[11px] font-medium text-muted-foreground leading-none">
                  Safe social platform
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* <button
        type="button"
        className="absolute left-2 sm:left-6 top-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/18 hover:border-white/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        aria-label="Previous hero slide"
        data-focus-distraction
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        type="button"
        className="absolute right-2 sm:right-6 top-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/18 hover:border-white/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        aria-label="Next hero slide"
        data-focus-distraction
        onClick={goToNext}
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button> */}
    </section>
  );
};

export default HeroSection;
