"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";

type BlogPost = {
  Title?: string;
  Date?: string;
  Link?: string;
  Excerpt?: string;
};

export default function ClientPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const blogRef = useRef<HTMLDivElement | null>(null);

  // ✅ Safe blog fetch (prevents crashes)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sleephygienics"
        );

        const data = await res.json();

        if (Array.isArray(data.items)) {
          setPosts([...data.items].reverse());
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error("Blog fetch failed:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const scrollToBlog = () => {
    blogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="w-full">
      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center text-white">
        <Image
          src="/hero.jpg"
          alt="Dog with antimicrobial blanket"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Stop Dog Itching, Allergies & Hot Spots — Fast
          </h1>

          <p className="text-lg md:text-xl mb-8">
            Clinical-grade antimicrobial blanket designed to reduce allergens,
            bacteria, and irritation.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#buy"
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
            >
              Shop Now <ArrowRight size={18} />
            </a>

            <button
              onClick={scrollToBlog}
              className="border border-white px-6 py-3 rounded-xl flex items-center gap-2"
            >
              Learn More <ChevronDown size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Dogs Need This
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-xl mb-2">
              Reduces Allergens
            </h3>
            <p>
              Helps minimize exposure to dust mites, dander, and environmental
              triggers.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-2">
              Antimicrobial Protection
            </h3>
            <p>
              Limits bacterial buildup that contributes to itching and hot
              spots.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xl mb-2">
              Clinically Designed
            </h3>
            <p>
              Built using medical-grade textile concepts adapted for pets.
            </p>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section
        ref={blogRef}
        className="bg-gray-100 py-16 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Latest Insights on Dog Allergies
          </h2>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-center">No posts available.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {posts.slice(0, 6).map((post, i) => (
                <a
                  key={`${post.Date}-${i}`}
                  href={post.Link}
                  target="_blank"
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                >
                  <h3 className="font-semibold mb-2">
                    {post.Title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-2">
                    {post.Date
                      ? new Date(post.Date).toLocaleDateString()
                      : ""}
                  </p>

                  <p className="text-sm">
                    {post.Excerpt?.slice(0, 120)}...
                  </p>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        id="buy"
        className="py-20 text-center px-6"
      >
        <h2 className="text-3xl font-bold mb-6">
          Give Your Dog Relief Today
        </h2>

        <p className="mb-8">
          Stop the cycle of itching, irritation, and discomfort.
        </p>

        <a
          href="https://sleephygienicsltd.com"
          className="bg-black text-white px-8 py-4 rounded-xl font-semibold"
        >
          Shop Now
        </a>
      </section>
    </main>
  );
}