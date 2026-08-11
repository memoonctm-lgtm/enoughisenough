"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { useContent } from "@/lib/content-store";

const highlights = [
  "Follow-through on life commitments",
  "Personal accountability coaching",
  "Faith-centered guidance",
  "Celebrating your progress",
];

export default function LifeCoaching() {
  const { content } = useContent();
  const { home } = content;

  return (
    <section className="bg-gradient-to-br from-primary to-primary/90 py-16 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-md lg:max-w-none"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={home.lifeCoachImage}
                alt={home.lifeCoachName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 shadow-lg">
              <Award className="h-5 w-5" />
              <span className="text-sm font-semibold">Certified Life Coach</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">
              Meet Your Coach
            </span>
            <h2 className="text-3xl font-bold sm:text-4xl">{home.lifeCoachName}</h2>
            <p className="text-lg font-medium text-white/80">{home.lifeCoachTitle}</p>
            <p className="leading-relaxed text-white/90">{home.lifeCoachBio}</p>

            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-secondary" />
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>

            <Button href="/contact" variant="secondary" size="lg">
              Schedule a Session
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
