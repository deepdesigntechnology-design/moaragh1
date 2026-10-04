import type { Block } from "@/lib/booklet/types";
import { Schematic } from "./schematics";

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </>
  );
}

export function BlockView({ block }: { block: Block }) {
  switch (block.t) {
    case "kicker":
      return (
        <p className="mb-1 font-vazir text-pt8 font-medium tracking-wide text-leather">{block.text}</p>
      );
    case "h1":
      return (
        <h1 className="font-naskh text-pt28 leading-tight text-balance text-ink">{block.text}</h1>
      );
    case "h2":
      return (
        <h2 className="mb-1.5 mt-0.5 font-naskh text-pt16 leading-snug text-balance text-ink">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mb-1 mt-2 font-naskh text-pt12 leading-snug text-leather">{block.text}</h3>
      );
    case "p":
      return (
        <p className="mb-1.5 font-vazir text-pt9 leading-relaxed text-pretty text-ink">{block.text}</p>
      );
    case "lead":
      return (
        <p className="my-1.5 border-r-2 border-leather pr-2 font-naskh text-pt10 leading-relaxed text-ink">
          {block.text}
        </p>
      );
    case "note":
      return (
        <p className="my-1.5 bg-fill-soft px-2 py-1.5 font-vazir text-pt8 leading-relaxed text-muted">
          {block.text}
        </p>
      );
    case "warn":
      return (
        <p className="my-1.5 border border-warn/30 bg-fill-soft px-2 py-1.5 font-vazir text-pt8 leading-relaxed text-warn">
          {block.text}
        </p>
      );
    case "caption":
      return <p className="font-vazir text-pt7 text-muted">{block.text}</p>;
    case "quote":
      return (
        <blockquote className="my-3 font-naskh text-pt13 leading-relaxed text-ink">{block.text}</blockquote>
      );
    case "ul":
      return (
        <ul className="mb-1.5 list-disc pr-4 font-vazir text-pt9 leading-relaxed text-ink">
          {block.items.map((it) => (
            <li key={it} className="mb-0.5">
              {it}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mb-1.5 list-decimal pr-4 font-vazir text-pt9 leading-relaxed text-ink">
          {block.items.map((it) => (
            <li key={it} className="mb-0.5">
              {it}
            </li>
          ))}
        </ol>
      );
    case "dl":
      return (
        <dl className="mb-1.5 font-vazir text-pt9 leading-relaxed text-ink">
          {block.items.map((it) => (
            <div key={it.dt} className="mb-1 grid grid-cols-[5.5rem_1fr] gap-x-2">
              <dt className="font-naskh text-pt10 text-leather">{it.dt}</dt>
              <dd>{it.dd}</dd>
            </div>
          ))}
        </dl>
      );
    case "table":
      return (
        <div className="my-1.5 overflow-hidden border border-rule/40">
          <p className="bg-paper-deep px-1.5 py-1 font-naskh text-pt8 text-leather">{block.caption}</p>
          <table className="w-full border-collapse font-vazir text-pt7 text-ink">
            <thead>
              <tr className="bg-fill-soft">
                {block.cols.map((c) => (
                  <th key={c} className="border-t border-rule/30 px-1 py-0.5 text-right font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 ? "bg-fill-soft/50" : "bg-paper"}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="border-t border-rule/25 px-1 py-0.5 align-top leading-snug">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "steps":
      return (
        <ol className="mb-1.5 space-y-1 font-vazir text-pt9 text-ink">
          {block.items.map((s) => (
            <li key={s.n} className="grid grid-cols-[1.4rem_1fr] gap-1">
              <span className="font-naskh text-pt11 text-leather">{s.n}</span>
              <span>
                <span className="font-medium">{s.title} — </span>
                {s.body}
              </span>
            </li>
          ))}
        </ol>
      );
    case "schematic":
      return <Schematic id={block.id} />;
    case "rule":
      return <hr className="my-2 border-rule/40" />;
    case "cols":
      return (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Blocks blocks={block.left} />
          </div>
          <div>
            <Blocks blocks={block.right} />
          </div>
        </div>
      );
  }
}
