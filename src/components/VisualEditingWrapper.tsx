"use client";

"use client";

import { useIsPresentationTool } from "next-sanity/hooks";
import { VisualEditing } from "next-sanity/visual-editing/client-component";

export function VisualEditingWrapper() {
  const isPresentationTool = useIsPresentationTool();

  if (!isPresentationTool) return null;

  return <VisualEditing />;
}
