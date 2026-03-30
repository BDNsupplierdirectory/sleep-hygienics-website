"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Check,
  ChevronDown,
  Star,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* SEO METADATA                                                       */
/* ------------------------------------------------------------------ */
export const metadata = {
  title:
    "Antimicrobial Dog Blanket for Allergies & Itching | Rx Clinical Pet Blanket",
  description:
    "Relieve dog allergies, itching, and hot spots with a clinical-grade antimicrobial pet blanket. Made in the USA and Canada. Ships from Canada.",
  keywords: [
    "dog allergies relief",
    "antimicrobial dog blanket",
    "dog itching solution",
    "hot spots dog treatment",
    "pet health bedding",
  ],
};

/* ------------------------------------------------------------------ */
/* STRIPE LINKS                                                       */
/* ------------------------------------------------------------------ */
const STRIPE_SMALL = "https://buy.stripe.com/cNibJ0b7weL53Hu8Tt2kw01";
const STRIPE_LARGE = "https://buy.stripe.com/9B6dR87VkgTdb9W5Hh2kw02";

/* ------------------------------------------------------------------ */
/* TYPES                                                              */
/* ------------------------------------------------------------------ */
type Post = {
  Date: string;
  Title: string;
  Content: string;
};

/* ------------------------------------------------------------------ */
/* COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-xl mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between w-full px-6 py-4"
      >
        <span className="font-semibold">{title}</span>
        <ChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`${open ? "max-h-[1000px]" : "max-h-0"} overflow-hidden`}>
        <div className="p-6 text-sm text-slate-600">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  /* ---------------- BLOG FETCH ---------------- */
  useEffect(() => {
    fetch(
      "https://opensheet.elk.sh/12XZU9aQ3aIC1pGzL7WnTlun1FmzK_MFQiqzRxAc9hiM/Sheet1"
    )
      .then((res) => res.json())
      .then((data) => setPosts(data.reverse()))
      .catch(() => console.log("Blog fetch error"));
  }, []);

  /* ---------------- SCROLL ---------------- */
  useEffect(() => {
    const handler = () => {
      requestAnimationFrame(() => setScrolled(window.scrollY > 40));
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    pricingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-white text-slate-800">

      {/* ---------------- HEADER ---------------- */}
      <header
        className={`fixed top-0 w-full z-50 transition ${
          scrolled ? "bg-white shadow" : "bg-white/70"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between">
          <Image
            src="/logo.avif"
            alt="Sleep Hygienics Ltd Logo"
            width={140}
            height={40}
            priority={false}
          />
          <button
            onClick={scrollToPricing}
            className="bg-sky-600 text-white px-5 py-2 rounded-lg"
          >
            Buy Now
          </button>
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section className="pt-28 pb-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Antimicrobial Dog Blanket for Allergies, Itching & Hot Spots
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            Made in the USA and Canada. Ships from Canada. Designed to help
            reduce bacteria, odor, and irritation for dogs with sensitive skin.
          </p>

          <button
            onClick={scrollToPricing}
            className="bg-sky-600 text-white px-8 py-4 rounded-xl font-bold"
          >
            Shop Now <ArrowRight className="inline ml-2" />
          </button>
        </div>

        <Image
          src="/hero.jpg"
          alt="Dog with antimicrobial blanket"
          width={600}
          height={600}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </section>

      {/* ---------------- PRICING IMAGE FIX ---------------- */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <Image
          src="/lifestyle.jpg"
          alt="Dog sleeping on antimicrobial blanket"
          width={960}
          height={400}
          sizes="100vw"
          className="rounded-xl shadow"
        />
      </section>

      {/* ---------------- BLOG SECTION ---------------- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Pet Health Insights
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm border"
              >
                <div className="text-xs text-slate-400 mb-2">
                  {post.Date}
                </div>
                <h3 className="font-semibold text-lg mb-3">
                  {post.Title}
                </h3>
                <p className="text-sm text-slate-600 whitespace-pre-wrap">
                  {post.Content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TECH SPECS ---------------- */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Technical Specifications
        </h2>

        <Accordion title="Certifications">
          OEKO-TEX, Bluesign, CPSIA compliant
        </Accordion>

        <Accordion title="Fabric">
          Moisture-wicking, antimicrobial textile
        </Accordion>
      </section>

      {/* ---------------- PRICING ---------------- */}
      <section ref={pricingRef} className="py-20 text-center bg-sky-50">
        <h2 className="text-3xl font-bold mb-6">
          Choose Your Size
        </h2>

        <p className="text-red-500 font-semibold mb-4">
          Only 17 left in stock
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <a href={STRIPE_SMALL} className="bg-white p-8 rounded-xl shadow">
            <h3>Small</h3>
            <p className="text-3xl font-bold">$79.99</p>
          </a>

          <a href={STRIPE_LARGE} className="bg-slate-800 text-white p-8 rounded-xl">
            <h3>Large</h3>
            <p className="text-3xl font-bold">$99.99</p>
          </a>
        </div>

        <p className="mt-6 text-sm">
          30-day money-back guarantee • Ships from Canada
        </p>
      </section>

      {/* ---------------- FOOTER FIX ---------------- */}
      <footer className="py-12 bg-slate-900 text-center">
        <Image
          src="/logo.avif"
          alt="Sleep Hygienics Ltd"
          width={140}
          height={40}
          className="mx-auto mb-4 brightness-0 invert opacity-80"
        />

        <p className="text-white/60 text-sm">
          Made in the USA and Canada • Ships from Canada
        </p>

        <p className="text-white/40 text-xs mt-2">
          © {new Date().getFullYear()} Sleep Hygienics Ltd.
        </p>
      </footer>
    </main>
  );
}
