"use client";

import { motion } from "framer-motion";
import SiteLayout from "@/components/layout/SiteLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import BoardMemberCard from "@/components/ui/BoardMemberCard";
import { useContent } from "@/lib/content-store";

export default function BoardPage() {
  const { content } = useContent();

  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-primary/5 to-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 sm:text-5xl"
          >
            Board of Directors
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-gray-600"
          >
            Meet the dedicated leaders who guide the Enough Is Enough Foundation with vision,
            compassion, and commitment to community transformation.
          </motion.p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Leadership Team"
            subtitle="Passionate individuals committed to lifting others up"
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
