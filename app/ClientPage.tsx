"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Shield,
  ShieldCheck,
  Check,
  ChevronDown,
  Droplets,
  Thermometer,
  Bug,
  Sparkles,
  Wind,
  Leaf,
  Star,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Live Stripe Payment Link URLs                                      */
/* ------------------------------------------------------------------ */
const STRIPE_SMALL = "https://buy.stripe.com/cNibJ0b7weL53Hu8Tt2kw01";
const STRIPE_LARGE = "https://buy.stripe.com/9B6dR87VkgTdb9W5Hh2kw02";

/* ------------------------------------------------------------------ */
/* TypeScript Definitions                                             */
/* ------------------------------------------------------------------ */
interface BlogPost {
  Date: string;
  Title: string;
  Content: string;
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SectionBadge({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon?: React.ElementType;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">
      {Icon && <Icon size={14} />}
      {children}
    </span>
  );
}

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`border rounded-xl overflow-hidden mb-3 transition-colors ${
        open ? "border-sky-200 bg-sky-50/40" : "border-gray-200 bg-white"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-6 py-5 text-left"
      >
        <span className="flex items-center gap-3 font-semibold text-slate-800">
          <ShieldCheck size={18} className="text-sky-500" />
          {title}
        </span>
        <ChevronDown
          size={18}
          className={`text-sky-500 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Client Page                                                   */
/* ------------------------------------------------------------------ */

export default function ClientPage() {
  const [scrolled, setScrolled] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const pricingRef = useRef<HTMLDivElement>(null);

  // Handle sticky header scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Fetch Google Sheets Blog Data
  useEffect(() => {
    fetch("https://opensheet.elk.sh/12XZU9aQ3aIC1pGzL7WnTlun1FmzK_MFQiqzRxAc9hiM/Sheet1")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data.reverse());
        }
      })
      .catch((err) => console.error("Error fetching sheet:", err));
  }, []);

  const goToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    pricingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const checks = (items: string[]) =>
    items.map((t) => (
      <div
        key={t}
        className="flex items-start gap-2.5 text-sm text-slate-700 leading-snug"
      >
        <Check
          size={16}
          className="text-emerald-500 mt-0.5 shrink-0"
          strokeWidth={3}
        />
        {t}
      </div>
    ));

  return (
    <main className="font-sans text-slate-700 bg-white overflow-x-hidden">
      {/* ============================================================ */}
      {/* STICKY HEADER                                               */}
      {/* ============================================================ */}
      <header
        className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl transition-all ${
          scrolled
            ? "bg-white/90 border-b border-gray-100 py-3"
            : "bg-white/60 py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 no-underline">
            <Image
              src="/logo.avif"
              alt="Sleep Hygienics Ltd. Logo"
              width={150}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </a>
          <a
            href="#pricing"
            onClick={goToPricing}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-200 hover:bg-sky-700 transition no-underline"
          >
            Buy Now
          </a>
        </div>
      </header>

      {/* ============================================================ */}
      {/* HERO                                                        */}
      {/* ============================================================ */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-sky-50 to-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-200 opacity-[0.06] blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-72 h-72 rounded-full bg-sky-300 opacity-[0.05] blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <SectionBadge icon={ShieldCheck}>
              Class 1 Veterinary Medical Device
            </SectionBadge>

            <h1 className="font-serif text-4xl md:text-5xl leading-[1.12] text-slate-800 mb-5">
              Give Your Dog Instant Relief from Itching, Hot&nbsp;Spots, and
              Allergies.
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-slate-500 mb-8 max-w-xl">
              The Rx Clinical Pet Blanket&trade; is a Class&nbsp;1 Veterinary
              Medical Device engineered with silver&#8209;ion technology to
              destroy the bacteria and yeast that cause skin irritation and
              odor.
            </p>

            <a
              href="#pricing"
              onClick={goToPricing}
              className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 px-8 py-4 text-base font-bold text-white shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300 transition-all no-underline"
            >
              Get Relief for Your Dog
              <ArrowRight size={18} />
            </a>

            <div className="flex flex-wrap gap-5 mt-6 text-sm text-slate-500 font-medium">
              {["Made in North America", "Free Shipping", "Vet Approved"].map(
                (t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <Check
                      size={14}
                      className="text-emerald-500"
                      strokeWidth={3}
                    />
                    {t}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-sky-100 bg-sky-50 aspect-square flex items-center justify-center">
              <Image
                src="/hero.jpg"
                alt="Golden Retriever puppy with Rx Clinical Pet Blanket"
                fill
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <ShieldCheck size={20} color="white" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">
                  Veterinarian
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  Approved
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PROBLEM                                                     */}
      {/* ============================================================ */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionBadge icon={Bug}>The Hidden Problem</SectionBadge>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-800 leading-snug mb-4">
              Is standard pet bedding making your dog&rsquo;s skin worse?
            </h2>
            <p className="text-base leading-relaxed text-slate-500">
              Regular dog beds trap moisture, breed bacteria, and harbor
              allergens, creating a toxic cycle of itching and discomfort for
              your dog.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {(
              [
                {
                  icon: Bug,
                  color: "text-red-500",
                  bg: "bg-red-50",
                  title: "Relentless Itching & Hot Spots",
                  desc: "Bacteria in regular fabrics infect micro-tears in your dog\u2019s skin, creating painful hot spots that worsen over time.",
                },
                {
                  icon: Droplets,
                  color: "text-amber-500",
                  bg: "bg-amber-50",
                  title: "Yeast & \u201cFrito\u201d Odor",
                  desc: "Damp beds breed odor-causing microbes that are impossible to wash out, leaving your house smelling like dog.",
                },
                {
                  icon: Thermometer,
                  color: "text-orange-500",
                  bg: "bg-orange-50",
                  title: "Overheating",
                  desc: "Thick, cheap polyester traps heat, causing your dog to pant and pace all night \u2014 disrupting their healing sleep.",
                },
              ] as const
            ).map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-[52px] h-[52px] rounded-[14px] ${item.bg} flex items-center justify-center mb-5`}
                >
                  <item.icon size={24} className={item.color} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SOLUTION                                                    */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <SectionBadge icon={Sparkles}>The Solution</SectionBadge>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-800 leading-snug">
              Clinical-Grade Healing.
              <br />
              Unmatched Comfort.
            </h2>
          </div>

          {/* Block 1: Silver-Ion */}
          <div className="grid md:grid-cols-2 gap-14 items-center mb-20">
            <div>
              <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase tracking-wider mb-4">
                <ShieldCheck size={16} />
                Silver-Ion Antimicrobial
              </div>
              <h3 className="font-serif text-2xl text-slate-800 mb-4 leading-snug">
                Kills Bacteria &amp; Odor on Contact.
              </h3>
              <p className="text-base leading-relaxed text-slate-500 mb-6">
                Powered by sustainable Silver Ion Antimicrobial Technology, it
                physically destroys E.&nbsp;coli, Staph, Salmonella, and the
                bacteria that cause pyoderma and hot spots. Your dog gets a
                sterile healing environment, and your house stops smelling
                like dog.
              </p>
              <div className="space-y-2.5">
                {checks([
                  "Destroys E. coli, Staph & Salmonella",
                  "Eliminates pyoderma-causing bacteria",
                  "Neutralizes odor at the source",
                ])}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg relative">
              <Image
                src="/solution.jpg"
                alt="Silver-Ion technology visualization"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Block 2: Cooling */}
          <div className="grid md:grid-cols-2 gap-14 items-center mb-20">
            <div className="order-2 md:order-1 bg-gradient-to-br from-sky-50 to-sky-100/60 rounded-2xl p-12 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-sky-200 opacity-10" />
              <Wind
                size={56}
                className="text-sky-500 opacity-60 mb-5"
              />
              <div className="font-serif text-5xl text-slate-800 mb-2">
                Cool
              </div>
              <div className="text-sm text-slate-500">
                Dri-Qwick evaporative fiber technology
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase tracking-wider mb-4">
                <Wind size={16} />
                Dri-Qwick Technology
              </div>
              <h3 className="font-serif text-2xl text-slate-800 mb-4 leading-snug">
                Advanced Evaporative Cooling.
              </h3>
              <p className="text-base leading-relaxed text-slate-500">
                Formulated with Dri-Qwick fibers, our proprietary fabric
                pulls sweat and heat away from your dog&rsquo;s body. Even
                in humid conditions, the blanket provides a continuous,
                soothing cooling effect to stop the panting.
              </p>
            </div>
          </div>

          {/* Block 3: Non-Toxic */}
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-4">
                <Leaf size={16} />
                100% Safe
              </div>
              <h3 className="font-serif text-2xl text-slate-800 mb-4 leading-snug">
                100% Non-Toxic &amp; Safe.
              </h3>
              <p className="text-base leading-relaxed text-slate-500 mb-6">
                Zero heavy metals. Zero PFAS forever chemicals. Zero
                phthalates. Our fabric is non-sensitizing, highly
                breathable, and certified by OEKO-TEX&trade; and
                Bluesign&reg; to be perfectly safe against raw, irritated
                skin.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Zero Heavy Metals",
                  "Zero PFAS",
                  "Zero Phthalates",
                  "OEKO-TEX\u2122",
                  "Bluesign\u00ae",
                ].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-semibold"
                  >
                    <Check size={12} strokeWidth={3} />
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-12 text-center relative overflow-hidden">
              <div className="absolute -bottom-5 -left-5 w-36 h-36 rounded-full bg-emerald-200 opacity-10" />
              <Leaf
                size={56}
                className="text-emerald-500 opacity-60 mb-5 mx-auto"
              />
              <div className="font-serif text-5xl text-slate-800 mb-2">
                Pure
              </div>
              <div className="text-sm text-slate-500">
                Certified non-toxic, breathable fabric
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TRUST BANNER                                                */}
      {/* ============================================================ */}
      <section className="py-10 bg-gradient-to-r from-slate-800 to-slate-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:32px_32px]" />
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center flex-wrap gap-10">
          {[
            "Made in North America",
            "OEKO-TEX Certified",
            "Bluesign Approved",
            "EPA Compliant",
            "CPSIA Certified",
          ].map((label, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 text-white/90 text-sm font-semibold"
            >
              <ShieldCheck size={18} className="text-white/50" />
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* PRICING                                                     */}
      {/* ============================================================ */}
      <section
        ref={pricingRef}
        id="pricing"
        className="py-20 bg-sky-50/60 relative overflow-hidden"
      >
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-indigo-200 opacity-[0.04] blur-[100px]" />

        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-lg mx-auto mb-12">
            <SectionBadge icon={Star}>Limited Inventory</SectionBadge>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-800 leading-snug mb-3">
              Choose the Right Size for Your Dog
            </h2>
            <p className="text-base text-slate-500">
              Limited inventory available. Free Shipping included.
            </p>
          </div>

          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg max-w-4xl mx-auto bg-sky-100 aspect-[2.4/1] relative">
           <Image
              src="/lifestyle.jpg"
              alt="Dog sleeping on the Rx Clinical Pet Blanket"
              fill
              className="w-full h-full object-contain"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-7 max-w-3xl mx-auto">
            {/* Small */}
            <div className="bg-white rounded-2xl p-9 border border-gray-100 shadow-sm flex flex-col">
              <div className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">
                Small
              </div>
              <h3 className="font-serif text-2xl text-slate-800 mb-1">
                27&quot; &times; 36&quot;
              </h3>
              <div className="font-serif text-4xl text-slate-800 mb-6">
                $79<span className="text-xl">.99</span>
              </div>
              <div className="space-y-3 mb-8 flex-1">
                {checks([
                  "Perfect for crates, small beds, or travel",
                  "Silver-Ion Antimicrobial Protection",
                  "Lasts 50+ hot washes",
                  "Free Shipping",
                ])}
              </div>
              <a
                href={STRIPE_SMALL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full rounded-xl border-2 border-sky-600 text-sky-600 py-4 text-base font-bold hover:bg-sky-50 transition no-underline"
              >
                Buy Small <ArrowRight size={18} />
              </a>
            </div>

            {/* Large */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-9 relative overflow-hidden flex flex-col">
              <div className="absolute top-5 right-5 bg-white/15 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-[11px] font-bold text-white uppercase tracking-wider">
                Most Popular
              </div>
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-indigo-400 opacity-10" />

              <div className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">
                Large
              </div>
              <h3 className="font-serif text-2xl text-white mb-1">
                36&quot; &times; 56&quot;
              </h3>
              <div className="font-serif text-4xl text-white mb-6">
                $99<span className="text-xl">.99</span>
              </div>
              <div className="space-y-3 mb-8 flex-1">
                {[
                  "Full coverage for large breeds or couches",
                  "Silver-Ion Antimicrobial Protection",
                  "Lasts 50+ hot washes",
                  "Free Shipping",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-start gap-2.5 text-sm text-white/80 leading-snug"
                  >
                    <Check
                      size={16}
                      className="text-emerald-400 mt-0.5 shrink-0"
                      strokeWidth={3}
                    />
                    {t}
                  </div>
                ))}
              </div>
              <a
                href={STRIPE_LARGE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full rounded-xl bg-white text-slate-800 py-4 text-base font-bold shadow-lg hover:shadow-xl transition-shadow no-underline"
              >
                Buy Large <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CLINICAL INSIGHTS (GOOGLE SHEETS BLOG)                       */}
      {/* ============================================================ */}
      <section className="py-20 bg-stone-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionBadge icon={Sparkles}>Latest Updates</SectionBadge>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-800 leading-snug">
              Pet Health Insights
            </h2>
          </div>

          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-sm font-bold text-sky-600 uppercase tracking-widest mb-2">
                    {post.Date}
                  </div>
                  <h3 className="text-xl font-serif text-slate-800 mb-3">
                    {post.Title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {post.Content}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-400">Loading insights...</p>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TECHNICAL SPECS                                             */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionBadge icon={Shield}>Clinical Data</SectionBadge>
            <h2 className="font-serif text-2xl md:text-3xl text-slate-800">
              Technical Specifications
            </h2>
          </div>

          <div className="mb-8 rounded-xl overflow-hidden shadow-sm bg-gray-50 aspect-[2.5/1] relative">
            <Image
              src="/specs.jpg"
              alt="Product specifications and care label"
              fill
              className="w-full h-full object-cover"
            />
          </div>

          <Accordion title="Certifications" defaultOpen>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "CPSIA Certified",
                "EPA Standards Compliant",
                "Prop 65 Compliant",
                "REACH SVHC Compliant",
                "RoHS 10 Compliant",
                "OMMC Value of 5 (Liquid Moisture Mgmt)",
              ].map((c) => (
                <div key={c} className="flex items-center gap-2 text-sm">
                  <ShieldCheck size={14} className="text-sky-500" /> {c}
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title="Fabric Specifications">
            <p className="mb-2">
              <strong className="text-slate-800">Composition:</strong> 65%
              moisture-wicking polyester, 35% nylon
            </p>
            <p className="mb-2">
              <strong className="text-slate-800">Weight:</strong> 135 GSM
              &mdash; lightweight yet durable
            </p>
            <p>
              <strong className="text-slate-800">UV Protection:</strong>{" "}
              UPF 50+ rating
            </p>
          </Accordion>

          <Accordion title="Care Instructions">
            <p className="mb-3">
              Engineered to withstand up to{" "}
              <strong className="text-slate-800">
                50 home laundering cycles
              </strong>{" "}
              at high temperatures.
            </p>
            <div className="space-y-2">
              {checks([
                "Wash on medium heat setting",
                "Wash with like colors only",
                "Tumble dry on medium heat",
                "Silver-ion protection maintained through all 50+ cycles",
              ])}
            </div>
          </Accordion>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FINAL CTA                                                   */}
      {/* ============================================================ */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-indigo-50 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-slate-800 mb-4">
            Your dog deserves clinical-grade comfort.
          </h2>
          <p className="text-base text-slate-500 mb-8">
            Join thousands of pet owners who chose science over suffering.
            Free shipping on every order.
          </p>
          <a
            href="#pricing"
            onClick={goToPricing}
            className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 px-8 py-4 text-base font-bold text-white shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300 transition-all no-underline"
          >
            Get Relief for Your Dog
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER                                                      */}
      {/* ============================================================ */}
      <footer className="py-12 bg-slate-800 text-center text-sm text-white/40">
        <div className="max-w-6xl mx-auto px-6">
          
          <a
            href="mailto:info@sleephygienicsltd.com"
            className="text-white/60 hover:text-white/80 transition inline-block mb-6 text-base font-medium no-underline"
          >
            info@sleephygienicsltd.com
          </a>

          {/* PARTNERS SECTION */}
          <div className="mb-8 border-t border-white/10 pt-6 max-w-md mx-auto">
            <div className="text-white/30 uppercase tracking-widest text-[10px] font-bold mb-3">
              Our Partners
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <a 
                href="https://www.westernallergy.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/80 transition no-underline"
              >
                Western Allergy
              </a>
              <a 
                href="https://www.bdnsupplierdirectory.ca" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/80 transition no-underline"
              >
                BDN Supplier Directory
              </a>
            </div>
          </div>

          <p className="mt-2">
            &copy; {new Date().getFullYear()} Sleep Hygienics Ltd. All
            rights reserved.
          </p>
          <p className="mt-2">
            The Rx Clinical Pet Blanket&trade; is classified as a
            Class&nbsp;1 Veterinary Medical Device.
          </p>
        </div>
      </footer>
    </main>
  );
}
