"use client";

import Link from "next/link";
import { Phone, Mail, Clock, Globe, Settings } from "lucide-react";
import Logo from "./Logo";
import { useContent } from "@/lib/content-store";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/special-offers", label: "Special Offers" },
  { href: "/board", label: "Board" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const { content } = useContent();
  const { contact } = content;

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-sm leading-relaxed text-gray-600">
              {content.tagline}. Empowering individuals through faith, community, and professional life coaching.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`tel:${contact.phone.replace(/\D/g, "")}`} className="hover:text-primary">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${contact.email}`} className="hover:text-primary">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {contact.hours}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
              Connect
            </h3>
            <div className="flex gap-3">
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-all hover:bg-primary hover:text-white"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-all hover:bg-primary hover:text-white"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={contact.google}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-all hover:bg-primary hover:text-white"
                aria-label="Google"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
            <Link
              href="/admin"
              className="mt-6 inline-flex items-center gap-1.5 text-xs text-gray-400 transition-colors hover:text-primary"
            >
              <Settings className="h-3.5 w-3.5" />
              Admin Access
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Enough Is Enough Foundation. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
