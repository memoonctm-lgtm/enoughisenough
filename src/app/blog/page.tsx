"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SiteLayout from "@/components/layout/SiteLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogCard from "@/components/ui/BlogCard";
import { useContent } from "@/lib/content-store";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const { content } = useContent();
  const { blog } = content;
  const categories = ["All", ...Array.from(new Set(blog.posts.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blog.posts
      : blog.posts.filter((p) => p.category === activeCategory);

  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-primary/5 to-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 sm:text-5xl"
          >
            {blog.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-gray-600"
          >
            {blog.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all",
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <div key={post.id} id={post.id}>
                <BlogCard post={post} index={i} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-500">No posts found in this category.</p>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
