"use client";

import { motion } from "framer-motion";
import { Heart, Users, Target } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/lib/content-store";

const features = [
  { icon: Heart, title: "Faith-Based", desc: "Rooted in God's truth and love" },
  { icon: Users, title: "Community", desc: "Supportive network of mentors" },
  { icon: Target, title: "Accountability", desc: "Commitment to your growth" },
];

export default function Mission() {
  const { content } = useContent();

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Mission"
          subtitle={content.home.missionStatement}
        />

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center transition-shadow hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
