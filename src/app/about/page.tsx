"use client";

import { motion } from "framer-motion";
import SiteLayout from "@/components/layout/SiteLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import BoardMemberCard from "@/components/ui/BoardMemberCard";
import { useContent } from "@/lib/content-store";

export default function AboutPage() {
  const { content } = useContent();
  const { about } = content;

  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-primary/5 to-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 sm:text-5xl"
          >
            {about.title}
          </motion.h1>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900">{about.missionTitle}</h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-secondary" />
              <p className="mt-6 leading-relaxed text-gray-600">{about.missionText}</p>

              <h2 className="mt-10 text-2xl font-bold text-gray-900">{about.overviewTitle}</h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-secondary" />
              <p className="mt-6 leading-relaxed text-gray-600">{about.overviewText}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={about.image}
                alt="About Enough Is Enough Foundation"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Board of Directors"
            subtitle="Meet the dedicated leaders guiding our foundation"
          />
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {content.boardMembers.map((member, i) => (
              <BoardMemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
