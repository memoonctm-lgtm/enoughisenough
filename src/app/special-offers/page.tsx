"use client";

import { motion } from "framer-motion";
import SiteLayout from "@/components/layout/SiteLayout";
import Button from "@/components/ui/Button";
import { useContent } from "@/lib/content-store";
import { Download, FileText, CheckCircle } from "lucide-react";

const formFields = [
  "Full Legal Name",
  "Current Address",
  "Phone Number",
  "Email Address",
  "Employer Name",
  "Position Applied For",
  "Requested Amount",
  "Purpose of Funds",
  "Signature & Date",
];

export default function SpecialOffersPage() {
  const { content } = useContent();
  const { specialOffers } = content;

  function handleDownload() {
    const formContent = `
ENOUGH IS ENOUGH FOUNDATION
JOB APPLICATION FUND FORM

${formFields.map((f) => `${f}: ____________________________`).join("\n\n")}

---
Funds are provided by community contributions and grants.
Contact: ${content.contact.phone} | ${content.contact.email}
    `.trim();

    const blob = new Blob([formContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Job-Application-Fund-Form.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-secondary/5 to-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 sm:text-5xl"
          >
            {specialOffers.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-gray-600"
          >
            {specialOffers.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg sm:p-10"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{specialOffers.formTitle}</h2>
                <p className="text-sm text-gray-500">Downloadable & Fillable Form</p>
              </div>
            </div>

            <p className="leading-relaxed text-gray-600">{specialOffers.formDescription}</p>
            <p className="mt-4 text-sm text-gray-500">{specialOffers.description}</p>

            <div className="mt-8 space-y-3 rounded-xl bg-gray-50 p-6">
              <p className="text-sm font-semibold text-gray-900">Form includes:</p>
              {formFields.map((field) => (
                <div key={field} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  {field}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={handleDownload} size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Form
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Need Help? Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  );
}
