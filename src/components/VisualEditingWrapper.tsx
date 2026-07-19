"use client";

import dynamic from "next/dynamic";

const VisualEditing = dynamic(
  () => import("@sanity/visual-editing/react").then((mod) => ({ default: mod.VisualEditing })),
  { ssr: false }
);

export function VisualEditingWrapper() {
  return <VisualEditing portal />;
}
