"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Ready to Walk Into Your Destiny?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Take the first step today. Our team is here to lift you up, celebrate you, and guide you
          through whatever obstacles you face.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/contact" size="lg">
            Contact Us Today
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button href="/services" variant="outline" size="lg">
            Explore Our Programs
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
