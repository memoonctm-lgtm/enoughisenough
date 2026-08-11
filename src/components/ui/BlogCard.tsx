"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/content";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-white">
          {post.category}
        </span>
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            {post.author}
          </span>
        </div>
        <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
        <Link
          href={`/blog#${post.id}`}
          className="text-sm font-semibold text-primary hover:underline"
        >
          Read More →
        </Link>
      </div>
    </motion.article>
  );
}
