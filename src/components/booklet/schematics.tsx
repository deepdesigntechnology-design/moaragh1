import type { ComponentType, ReactNode } from "react";
import type { SchematicId } from "@/lib/booklet/types";

const ink = "currentColor";

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <figure className="my-1.5 overflow-hidden rounded-sm border border-rule/40 bg-fill-soft/70">
      <div className="px-2 pt-2 text-ink">{children}</div>
      <figcaption className="font-vazir px-2 pb-1.5 pt-1 text-center text-pt7 leading-snug text-muted">
        {label}
      </figcaption>
    </figure>
  );
}

function GoldenPoints() {
  const w = 220;
  const h = 150;
  const m = 18;
  const x1 = m + (w - 2 * m) / 3;
  const x2 = m + (2 * (w - 2 * m)) / 3;
  const y1 = m + (h - 2 * m) / 3;
  const y2 = m + (2 * (h - 2 * m)) / 3;
  return (
    <Frame label="دیاگرام مفهومی — نقاط طلایی کادر و Super Gold Point (شمال‌شرقی‌ترین)">
      <svg viewBox={`0 0 ${w} ${h}`} className="mx-auto block h-auto w-full max-w-72" aria-hidden>
        <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} fill="none" stroke={ink} strokeWidth="1.2" />
        {[x1, x2].map((x) => (
          <line key={x} x1={x} y1={m} x2={x} y2={h - m} stroke={ink} strokeWidth="0.6" strokeDasharray="2 2" opacity="0.55" />
        ))}
        {[y1, y2].map((y) => (
          <line key={y} x1={m} y1={y} x2={w - m} y2={y} stroke={ink} strokeWidth="0.6" strokeDasharray="2 2" opacity="0.55" />
        ))}
        {[
          [x1, y1],
          [x2, y1],
          [x1, y2],
          [x2, y2],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 1 ? 3.4 : 2.4} fill={i === 1 ? "var(--color-leather)" : ink} />
        ))}
        <text x={x2 + 6} y={y1 - 6} fontSize="8" fill="var(--color-leather)" fontFamily="Vazirmatn, sans-serif">
          SGP
        </text>
      </svg>
    </Frame>
  );
}

function ThreeLines() {
  return (
    <Frame label="دیاگرام مفهومی — سه خط پایه اسلیمی ← اتصال بدون تغییر ← یک‌چهارم ترنج">
      <svg viewBox="0 0 280 92" className="mx-auto block h-auto w-full max-w-80" aria-hidden>
        <text x="22" y="14" fontSize="8" fill="var(--color-muted)" fontFamily="Vazirmatn, sans-serif">
          ۱. منحنی کامل
        </text>
        <path d="M12 70 A28 28 0 0 1 68 70" fill="none" stroke={ink} strokeWidth="1.6" />
        <text x="108" y="14" fontSize="8" fill="var(--color-muted)" fontFamily="Vazirmatn, sans-serif">
          ۲. اس‌شکل
        </text>
        <path d="M92 70 C104 40, 120 40, 132 55 C144 70, 156 70, 168 42" fill="none" stroke={ink} strokeWidth="1.6" />
        <text x="210" y="14" fontSize="8" fill="var(--color-muted)" fontFamily="Vazirmatn, sans-serif">
          ۳. منحنی کوتاه
        </text>
        <path d="M196 62 C210 48, 228 48, 248 62" fill="none" stroke={ink} strokeWidth="1.6" />
      </svg>
    </Frame>
  );
}

