"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Bell, Calendar, ArrowRight } from "lucide-react";
import { news, formatNewsDate } from "@/lib/news-data";

const SEEN_KEY = "fomico_notifications_last_seen";
const RECENT_ITEMS = [...news].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 4);
const LATEST_SLUG = RECENT_ITEMS[0]?.slug;

export default function NotificationBell() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only known after mount (avoids SSR/client localStorage mismatch).
    const lastSeen = typeof window !== "undefined" ? localStorage.getItem(SEEN_KEY) : null;
    setHasUnread(lastSeen !== LATEST_SLUG);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setOpen((prev) => !prev);
    if (!open && LATEST_SLUG) {
      localStorage.setItem(SEEN_KEY, LATEST_SLUG);
      setHasUnread(false);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={handleToggle}
        aria-label="Notifications"
        className="relative p-2 text-fomico-navy hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5" />
        {hasUnread && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-fomico-orange rounded-full ring-2 ring-white animate-pulse" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-fade-in-up z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <h3 className="text-sm font-bold text-fomico-navy">Activités récentes</h3>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {RECENT_ITEMS.map((item) => (
              <Link
                key={item.slug}
                href={`/${locale}/actualites/${item.slug}/`}
                onClick={() => setOpen(false)}
                className="flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-lg bg-cover bg-center shrink-0"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-fomico-navy line-clamp-2">{item.title}</p>
                  <p className="text-xs text-fomico-gray-dark flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" /> {formatNewsDate(item.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="px-4 pt-2 border-t border-gray-100">
            <Link
              href={`/${locale}/actualites/`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1 text-sm font-medium text-fomico-orange py-1.5 hover:underline"
            >
              Voir toutes les actualités <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
