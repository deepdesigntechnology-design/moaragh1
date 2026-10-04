import type { BookPage } from "@/lib/booklet/types";
import { BOOKLET_META } from "@/lib/booklet/content";
import { BlockView } from "./blocks";

export function A5Page({
  page,
  index,
  total,
}: {
  page: BookPage;
  index: number;
  total: number;
}) {
  const isCover = page.kind === "cover";
  const folio = String(index + 1);

  return (
    <article
      className="a5-sheet relative flex flex-col overflow-hidden bg-paper text-ink shadow-md"
      aria-label={`صفحه ${folio}`}
    >
      {isCover ? (
        <CoverInner page={page} />
      ) : (
        <>
          <header className="flex items-end justify-between border-b border-rule/40 pb-1">
            <span className="font-naskh text-pt8 text-leather">{BOOKLET_META.title}</span>
            <span className="font-vazir text-pt7 text-muted">{page.running}</span>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto pt-2">
            {page.blocks.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}
          </div>
          <footer className="mt-auto flex items-center justify-between border-t border-rule/40 pt-1">
            <span className="font-vazir text-pt7 text-muted">{BOOKLET_META.org}</span>
            <span className="font-naskh text-pt9 text-ink">{folio} / {total}</span>
          </footer>
        </>
      )}
    </article>
  );
}

function CoverInner({ page }: { page: BookPage }) {
  return (
    <div className="flex h-full flex-col border border-rule/50 p-4">
      <div className="flex items-center justify-between font-vazir text-pt8 text-muted">
        <span>{BOOKLET_META.code}</span>
        <span>قطع A5</span>
      </div>
      <div className="mt-8 flex flex-1 flex-col items-stretch justify-center text-center">
        <p className="font-vazir text-pt10 tracking-wide text-leather">درسنامه تخصصی و مرجع آموزشی</p>
        <div className="mx-auto my-3 h-px w-24 bg-rule" />
        {page.blocks
          .filter((b) => b.t === "h1" || b.t === "lead" || b.t === "p")
          .map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
      </div>
      <div className="space-y-1 text-center">
        <div className="mx-auto mb-3 h-px w-16 bg-rule" />
        <p className="font-naskh text-pt11 text-ink">{BOOKLET_META.hours}</p>
        <p className="font-vazir text-pt8 text-muted">{BOOKLET_META.format}</p>
        <p className="font-vazir text-pt8 text-muted">{BOOKLET_META.source}</p>
      </div>
    </div>
  );
}
