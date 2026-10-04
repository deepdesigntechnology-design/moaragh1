export type Block =
  | { t: "kicker"; text: string }
  | { t: "h1"; text: string }
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "p"; text: string }
  | { t: "lead"; text: string }
  | { t: "note"; text: string }
  | { t: "warn"; text: string }
  | { t: "caption"; text: string }
  | { t: "quote"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "dl"; items: { dt: string; dd: string }[] }
  | { t: "table"; caption: string; cols: string[]; rows: string[][] }
  | { t: "steps"; items: { n: string; title: string; body: string }[] }
  | { t: "schematic"; id: SchematicId }
  | { t: "rule" }
  | { t: "cols"; left: Block[]; right: Block[] };

export type SchematicId =
  | "golden-points"
  | "three-lines"
  | "classic-composition"
  | "process-13"
  | "leather-groups"
  | "layer-stack"
  | "resin-ratios"
  | "workshop-flow"
  | "book-cover-flow"
  | "pattern-flow";

export type BookPage = {
  id: string;
  folio: string;
  running: string;
  kind?: "cover" | "front" | "body";
  blocks: Block[];
};
