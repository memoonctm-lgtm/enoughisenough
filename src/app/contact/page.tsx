"use client";

import { motion } from "framer-motion";
import SiteLayout from "@/components/layout/SiteLayout";
import ContactForm from "@/components/ui/ContactForm";
import { useContent } from "@/lib/content-store";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

export default function ContactPage() {
  const { content } = useContent();
  const { contact } = content;

  const infoItems = [
    { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\D/g, "")}` },
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Clock, label: "Hours", value: contact.hours },
    { icon: MapPin, label: "Location", value: "Serving communities nationwide" },
  ];

  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-primary/5 to-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 sm:text-5xl"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-gray-600"
          >
            We&apos;re here to lift you up. Reach out today and take the first step toward your destiny.
          </motion.p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900">Get In Touch</h2>
              <p className="text-gray-600">
                Have questions about our programs or need support? Fill out the form and our team
                will respond promptly during business hours.
              </p>

              <div className="space-y-4">
                {infoItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} className="font-medium text-gray-900 hover:text-primary">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-gray-900">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 rounded-2xl border border-gray-100 bg-white p-8 shadow-lg"
            >
              <h2 className="mb-6 text-xl font-bold text-gray-900">Send Us a Message</h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
