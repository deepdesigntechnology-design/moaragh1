import { createFileRoute } from "@tanstack/react-router";
import { BookletViewer } from "@/components/booklet/viewer";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <BookletViewer />;
}
