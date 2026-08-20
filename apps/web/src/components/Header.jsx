import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Eye, Menu, Moon, Sun } from "lucide-react";
import AccessibilityWidget from "@/components/AccessibilityWidget.jsx";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAccessibility } from "@/hooks/useAccessibility.jsx";
const logoSrc = "/logo.jpeg";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    darkMode,
    focusMode,
    highContrast,
    toggleDarkMode,
    toggleFocusMode,
    toggleHighContrast,
  } = useAccessibility();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Research", path: "/research" },
    { name: "Blogs", path: "/blogs" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const featurePaths = [
    "/features",
    "/nurotok",
    "/altitok",
    "/olitok",
    "/care-logging",
    "/digital-advocacy-hub",
    "/research-insights-hub",
    "/social-listening-dashboard",
  ];

  const isActive = (path) =>
    path === "/features"
      ? featurePaths.includes(location.pathname)
      : location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm shadow-slate-950/5 backdrop-blur supports-[backdrop-filter]:bg-background/75 dark:shadow-none">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex h-[4.4rem] items-center justify-between gap-2 sm:h-16">
          <Link
            to="/"
            className="relative flex h-12 min-w-0 items-center overflow-hidden focus-visible-ring rounded-md sm:-ml-4 sm:h-14 sm:w-auto sm:flex-none lg:ml-16"
            aria-label="NeuroDigital Support home"
          >
            <img
              src={logoSrc}
              alt="NeuroDigital Support"
              className="h-full w-auto object-contain"
            />
          </Link>

          <nav
            className="hidden xl:flex items-center space-x-1"
            aria-label="Main navigation"
            data-focus-distraction
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 focus-visible-ring ${
                  isActive(link.path)
                    ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200"
                    : "text-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div
            className="hidden shrink-0 items-center gap-2 rounded-2xl border border-emerald-100 bg-white/86 px-3 py-2 shadow-[0_10px_28px_rgba(15,61,50,0.08)] backdrop-blur-xl dark:border-emerald-400/20 dark:bg-white/10 lg:flex"
            data-focus-keep
          >
            <div className="flex items-center gap-2" title="Light / dark mode">
              <Sun
                className="h-4 w-4 text-slate-500 dark:text-slate-300"
                aria-hidden="true"
              />
              <Switch
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
                aria-label="Toggle dark mode"
                className="data-[state=checked]:bg-[#34967C] data-[state=unchecked]:bg-slate-200"
              />
              <Moon
                className="h-4 w-4 text-slate-500 dark:text-slate-300"
                aria-hidden="true"
              />
            </div>

            <div
              className="mx-1 h-6 w-px bg-emerald-100 dark:bg-white/15"
              aria-hidden="true"
            />

            <div className="flex items-center gap-2" title="Focus mode">
              <Eye
                className="h-4 w-4 text-slate-500 dark:text-slate-300"
                aria-hidden="true"
              />
              <Switch
                checked={focusMode}
                onCheckedChange={toggleFocusMode}
                aria-label="Toggle focus mode"
                className="data-[state=checked]:bg-[#34967C] data-[state=unchecked]:bg-slate-200"
              />
            </div>
          </div>

          <div className="hidden shrink-0 items-center sm:flex" data-focus-distraction>
            <AccessibilityWidget />
          </div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="xl:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-2xl"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav
                className="flex flex-col space-y-4 mt-8"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2 text-base font-medium rounded-md transition-all duration-200 focus-visible-ring ${
                      isActive(link.path)
                        ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200"
                        : "text-foreground hover:text-primary hover:bg-muted"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 space-y-4 border-t pt-6">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-800/40 dark:bg-emerald-950/25">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-sm font-medium">
                      <Sun className="h-4 w-4" aria-hidden="true" />
                      Light / dark
                      <Moon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <Switch
                      checked={darkMode}
                      onCheckedChange={toggleDarkMode}
                      aria-label="Toggle dark mode"
                      className="data-[state=checked]:bg-[#34967C]"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-sm font-medium">
                      <Eye className="h-4 w-4" aria-hidden="true" />
                      Focus mode
                    </span>
                    <Switch
                      checked={focusMode}
                      onCheckedChange={toggleFocusMode}
                      aria-label="Toggle focus mode"
                      className="data-[state=checked]:bg-[#34967C]"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Accessibility menu
                  </span>
                  <AccessibilityWidget />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">High contrast</span>
                  <Switch
                    checked={highContrast}
                    onCheckedChange={toggleHighContrast}
                    aria-label="Toggle high contrast"
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
