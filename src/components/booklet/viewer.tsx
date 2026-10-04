import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, List, Printer } from "lucide-react";
import { PAGES, TOC } from "@/lib/booklet/content";
import { A5Page } from "./a5-page";

export function BookletViewer() {
  const total = PAGES.length;
  const [index, setIndex] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [spread, setSpread] = useState(false);

  const go = (n: number) => setIndex(Math.max(0, Math.min(total - 1, n)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setIndex((i) => Math.min(total - 1, i + 1));
      if (e.key === "ArrowRight") setIndex((i) => Math.max(0, i - 1));
      if (e.key === "Home") setIndex(0);
      if (e.key === "End") setIndex(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1100px)");
    const apply = () => setSpread(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const pagesToShow = useMemo(() => {
    if (!spread) return [index];
    if (index === 0) return [0];
    const left = index % 2 === 0 ? index - 1 : index;
    const right = left + 1;
    return right < total ? [left, right] : [left];
  }, [index, spread, total]);

  return (
    <div className="flex min-h-dvh flex-col bg-chrome text-chrome-fg">
      <header className="no-print flex items-center gap-2 border-b border-chrome-line px-3 py-2">
        <button
          type="button"
          className="inline-flex h-11 min-w-11 items-center justify-center rounded-md border border-chrome-line bg-chrome px-3 text-pt10 text-chrome-fg hover:bg-chrome-line"
          onClick={() => setTocOpen((v) => !v)}
          aria-expanded={tocOpen}
        >
          <List className="size-4" strokeWidth={1.75} />
          <span className="mr-1 hidden sm:inline">فهرست</span>
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-naskh text-pt14 text-chrome-fg">جزوه راهبردی صنعت نوین معرق چرم</h1>
          <p className="truncate font-vazir text-pt8 text-chrome-muted">
            متون فیکس‌شده کتاب · قطع A5 · اجرای عملی یک اثر کامل
          </p>
        </div>
        <button
          type="button"
          className="inline-flex h-11 min-w-11 items-center justify-center rounded-md border border-chrome-line bg-leather px-3 font-vazir text-pt10 text-chrome-fg hover:opacity-90"
          onClick={() => window.print()}
        >
          <Printer className="size-4" strokeWidth={1.75} />
          <span className="mr-1 hidden sm:inline">چاپ A5</span>
        </button>
      </header>

      <div className="flex min-h-0 flex-1">
        {tocOpen ? (
          <nav className="no-print fixed bottom-14 end-0 top-14 z-20 w-72 overflow-y-auto border-s border-chrome-line bg-chrome p-3">
            <p className="mb-2 font-naskh text-pt12 text-chrome-fg">فهرست</p>
            <ul className="space-y-1 font-vazir text-pt9">
              {TOC.map((item) => {
                const target = PAGES.findIndex((p) => p.id === item.id);
                const active = target === index;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={
                        "flex w-full items-start gap-2 rounded-sm px-2 py-2 text-right " +
                        (active ? "bg-chrome-line text-chrome-fg" : "text-chrome-muted hover:bg-chrome-line/60")
                      }
                      onClick={() => {
                        if (target >= 0) go(target);
                        setTocOpen(false);
                      }}
                    >
                      <span className="tabular-nums text-leather">{item.folio}</span>
                      <span>{item.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}

        <main className="print-root flex min-w-0 flex-1 flex-col">
          <div className="no-print flex min-h-0 flex-1 items-start justify-center overflow-auto p-3 sm:p-6">
            <div className="a5-stage flex flex-wrap items-start justify-center gap-4">
              {pagesToShow.map((i) => (
                <A5Page key={PAGES[i].id} page={PAGES[i]} index={i} total={total} />
              ))}
            </div>
          </div>

          <div className="print-stack">
            {PAGES.map((page, i) => (
              <A5Page key={`print-${page.id}`} page={page} index={i} total={total} />
            ))}
          </div>

          <div className="no-print flex items-center justify-center gap-2 border-t border-chrome-line px-3 py-2">
            <button
              type="button"
              className="inline-flex h-11 min-w-11 items-center justify-center rounded-md border border-chrome-line disabled:opacity-40"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label="صفحه قبل"
            >
              <ChevronRight className="size-5" />
            </button>
            <span className="min-w-24 text-center font-naskh text-pt11 tabular-nums">
              {index + 1} / {total}
            </span>
            <button
              type="button"
              className="inline-flex h-11 min-w-11 items-center justify-center rounded-md border border-chrome-line disabled:opacity-40"
              onClick={() => go(index + 1)}
              disabled={index === total - 1}
              aria-label="صفحه بعد"
            >
              <ChevronLeft className="size-5" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
