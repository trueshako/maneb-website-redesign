import { useState, useRef, useCallback } from "react";
import { Icon } from "@/components/icons";
import { usePageTitle } from "@/router";
import { images } from "@/data/site";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { usePublishedArticles } from "@/hooks/usePublished";
import type { NewsCategory, NewsItem, NewsBlock } from "@/data/media";

const categories: NewsCategory[] = ["Announcements", "Results", "Awards", "Press", "Security"];

const field =
  "w-full rounded-xl border border-ink-100 bg-ink-50 px-4 py-3 text-[14.5px] text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function randomSlug() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let r = "";
  for (let i = 0; i < 9; i++) r += chars[Math.floor(Math.random() * chars.length)];
  return r;
}

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ------------------------------------------------------------------ */
/*  Login screen                                                      */
/* ------------------------------------------------------------------ */

function LoginScreen() {
  const { login } = useAdminAuth();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(u, p)) setErr(true);
    else setErr(false);
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-950 text-sun-400">
            <Icon name="shield" className="h-7 w-7" />
          </span>
          <h1 className="mt-5 font-display text-[1.75rem] font-extrabold text-ink-900">Admin Center</h1>
          <p className="mt-2 text-[14px] text-ink-500">Sign in to manage and publish articles.</p>
        </div>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-700">Username</label>
            <input
              value={u}
              onChange={(e) => { setU(e.target.value); setErr(false); }}
              className={field}
              autoComplete="username"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-700">Password</label>
            <input
              type="password"
              value={p}
              onChange={(e) => { setP(e.target.value); setErr(false); }}
              className={field}
              autoComplete="current-password"
            />
          </div>
          {err && (
            <p className="flex items-center gap-2 text-[13px] font-medium text-flag-600">
              <Icon name="alert" className="h-4 w-4" />
              Invalid username or password.
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-full bg-brand-950 px-6 py-3.5 text-[14.5px] font-semibold text-white transition hover:bg-brand-800"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Compose editor                                                    */
/* ------------------------------------------------------------------ */

function ComposeTab() {
  const { publish } = usePublishedArticles();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugMode, setSlugMode] = useState<"auto" | "short" | "manual">("auto");
  const [category, setCategory] = useState<NewsCategory>("Announcements");
  const [date, setDate] = useState(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }));
  const [author, setAuthor] = useState("MANEB");
  const [heroImage, setHeroImage] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [blocks, setBlocks] = useState<NewsBlock[]>([{ type: "text", content: "" }]);
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const insertAtRef = useRef<number>(blocks.length);

  const effectiveSlug = slugMode === "auto"
    ? slugify(title)
    : slugMode === "short"
      ? randomSlug()
      : slug;

  const updateBlock = (i: number, patch: Partial<NewsBlock>) => {
    setBlocks((prev) => prev.map((b, idx) => (idx === i ? { ...b, ...patch } : b)));
  };

  const removeBlock = (i: number) => {
    setBlocks((prev) => (prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev));
  };

  const moveBlock = (i: number, dir: -1 | 1) => {
    setBlocks((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const addTextBlock = (afterIndex: number) => {
    setBlocks((prev) => {
      const next = [...prev];
      next.splice(afterIndex + 1, 0, { type: "text", content: "" });
      return next;
    });
  };

  const handleImageFile = useCallback(async (file: File, insertAfter: number) => {
    const src = await toBase64(file);
    setBlocks((prev) => {
      const next = [...prev];
      next.splice(insertAfter + 1, 0, { type: "image", src, alt: file.name, caption: "" });
      return next;
    });
  }, []);

  const onDrop = useCallback(
    async (e: React.DragEvent, insertAfter: number) => {
      e.preventDefault();
      setDragOver(null);
      const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
      for (const f of files) await handleImageFile(f, insertAfter);
    },
    [handleImageFile],
  );

  const onHeroDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
      if (files[0]) {
        const src = await toBase64(files[0]);
        setHeroImage(src);
      }
    },
    [],
  );

  const doPublish = () => {
    if (!title.trim()) return;
    const item: NewsItem = {
      slug: effectiveSlug || randomSlug(),
      category,
      title: title.trim(),
      date: date.trim(),
      image: heroImage || images.classroom,
      excerpt: excerpt.trim() || title.trim(),
      author: author.trim() || "MANEB",
      body: blocks.filter((b) => b.type === "text").map((b) => b.content || ""),
      blocks,
    };
    publish(item);
    // reset
    setTitle("");
    setSlug("");
    setExcerpt("");
    setHeroImage("");
    setBlocks([{ type: "text", content: "" }]);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  const wrapSelection = (i: number, marker: string) => {
    const ta = document.getElementById(`block-${i}`) as HTMLTextAreaElement | null;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const val = ta.value;
    const selected = val.slice(start, end);
    const wrapped = marker + (selected || "text") + marker;
    const next = val.slice(0, start) + wrapped + val.slice(end);
    updateBlock(i, { content: next });
    setTimeout(() => {
      ta.focus();
      ta.selectionStart = start + marker.length;
      ta.selectionEnd = start + marker.length + (selected || "text").length;
    }, 0);
  };

  const insertLink = (i: number) => {
    const url = prompt("Enter URL:");
    if (!url) return;
    const ta = document.getElementById(`block-${i}`) as HTMLTextAreaElement | null;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const val = ta.value;
    const selected = val.slice(start, end) || "link text";
    const wrapped = `[${selected}](${url})`;
    const next = val.slice(0, start) + wrapped + val.slice(end);
    updateBlock(i, { content: next });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-700">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article title"
            className={field}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-700">Author</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="MANEB"
            className={field}
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-700">Category</label>
          <div className="relative">
            <select value={category} onChange={(e) => setCategory(e.target.value as NewsCategory)} className={field + " appearance-none pr-10"}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
            <Icon name="chevronDown" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-700">Date</label>
          <input value={date} onChange={(e) => setDate(e.target.value)} className={field} />
        </div>
      </div>

      {/* Slug */}
      <div>
        <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-700">URL slug</label>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] text-ink-500">/media/news/</span>
          <input
            value={slugMode === "manual" ? slug : slugMode === "auto" ? slugify(title) : randomSlug()}
            onChange={(e) => { setSlug(e.target.value); setSlugMode("manual"); }}
            disabled={slugMode !== "manual"}
            className={field + " flex-1 min-w-[200px]"}
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["auto", "short", "manual"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setSlugMode(m)}
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition ${slugMode === m ? "bg-brand-700 text-white" : "bg-ink-50 text-ink-500 hover:bg-ink-100"}`}
            >
              {m === "auto" ? "From title" : m === "short" ? "Generate short" : "Custom"}
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-[12px] text-ink-300">
          "From title" creates a readable URL. "Generate short" creates a unique 9-character URL. "Custom" lets you type your own.
        </p>
      </div>

      {/* Hero image */}
      <div>
        <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-700">Hero image (appears below title)</label>
        <div
          onDragOver={(e) => { e.preventDefault(); }}
          onDrop={onHeroDrop}
          className="rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50/50 p-4 transition hover:border-brand-300"
        >
          {heroImage ? (
            <div className="relative">
              <img src={heroImage} alt="" className="max-h-48 w-full rounded-xl object-cover" />
              <button
                type="button"
                onClick={() => setHeroImage("")}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink-700 shadow hover:bg-white"
              >
                <Icon name="close" className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-6 text-center">
              <Icon name="download" className="h-8 w-8 text-ink-300" />
              <p className="text-[13px] text-ink-500">Drag an image here, or</p>
              <button
                type="button"
                onClick={() => {
                  const url = prompt("Image URL:");
                  if (url) setHeroImage(url);
                }}
                className="rounded-full bg-brand-700 px-4 py-2 text-[13px] font-semibold text-white hover:bg-brand-800"
              >
                Paste URL
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-700">Excerpt (short summary)</label>
        <textarea
          rows={2}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="One or two sentences shown in listings"
          className={field + " resize-none"}
        />
      </div>

      {/* Body blocks */}
      <div>
        <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-700">Article body</label>
        <p className="mb-3 text-[12px] text-ink-300">
          Add text paragraphs and images. Use the toolbar for bold, italic and links. Drag images between blocks to position them.
        </p>
        <div className="space-y-3">
          {blocks.map((block, i) => (
            <div
              key={i}
              onDragOver={(e) => { e.preventDefault(); setDragOver(i); }}
              onDrop={(e) => { onDrop(e, i); setDragOver(null); }}
              onDragLeave={() => setDragOver(null)}
              className={`rounded-2xl border p-3 transition ${dragOver === i ? "border-brand-400 bg-brand-50/50" : "border-ink-100 bg-white"}`}
            >
              {block.type === "text" ? (
                <>
                  <div className="mb-2 flex items-center gap-1.5">
                    <button type="button" onClick={() => wrapSelection(i, "**")} title="Bold" className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-50 text-ink-700 hover:bg-ink-100">
                      <Icon name="pen" className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => wrapSelection(i, "*")} title="Italic" className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-50 text-ink-700 hover:bg-ink-100">
                      <span className="text-[14px] italic font-serif">I</span>
                    </button>
                    <button type="button" onClick={() => insertLink(i)} title="Insert link" className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-50 text-ink-700 hover:bg-ink-100">
                      <Icon name="external" className="h-4 w-4" />
                    </button>
                    <span className="ml-auto flex items-center gap-1">
                      <button type="button" onClick={() => moveBlock(i, -1)} disabled={i === 0} className="flex h-7 w-7 items-center justify-center rounded-lg text-ink-400 hover:bg-ink-50 disabled:opacity-30">
                        <Icon name="arrowUp" className="h-3.5 w-3.5" />
                      </button>
                      <button type="button" onClick={() => moveBlock(i, 1)} disabled={i === blocks.length - 1} className="flex h-7 w-7 items-center justify-center rounded-lg text-ink-400 hover:bg-ink-50 disabled:opacity-30">
                        <Icon name="arrowRight" className="h-3.5 w-3.5 rotate-90" />
                      </button>
                      <button type="button" onClick={() => removeBlock(i)} className="flex h-7 w-7 items-center justify-center rounded-lg text-ink-400 hover:bg-flag-50 hover:text-flag-600">
                        <Icon name="close" className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  </div>
                  <textarea
                    id={`block-${i}`}
                    rows={4}
                    value={block.content || ""}
                    onChange={(e) => updateBlock(i, { content: e.target.value })}
                    placeholder="Write a paragraph…"
                    className={field + " resize-y"}
                  />
                  <div className="mt-2 flex gap-2">
                    <button type="button" onClick={() => addTextBlock(i)} className="text-[12px] font-semibold text-brand-700 hover:underline">
                      + Add paragraph
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[12px] font-semibold text-ink-500 hover:underline"
                    >
                      + Insert image
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <img src={block.src} alt={block.alt || ""} className="max-h-48 w-full rounded-xl object-cover" />
                  <input
                    value={block.caption || ""}
                    onChange={(e) => updateBlock(i, { caption: e.target.value })}
                    placeholder="Image caption (optional)"
                    className={field + " text-[13px]"}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11.5px] text-ink-300">Image block</span>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => moveBlock(i, -1)} disabled={i === 0} className="flex h-7 w-7 items-center justify-center rounded-lg text-ink-400 hover:bg-ink-50 disabled:opacity-30">
                        <Icon name="arrowUp" className="h-3.5 w-3.5" />
                      </button>
                      <button type="button" onClick={() => moveBlock(i, 1)} disabled={i === blocks.length - 1} className="flex h-7 w-7 items-center justify-center rounded-lg text-ink-400 hover:bg-ink-50 disabled:opacity-30">
                        <Icon name="arrowRight" className="h-3.5 w-3.5 rotate-90" />
                      </button>
                      <button type="button" onClick={() => removeBlock(i)} className="flex h-7 w-7 items-center justify-center rounded-lg text-ink-400 hover:bg-flag-50 hover:text-flag-600">
                        <Icon name="close" className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={async (e) => {
            const files = Array.from(e.target.files || []).filter((f) => f.type.startsWith("image/"));
            for (const f of files) await handleImageFile(f, insertAtRef.current);
            e.target.value = "";
          }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={doPublish}
          disabled={!title.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3.5 text-[14.5px] font-semibold text-white transition hover:bg-brand-800 disabled:opacity-50"
        >
          <Icon name="send" className="h-4 w-4" />
          Publish article
        </button>
        <button
          type="button"
          onClick={() => setPreview((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-white px-6 py-3.5 text-[14.5px] font-semibold text-ink-900 transition hover:border-brand-300"
        >
          <Icon name="eye" className="h-4 w-4" />
          {preview ? "Hide preview" : "Preview"}
        </button>
        {saved && (
          <span className="flex items-center gap-2 text-[13.5px] font-semibold text-brand-700">
            <Icon name="check" className="h-4 w-4" />
            Published — appears first in news listing.
          </span>
        )}
      </div>

      {preview && title.trim() && (
        <div className="mt-8 overflow-hidden rounded-3xl border border-ink-100">
          <div className="relative aspect-[16/9] bg-ink-100">
            <img src={heroImage || images.classroom} alt="" className="h-full w-full object-cover" />
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-800">
              {category}
            </span>
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-[12.5px] text-ink-300">{date} · {author || "MANEB"}</p>
            <h2 className="mt-1 font-display text-[1.5rem] font-bold text-ink-900">{title}</h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-500">{excerpt || title}</p>
            <div className="mt-6 space-y-4">
              {blocks.map((b, i) =>
                b.type === "text" ? (
                  <p key={i} className="text-[15px] leading-relaxed text-ink-700">{b.content}</p>
                ) : (
                  <figure key={i}>
                    <img src={b.src} alt={b.alt || ""} className="w-full rounded-2xl" />
                    {b.caption && <figcaption className="mt-2 text-[13px] text-ink-500">{b.caption}</figcaption>}
                  </figure>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Published articles tab                                            */
/* ------------------------------------------------------------------ */

function PublishedTab() {
  const { articles, remove } = usePublishedArticles();
  if (articles.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink-100 py-12 text-center">
        <Icon name="newspaper" className="mx-auto h-8 w-8 text-ink-300" />
        <p className="mt-3 text-[14px] text-ink-500">No published articles yet.</p>
      </div>
    );
  }
  return (
    <ul className="space-y-3">
      {articles.map((a) => (
        <li key={a.slug} className="flex items-center justify-between gap-4 rounded-2xl border border-ink-100 bg-white p-4 sm:p-5">
          <div className="min-w-0">
            <p className="font-display text-[15px] font-bold text-ink-900">{a.title}</p>
            <p className="mt-0.5 text-[12.5px] text-ink-500">{a.category} · {a.date} · {a.author || "MANEB"}</p>
            <p className="mt-0.5 text-[12px] text-ink-300">/media/news/{a.slug}</p>
          </div>
          <button
            type="button"
            onClick={() => remove(a.slug)}
            className="shrink-0 rounded-lg bg-ink-50 px-3 py-1.5 text-[12px] font-semibold text-ink-500 transition hover:bg-flag-50 hover:text-flag-600"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  Settings tab                                                      */
/* ------------------------------------------------------------------ */

function SettingsTab() {
  const { creds, updateCreds, logout } = useAdminAuth();
  const [u, setU] = useState(creds.username);
  const [p, setP] = useState("");
  const [p2, setP2] = useState("");
  const [msg, setMsg] = useState("");

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (p && p !== p2) {
      setMsg("Passwords do not match.");
      return;
    }
    updateCreds(u || creds.username, p || creds.password);
    setP("");
    setP2("");
    setMsg("Credentials updated. Use the new username and password next time you sign in.");
  };

  return (
    <div className="max-w-md space-y-6">
      <form onSubmit={save} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-700">Username</label>
          <input value={u} onChange={(e) => setU(e.target.value)} className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-700">New password (leave blank to keep current)</label>
          <input type="password" value={p} onChange={(e) => setP(e.target.value)} className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-ink-700">Confirm password</label>
          <input type="password" value={p2} onChange={(e) => setP2(e.target.value)} className={field} />
        </div>
        {msg && <p className="text-[13px] font-medium text-brand-700">{msg}</p>}
        <button type="submit" className="rounded-full bg-brand-700 px-6 py-3.5 text-[14.5px] font-semibold text-white transition hover:bg-brand-800">
          Save changes
        </button>
      </form>
      <div className="border-t border-ink-100 pt-6">
        <button
          type="button"
          onClick={logout}
          className="rounded-full border border-flag-200 bg-flag-50 px-6 py-3 text-[14px] font-semibold text-flag-600 transition hover:bg-flag-100"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main admin center                                                 */
/* ------------------------------------------------------------------ */

export function AdminCenter() {
  usePageTitle("Admin Center");
  const { authed } = useAdminAuth();
  const [tab, setTab] = useState<"compose" | "published" | "settings">("compose");

  if (!authed) return <LoginScreen />;

  const tabs = [
    { id: "compose" as const, label: "Compose", icon: "pen" as const },
    { id: "published" as const, label: "Published", icon: "newspaper" as const },
    { id: "settings" as const, label: "Settings", icon: "shield" as const },
  ];

  return (
    <>
      <div className="border-b border-ink-100 bg-ink-50/60 pt-16 xl:pt-[72px]">
        <div className="container-x py-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-950 text-sun-400">
              <Icon name="shield" className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-[1.6rem] font-extrabold text-ink-900">Admin Center</h1>
              <p className="text-[13px] text-ink-500">Compose, publish and manage articles.</p>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-semibold transition ${tab === t.id ? "bg-brand-700 text-white" : "bg-white text-ink-500 hover:text-ink-900"}`}
              >
                <Icon name={t.icon} className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="container-x py-10">
        {tab === "compose" && <ComposeTab />}
        {tab === "published" && <PublishedTab />}
        {tab === "settings" && <SettingsTab />}
      </div>
    </>
  );
}
