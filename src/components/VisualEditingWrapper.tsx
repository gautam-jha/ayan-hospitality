"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const VisualEditing = dynamic(
  () => import("@sanity/visual-editing/react").then((mod) => ({ default: mod.VisualEditing })),
  { ssr: false }
);

export function VisualEditingWrapper() {
  const [inIframe, setInIframe] = useState(false);

  useEffect(() => {
    // Check if the current window is running inside an iframe
    // and verify it is opened by Sanity Studio
    if (
      window.self !== window.top &&
      (document.referrer.includes("sanity.studio") || document.referrer.includes("sanity.io"))
    ) {
      setInIframe(true);
    }
  }, []);

  if (!inIframe) {
    return null;
  }

  return <VisualEditing portal />;
}