function ClassicComposition() {
  return (
    <Frame label="ترکیب‌بندی کلاسیک ایرانی: ترنج مرکزی + لچک + گوشه + حاشیه">
      <svg viewBox="0 0 200 150" className="mx-auto block h-auto w-full max-w-64" aria-hidden>
        <rect x="8" y="8" width="184" height="134" fill="none" stroke={ink} strokeWidth="1.4" />
        <rect x="16" y="16" width="168" height="118" fill="none" stroke={ink} strokeWidth="0.7" />
        <ellipse cx="100" cy="75" rx="34" ry="26" fill="none" stroke="var(--color-leather)" strokeWidth="1.5" />
        <path d="M40 28 L78 58" fill="none" stroke={ink} strokeWidth="0.8" />
        <path d="M160 28 L122 58" fill="none" stroke={ink} strokeWidth="0.8" />
        <path d="M40 122 L78 92" fill="none" stroke={ink} strokeWidth="0.8" />
        <path d="M160 122 L122 92" fill="none" stroke={ink} strokeWidth="0.8" />
        <path d="M18 22 Q28 18 38 28" fill="none" stroke={ink} strokeWidth="1" />
        <path d="M182 22 Q172 18 162 28" fill="none" stroke={ink} strokeWidth="1" />
        <path d="M18 128 Q28 132 38 122" fill="none" stroke={ink} strokeWidth="1" />
        <path d="M182 128 Q172 132 162 122" fill="none" stroke={ink} strokeWidth="1" />
        <text x="100" y="78" textAnchor="middle" fontSize="8" fill="var(--color-leather)" fontFamily="Vazirmatn, sans-serif">
          ترنج
        </text>
      </svg>
    </Frame>
  );
}

const STEPS = [
  "آماده‌سازی پایه‌کار",
  "چسب‌کاری",
  "اجرای اولیه",
  "بافت تریشه",
  "قوام‌آوری اولیه",
  "تکمیل معرق",
  "رزین زیرکار ۱:۶",
  "قوام‌آوری در دونم",
  "خشک‌شدن کامل",
  "رنگ‌آمیزی",
  "خشک‌شدن رنگ",
  "خال‌زنی",
  "روسازی نهایی",
];

