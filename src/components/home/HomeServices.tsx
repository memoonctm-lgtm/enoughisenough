"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import Button from "@/components/ui/Button";
import { useContent } from "@/lib/content-store";
import { ArrowRight } from "lucide-react";

export default function HomeServices() {
  const { content } = useContent();
  const services = content.services.items.slice(0, 3);

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Programs"
          subtitle="Discover transformative programs designed to empower and elevate"
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/services" variant="outline" size="lg">
            View All Programs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
