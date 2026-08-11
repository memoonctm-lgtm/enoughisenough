"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import SiteLayout from "@/components/layout/SiteLayout";
import { useContent } from "@/lib/content-store";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const { content } = useContent();
  const post = content.blog.posts.find((p) => p.id === params.id);

  if (!post) {
    return (
      <SiteLayout>
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
          <h1 className="font-display text-2xl font-bold">Article Not Found</h1>
          <button
            type="button"
            onClick={() => router.push("/blog")}
            className="mt-4 text-primary hover:underline"
          >
            ← Back to Blog
          </button>
        </div>
      </SiteLayout>
    );
  }

  const related = content.blog.posts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <SiteLayout>
      <article>
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-white">
                  {post.category}
                </span>
                <h1 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  {post.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" /> {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4" /> {post.author}
                  </span>
                  {post.readTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" /> {post.readTime}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <div className="prose-content">
            <p className="text-xl leading-relaxed text-gray-600">{post.excerpt}</p>
            <div className="mt-8 space-y-4 text-gray-700">
              <p>{post.content}</p>
              <p>
                At the Enough Is Enough Foundation, we believe that transformation is a journey — not a destination.
                Through faith, accountability, and community support, every individual has the power to overcome obstacles
                and walk confidently into their God-given destiny.
              </p>
              <p>
                If this story resonates with you, we invite you to reach out and discover how our programs can support
                your own journey. Contact us today at {content.contact.phone} or visit our contact page to get started.
              </p>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16 border-t border-gray-100 pt-12">
              <h3 className="font-display text-xl font-bold text-gray-900">Related Articles</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/blog/${r.id}`}
                    className="group overflow-hidden rounded-xl border border-gray-100 transition-shadow hover:shadow-md"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.image} alt={r.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-primary">{r.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </SiteLayout>
  );
}