function Process13() {
  return (
    <Frame label="زنجیره اجرایی سیزده‌گانه — ترتیب عملیات بخشی از دانش فنی است و جابه‌جایی مراحل کیفیت را کاهش می‌دهد">
      <svg viewBox="0 0 260 168" className="mx-auto block h-auto w-full" aria-hidden>
        {STEPS.map((s, i) => {
          const col = i < 7 ? 0 : 1;
          const row = i < 7 ? i : i - 7;
          const x = col === 0 ? 8 : 138;
          const y = 6 + row * 22;
          return (
            <g key={s}>
              <rect x={x} y={y} width="114" height="18" rx="2" fill="var(--color-paper)" stroke={ink} strokeWidth="0.7" />
              <text x={x + 16} y={y + 12.5} fontSize="7.2" fill={ink} fontFamily="Vazirmatn, sans-serif">
                {`${i + 1}. ${s}`}
              </text>
              {i < 6 ? <path d={`M${x + 57} ${y + 18} v4`} stroke={ink} strokeWidth="0.7" /> : null}
              {i === 6 ? <path d="M122 21 H132 V139 H138" fill="none" stroke={ink} strokeWidth="0.7" /> : null}
              {i > 6 && i < 12 ? <path d={`M${x + 57} ${y + 18} v4`} stroke={ink} strokeWidth="0.7" /> : null}
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

function LeatherGroups() {
  return (
    <Frame label="طبقه‌بندی بورس چرم — ماده اصلی معرق نوین در گروه دو است">
      <div className="grid grid-cols-2 gap-1.5 px-0.5 pb-0.5 font-vazir text-pt8 leading-snug text-ink">
        <div className="rounded-sm border border-rule/40 bg-paper p-1.5">
          <div className="mb-0.5 font-naskh text-pt9 text-leather">گروه یک — لطیف</div>
          میشین، آستر، نبوک، اشبالت، رویه و کراست. عمدتاً پوست گوسفند و بز. در معرق کاربری محدود.
        </div>
        <div className="rounded-sm border border-leather/50 bg-paper p-1.5">
          <div className="mb-0.5 font-naskh text-pt9 text-leather">گروه دو — زمخت</div>
          چرم کفی، زیره و کروپون. پوست گاو و شتر. ماده اصلی قطعات، تریشه، نوار و موتیف.
        </div>
      </div>
    </Frame>
  );
}

function LayerStack() {
  const layers = ["پوشش محافظ روسازی", "خال طلایی (ویترای)", "رنگ و سایه‌روشن", "سطح تثبیت‌شده چرم"];
  return (
    <Frame label="ترتیب لایه‌های نهایی سطح — خال‌زنی مستقل از روسازی است">
      <div className="mx-auto flex max-w-64 flex-col gap-1 px-1 pb-0.5">
        {layers.map((l, i) => (
          <div
            key={l}
            className="border border-rule/40 bg-paper px-2 py-1 text-center font-vazir text-pt8 text-ink"
            style={{ marginInline: `${i * 6}px` }}
          >
            {l}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function ResinRatios() {
  return (
    <Frame label="دو نسبت جدا — ادغام نشوند: رزین زیرکار ۱ به ۶ / غوطه‌وری محلول چسب چوب ۱ به ۵">
      <div className="grid grid-cols-2 gap-1.5 px-0.5 pb-0.5 font-vazir text-pt8 leading-snug text-ink">
        <div className="rounded-sm border border-rule/40 bg-paper p-1.5">
          <div className="font-naskh text-pt10 text-leather">رزین زیرکار ۱ : ۶</div>
          ترکیب چسب چوب و آب پس از تکمیل کامل معرق. قوام‌آوری نهایی در وضعیت دونم. روی همه آثار ساختاری.
        </div>
        <div className="rounded-sm border border-rule/40 bg-paper p-1.5">
          <div className="font-naskh text-pt10 text-leather">غوطه‌وری ۱ : ۵</div>
          محلول چسب چوب و آب ولرم؛ چند ثانیه غوطه‌وری کل سازه در برخی زیرکارها. مرحله‌ای متفاوت از رزین زیرکار.
        </div>
      </div>
    </Frame>
  );
}

function ChipFlow({ items, label }: { items: string[]; label: string }) {
  return (
    <Frame label={label}>
      <div className="flex flex-wrap items-center justify-center gap-1 px-1 pb-1 font-vazir text-pt7 text-ink">
        {items.map((it, i) => (
          <span key={it} className="flex items-center gap-1">
            <span className="border border-rule/50 bg-paper px-1.5 py-0.5">{it}</span>
            {i < items.length - 1 ? <span className="text-muted">←</span> : null}
          </span>
        ))}
      </div>
    </Frame>
  );
}

const MAP: Record<SchematicId, ComponentType> = {
  "golden-points": GoldenPoints,
  "three-lines": ThreeLines,
  "classic-composition": ClassicComposition,
  "process-13": Process13,
  "leather-groups": LeatherGroups,
  "layer-stack": LayerStack,
  "resin-ratios": ResinRatios,
  "workshop-flow": () =>
    ChipFlow({
      items: ["برش دستی / صنعتی", "چیدمان و ثابت‌سازی", "چسب و اتصال", "پرس و قوام‌آوری", "اندازه‌گیری و ایمنی"],
      label: "دسته‌بندی کلی ابزارها — از برش تا ایمنی",
    }),
  "book-cover-flow": () =>
    ChipFlow({
      items: [
        "جلد گالینگور",
        "برداشتن لایه رویی",
        "الگوسازی",
        "نوارکشی کادر",
        "پوشش پشت با جیر",
        "اجرای طرح",
        "تثبیت و رنگ",
        "کیلر",
      ],
      label: "مراحل ویژه اجرای روی جلد کتاب",
    }),
  "pattern-flow": () =>
    ChipFlow({
      items: ["طراحی پایه", "اسکیل", "الگوی کاغذی", "تفکیک مثبت/منفی", "شماره‌گذاری", "انتقال به چرم", "برش"],
      label: "نمودار جریان از طرح تا انتقال و برش",
    }),
};

export function Schematic({ id }: { id: SchematicId }) {
  const C = MAP[id];
  return <C />;
}
