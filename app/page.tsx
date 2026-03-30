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
/* SEO METADATA (APP ROUTER)                                          */
/* ------------------------------------------------------------------ */
export const metadata = {
  title:
    "Antimicrobial Dog Blanket for Allergies & Itching | Rx Clinical Pet Blanket",
  description:
    "Relieve dog allergies, itching, and hot spots with a clinical-grade antimicrobial pet blanket. Designed to reduce bacteria, odor, and irritation. Vet-approved. Free shipping.",
  keywords: [
    "dog allergies relief",
    "antimicrobial dog blanket",
    "dog itching solution",
    "hot spots dog treatment",
    "pet bedding allergies",
  ],
  openGraph: {
    title:
      "Antimicrobial Dog Blanket for Allergies & Itching | Rx Clinical Pet Blanket",
    description:
      "Reduce itching, odor, and bacteria with a clinical-grade antimicrobial pet blanket.",
    url: "https://yourdomain.com",
    siteName: "Sleep Hygienics Ltd.",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Dog with antimicrobial blanket",
      },
    ],
    type: "website",
  },
};

/* ------------------------------------------------------------------ */
/* STRIPE LINKS                                                       */
/* ------------------------------------------------------------------ */
const STRIPE_SMALL = "https://buy.stripe.com/cNibJ0b7weL53Hu8Tt2kw01";
const STRIPE_LARGE = "https://buy.stripe.com/9B6dR87VkgTdb9W5Hh2kw02";

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
        <ChevronDown
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`transition-all overflow-hidden ${
          open ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="p-6 text-sm text-slate-600">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

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

      {/* ------------------------------------------------------------------ */}
      {/* STRUCTURED DATA (PRODUCT SCHEMA)                                   */}
      {/* ------------------------------------------------------------------ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: "Rx Clinical Pet Blanket",
            image: "/hero.jpg",
            description:
              "Antimicrobial pet blanket designed to reduce bacteria, odor, and irritation for dogs with allergies.",
            brand: {
              "@type": "Brand",
              name: "Sleep Hygienics Ltd.",
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: "79.99",
              availability: "https://schema.org/InStock",
              url: "https://yourdomain.com",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "124",
            },
          }),
        }}
      />

      {/* HEADER */}
      <header
        className={`fixed top-0 w-full z-50 transition ${
          scrolled ? "bg-white shadow" : "bg-white/70"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between">
          <Image
            src="/logo.avif"
            alt="Sleep Hygienics"
            width={140}
            height={40}
          />
          <button
            onClick={scrollToPricing}
            className="bg-sky-600 text-white px-5 py-2 rounded-lg"
          >
            Buy Now
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-28 pb-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Antimicrobial Dog Blanket for Allergies, Itching & Hot Spots
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            Designed to help reduce bacteria, odor, and irritation —
            giving your dog a cleaner, more comfortable recovery space.
          </p>

          <button
            onClick={scrollToPricing}
            className="bg-sky-600 text-white px-8 py-4 rounded-xl font-bold"
          >
            Shop Now <ArrowRight className="inline ml-2" />
          </button>

          <div className="mt-6 text-sm text-slate-500">
            ⭐ 4.8/5 from 120+ pet owners
          </div>
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

      {/* SOCIAL PROOF */}
      <section className="bg-slate-50 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-6">
          Trusted by Pet Owners
        </h2>
        <p className="max-w-xl mx-auto text-slate-600">
          “Within days, our dog stopped scratching constantly. This
          blanket made a noticeable difference.”
        </p>
      </section>

      {/* FEATURES */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Why This Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Helps reduce bacteria & odor",
            "Cooling, breathable fabric",
            "Safe, non-toxic materials",
          ].map((f, i) => (
            <div key={`${f}-${i}`} className="border p-6 rounded-xl">
              <Check className="text-green-500 mb-3" />
              {f}
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section ref={pricingRef} className="py-20 bg-sky-50 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Choose Your Size
        </h2>

        <p className="mb-6 text-red-500 font-semibold">
          Only 17 left in stock
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <a
            href={STRIPE_SMALL}
            className="bg-white p-8 rounded-xl shadow"
          >
            <h3 className="text-xl mb-2">Small</h3>
            <p className="text-3xl font-bold">$79.99</p>
          </a>

          <a
            href={STRIPE_LARGE}
            className="bg-slate-800 text-white p-8 rounded-xl"
          >
            <h3 className="text-xl mb-2">Large</h3>
            <p className="text-3xl font-bold">$99.99</p>
          </a>
        </div>

        <p className="mt-6 text-sm text-slate-600">
          30-day money-back guarantee
        </p>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          FAQs
        </h2>

        <Accordion title="Is it safe for sensitive skin?">
          Yes — materials are non-toxic and designed for sensitive dogs.
        </Accordion>

        <Accordion title="How long does it last?">
          Tested for 50+ washes.
        </Accordion>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Sleep Hygienics Ltd.
      </footer>
    </main>
  );
}
