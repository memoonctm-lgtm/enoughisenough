"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  LogOut,
  Save,
  RotateCcw,
  Palette,
  Type,
  Image,
  Users,
  Briefcase,
  Phone,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";
import { useContent } from "@/lib/content-store";
import type { BoardMember, Service, BlogPost } from "@/types/content";

type Tab = "general" | "home" | "about" | "services" | "board" | "blog" | "contact" | "theme";

export default function AdminPanel() {
  const { content, updateContent, resetContent, isAdmin, login, logout } = useContent();
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [saved, setSaved] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (login(password)) {
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  }

  function handleSave() {
    updateContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 mesh-gradient">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
          className="w-full max-w-md overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-primary/10"
        >
          <div className="bg-gradient-to-r from-primary to-primary/90 px-8 py-10 text-center text-white">
            <Lock className="mx-auto h-10 w-10" />
            <h2 className="mt-4 font-display text-2xl font-bold">Admin Portal</h2>
            <p className="mt-2 text-sm text-white/70">Content Management System</p>
          </div>
          <div className="p-8">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {loginError && (
              <p className="mt-2 text-sm text-red-500">Invalid password. Please try again.</p>
            )}
            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
            >
              Sign In to Dashboard
            </button>
            <p className="mt-4 text-center text-xs text-gray-400">
              Default password: eie-admin-2026
            </p>
          </div>
        </motion.form>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof Type }[] = [
    { id: "general", label: "General", icon: Type },
    { id: "home", label: "Home", icon: Image },
    { id: "about", label: "About", icon: FileText },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "board", label: "Board", icon: Users },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "theme", label: "Theme", icon: Palette },
  ];

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20";
  const labelClass = "mb-1 block text-xs font-medium text-gray-600";

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-gradient-to-r from-primary to-primary/90 px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">Content Dashboard</h1>
            <p className="text-sm text-white/70">Manage site content, images, and theme</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={handleSave} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-white/90">
              <Save className="h-4 w-4" />
              {saved ? "Saved!" : "Save"}
            </button>
            <button type="button" onClick={resetContent} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium hover:bg-white/20">
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            <button type="button" onClick={logout} className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-5 py-2.5 text-sm font-medium hover:bg-red-500/30">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          {activeTab === "general" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">General Settings</h2>
              <div>
                <label className={labelClass}>Site Name</label>
                <input
                  className={inputClass}
                  value={content.siteName}
                  onChange={(e) => updateContent({ siteName: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Tagline</label>
                <input
                  className={inputClass}
                  value={content.tagline}
                  onChange={(e) => updateContent({ tagline: e.target.value })}
                />
              </div>
            </div>
          )}

          {activeTab === "home" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Home Page</h2>
              {(
                [
                  ["Hero Headline", "heroHeadline"],
                  ["Hero Sub-headline", "heroSubheadline"],
                  ["Mission Statement", "missionStatement"],
                  ["Hero Image URL", "heroImage"],
                  ["Life Coach Name", "lifeCoachName"],
                  ["Life Coach Title", "lifeCoachTitle"],
                  ["Life Coach Bio", "lifeCoachBio"],
                  ["Life Coach Image URL", "lifeCoachImage"],
                ] as const
              ).map(([label, key]) => (
                <div key={key}>
                  <label className={labelClass}>{label}</label>
                  {key.includes("Bio") || key.includes("Headline") || key.includes("Sub") || key.includes("mission") ? (
                    <textarea
                      className={inputClass}
                      rows={key.includes("Bio") ? 4 : 2}
                      value={content.home[key]}
                      onChange={(e) =>
                        updateContent({ home: { ...content.home, [key]: e.target.value } })
                      }
                    />
                  ) : (
                    <input
                      className={inputClass}
                      value={content.home[key]}
                      onChange={(e) =>
                        updateContent({ home: { ...content.home, [key]: e.target.value } })
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">About Page</h2>
              {(
                [
                  ["Title", "title"],
                  ["Mission Title", "missionTitle"],
                  ["Mission Text", "missionText"],
                  ["Overview Title", "overviewTitle"],
                  ["Overview Text", "overviewText"],
                  ["Image URL", "image"],
                ] as const
              ).map(([label, key]) => (
                <div key={key}>
                  <label className={labelClass}>{label}</label>
                  {key.includes("Text") ? (
                    <textarea
                      className={inputClass}
                      rows={4}
                      value={content.about[key]}
                      onChange={(e) =>
                        updateContent({ about: { ...content.about, [key]: e.target.value } })
                      }
                    />
                  ) : (
                    <input
                      className={inputClass}
                      value={content.about[key]}
                      onChange={(e) =>
                        updateContent({ about: { ...content.about, [key]: e.target.value } })
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "services" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Services</h2>
              <div>
                <label className={labelClass}>Section Title</label>
                <input
                  className={inputClass}
                  value={content.services.title}
                  onChange={(e) =>
                    updateContent({ services: { ...content.services, title: e.target.value } })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Pricing Note</label>
                <input
                  className={inputClass}
                  value={content.services.pricingNote}
                  onChange={(e) =>
                    updateContent({
                      services: { ...content.services, pricingNote: e.target.value },
                    })
                  }
                />
              </div>
              {content.services.items.map((service, i) => (
                <div key={service.id} className="rounded-lg border border-gray-100 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Program {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const items = content.services.items.filter((s) => s.id !== service.id);
                        updateContent({ services: { ...content.services, items } });
                      }}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                    className={inputClass}
                    placeholder="Title"
                    value={service.title}
                    onChange={(e) => {
                      const items = [...content.services.items];
                      items[i] = { ...service, title: e.target.value };
                      updateContent({ services: { ...content.services, items } });
                    }}
                  />
                  <textarea
                    className={inputClass}
                    rows={2}
                    placeholder="Description"
                    value={service.description}
                    onChange={(e) => {
                      const items = [...content.services.items];
                      items[i] = { ...service, description: e.target.value };
                      updateContent({ services: { ...content.services, items } });
                    }}
                  />
                  <input
                    className={inputClass}
                    placeholder="Image URL"
                    value={service.image}
                    onChange={(e) => {
                      const items = [...content.services.items];
                      items[i] = { ...service, image: e.target.value };
                      updateContent({ services: { ...content.services, items } });
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newService: Service = {
                    id: Date.now().toString(),
                    title: "New Program",
                    description: "Program description",
                    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
                    icon: "users",
                  };
                  updateContent({
                    services: {
                      ...content.services,
                      items: [...content.services.items, newService],
                    },
                  });
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Plus className="h-4 w-4" /> Add Program
              </button>
            </div>
          )}

          {activeTab === "board" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Board Members</h2>
              {content.boardMembers.map((member, i) => (
                <div key={member.id} className="rounded-lg border border-gray-100 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Member {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const boardMembers = content.boardMembers.filter(
                          (m) => m.id !== member.id
                        );
                        updateContent({ boardMembers });
                      }}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      className={inputClass}
                      placeholder="Name"
                      value={member.name}
                      onChange={(e) => {
                        const boardMembers = [...content.boardMembers];
                        boardMembers[i] = { ...member, name: e.target.value };
                        updateContent({ boardMembers });
                      }}
                    />
                    <input
                      className={inputClass}
                      placeholder="Title"
                      value={member.title}
                      onChange={(e) => {
                        const boardMembers = [...content.boardMembers];
                        boardMembers[i] = { ...member, title: e.target.value };
                        updateContent({ boardMembers });
                      }}
                    />
                  </div>
                  <input
                    className={inputClass}
                    placeholder="Image URL"
                    value={member.image}
                    onChange={(e) => {
                      const boardMembers = [...content.boardMembers];
                      boardMembers[i] = { ...member, image: e.target.value };
                      updateContent({ boardMembers });
                    }}
                  />
                  <textarea
                    className={inputClass}
                    rows={2}
                    placeholder="Bio"
                    value={member.bio || ""}
                    onChange={(e) => {
                      const boardMembers = [...content.boardMembers];
                      boardMembers[i] = { ...member, bio: e.target.value };
                      updateContent({ boardMembers });
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newMember: BoardMember = {
                    id: Date.now().toString(),
                    name: "New Member",
                    title: "Board Member",
                    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
                    bio: "",
                  };
                  updateContent({ boardMembers: [...content.boardMembers, newMember] });
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Plus className="h-4 w-4" /> Add Board Member
              </button>
            </div>
          )}

          {activeTab === "blog" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Blog Posts</h2>
              {content.blog.posts.map((post, i) => (
                <div key={post.id} className="rounded-lg border border-gray-100 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Post {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const posts = content.blog.posts.filter((p) => p.id !== post.id);
                        updateContent({ blog: { ...content.blog, posts } });
                      }}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                    className={inputClass}
                    placeholder="Title"
                    value={post.title}
                    onChange={(e) => {
                      const posts = [...content.blog.posts];
                      posts[i] = { ...post, title: e.target.value };
                      updateContent({ blog: { ...content.blog, posts } });
                    }}
                  />
                  <textarea
                    className={inputClass}
                    rows={2}
                    placeholder="Excerpt"
                    value={post.excerpt}
                    onChange={(e) => {
                      const posts = [...content.blog.posts];
                      posts[i] = { ...post, excerpt: e.target.value };
                      updateContent({ blog: { ...content.blog, posts } });
                    }}
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      className={inputClass}
                      placeholder="Category"
                      value={post.category}
                      onChange={(e) => {
                        const posts = [...content.blog.posts];
                        posts[i] = { ...post, category: e.target.value };
                        updateContent({ blog: { ...content.blog, posts } });
                      }}
                    />
                    <input
                      className={inputClass}
                      placeholder="Author"
                      value={post.author}
                      onChange={(e) => {
                        const posts = [...content.blog.posts];
                        posts[i] = { ...post, author: e.target.value };
                        updateContent({ blog: { ...content.blog, posts } });
                      }}
                    />
                  </div>
                  <input
                    className={inputClass}
                    placeholder="Image URL"
                    value={post.image}
                    onChange={(e) => {
                      const posts = [...content.blog.posts];
                      posts[i] = { ...post, image: e.target.value };
                      updateContent({ blog: { ...content.blog, posts } });
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newPost: BlogPost = {
                    id: Date.now().toString(),
                    title: "New Post",
                    excerpt: "Post excerpt",
                    content: "Full content here",
                    category: "Community News",
                    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
                    date: new Date().toISOString().split("T")[0],
                    author: "Sharon Bedford",
                  };
                  updateContent({
                    blog: { ...content.blog, posts: [...content.blog.posts, newPost] },
                  });
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Plus className="h-4 w-4" /> Add Blog Post
              </button>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Contact Information</h2>
              {(
                [
                  ["Phone", "phone"],
                  ["Email", "email"],
                  ["Hours", "hours"],
                  ["Instagram URL", "instagram"],
                  ["Facebook URL", "facebook"],
                  ["Google URL", "google"],
                ] as const
              ).map(([label, key]) => (
                <div key={key}>
                  <label className={labelClass}>{label}</label>
                  <input
                    className={inputClass}
                    value={content.contact[key]}
                    onChange={(e) =>
                      updateContent({ contact: { ...content.contact, [key]: e.target.value } })
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === "theme" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Theme Colors</h2>
              {(
                [
                  ["Primary (Royal Blue)", "primary"],
                  ["Secondary (Pink)", "secondary"],
                  ["Background", "background"],
                ] as const
              ).map(([label, key]) => (
                <div key={key} className="flex items-center gap-4">
                  <input
                    type="color"
                    value={content.theme[key]}
                    onChange={(e) =>
                      updateContent({ theme: { ...content.theme, [key]: e.target.value } })
                    }
                    className="h-10 w-10 cursor-pointer rounded-lg border border-gray-200"
                  />
                  <div className="flex-1">
                    <label className={labelClass}>{label}</label>
                    <input
                      className={inputClass}
                      value={content.theme[key]}
                      onChange={(e) =>
                        updateContent({ theme: { ...content.theme, [key]: e.target.value } })
                      }
                    />
                  </div>
                </div>
              ))}
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-600">Preview:</p>
                <div className="mt-3 flex gap-3">
                  <div
                    className="h-12 flex-1 rounded-lg"
                    style={{ backgroundColor: content.theme.primary }}
                  />
                  <div
                    className="h-12 flex-1 rounded-lg"
                    style={{ backgroundColor: content.theme.secondary }}
                  />
                  <div
                    className="h-12 flex-1 rounded-lg border"
                    style={{ backgroundColor: content.theme.background }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
