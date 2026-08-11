"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useContent } from "@/lib/content-store";

export default function Hero() {
  const { content } = useContent();
  const { home } = content;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold text-secondary">
            Faith • Community • Transformation
          </span>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {home.heroHeadline}
          </h1>
          <p className="text-lg leading-relaxed text-gray-600">{home.heroSubheadline}</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button href="/contact" size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button href="/about" variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={home.heroImage}
              alt="Community support and life coaching"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-xl bg-white p-4 shadow-lg sm:-bottom-6 sm:-left-6">
            <p className="text-2xl font-bold text-primary">100+</p>
            <p className="text-sm text-gray-600">Lives Transformed</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
