"use client";

import { motion } from "framer-motion";
import type { BoardMember } from "@/types/content";

interface BoardMemberCardProps {
  member: BoardMember;
  index: number;
}

export default function BoardMemberCard({ member, index }: BoardMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="p-5 text-center">
        <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
        <p className="mt-1 text-sm font-medium text-secondary">{member.title}</p>
        {member.bio && (
          <p className="mt-2 text-xs leading-relaxed text-gray-500">{member.bio}</p>
        )}
      </div>
    </motion.div>
  );
}
