"use client";

import { motion } from "framer-motion";
import SiteLayout from "@/components/layout/SiteLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import { useContent } from "@/lib/content-store";
import { Info } from "lucide-react";

export default function ServicesPage() {
  const { content } = useContent();
  const { services } = content;

  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-primary/5 to-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 sm:text-5xl"
          >
            {services.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-gray-600"
          >
            {services.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.items.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 flex items-start gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6"
          >
            <Info className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold text-gray-900">Pricing Information</h3>
              <p className="mt-1 text-gray-600">{services.pricingNote}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  );
}
