"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import { useContent } from "@/lib/content-store";
import { Download, FileText, CheckCircle, Save, Printer } from "lucide-react";

const formFields = [
  { key: "fullName", label: "Full Legal Name", required: true },
  { key: "address", label: "Current Address", required: true },
  { key: "phone", label: "Phone Number", required: true },
  { key: "email", label: "Email Address", required: true },
  { key: "employer", label: "Employer Name", required: false },
  { key: "position", label: "Position Applied For", required: true },
  { key: "amount", label: "Requested Amount", required: true },
  { key: "purpose", label: "Purpose of Funds", required: true },
];

export default function SpecialOffersPage() {
  const { content } = useContent();
  const { specialOffers, contact } = content;
  const [form, setForm] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  function handleChange(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    const submissions = JSON.parse(localStorage.getItem("eie-fund-forms") || "[]");
    submissions.push({ ...form, date: new Date().toISOString() });
    localStorage.setItem("eie-fund-forms", JSON.stringify(submissions));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleDownload() {
    const text = formFields
      .map((f) => `${f.label}: ${form[f.key] || "________________"}`)
      .join("\n\n");
    const blob = new Blob(
      [`ENOUGH IS ENOUGH FOUNDATION\nJOB APPLICATION FUND FORM\n\n${text}\n\nContact: ${contact.phone}`],
      { type: "text/plain" }
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Job-Application-Fund-Form.txt";
    a.click();
  }

  function handlePrint() {
    window.print();
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <SiteLayout>
      <PageHero title={specialOffers.title} subtitle={specialOffers.subtitle} badge="Resources" />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-primary/5"
          >
            <div className="bg-gradient-to-r from-primary to-primary/90 px-8 py-6 text-white sm:px-10">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <FileText className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold sm:text-2xl">{specialOffers.formTitle}</h2>
                  <p className="text-sm text-white/70">Fillable Online Form</p>
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <p className="leading-relaxed text-gray-600">{specialOffers.formDescription}</p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {formFields.map((field) => (
                  <div key={field.key} className={field.key === "purpose" ? "sm:col-span-2" : ""}>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      {field.label} {field.required && <span className="text-secondary">*</span>}
                    </label>
                    {field.key === "purpose" ? (
                      <textarea
                        rows={3}
                        value={form[field.key] || ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className={inputClass}
                      />
                    ) : (
                      <input
                        type={field.key === "email" ? "email" : field.key === "phone" ? "tel" : "text"}
                        value={form[field.key] || ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className={inputClass}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2 rounded-xl bg-surface p-4">
                {formFields.slice(0, 4).map((f) => (
                  <div key={f.key} className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className={`h-3.5 w-3.5 ${form[f.key] ? "text-green-500" : "text-gray-300"}`} />
                    {f.label} {form[f.key] ? "— completed" : "— pending"}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button onClick={handleSave} size="lg">
                  <Save className="mr-2 h-4 w-4" />
                  {saved ? "Saved!" : "Save Form"}
                </Button>
                <Button onClick={handleDownload} variant="outline" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button onClick={handlePrint} variant="ghost" size="lg">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  );
}
