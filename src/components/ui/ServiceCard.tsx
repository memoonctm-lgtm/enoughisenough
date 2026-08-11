"use client";

import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  HeartHandshake,
  Link,
  Sparkles,
  Home,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  "book-open": BookOpen,
  "heart-handshake": HeartHandshake,
  link: Link,
  sparkles: Sparkles,
  home: Home,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Users;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
        <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-lg font-bold text-gray-900">{service.title}</h3>
        <p className="text-sm leading-relaxed text-gray-600">{service.description}</p>
      </div>
    </motion.div>
  );
}
