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
    // Rely exclusively on the robust iframe check, because browser Referrer-Policy
    // often strips document.referrer during cross-domain Next.js api route redirects.
    if (window.self !== window.top) {
      setInIframe(true);
    }
  }, []);

  if (!inIframe) {
    return null;
  }

  return <VisualEditing portal />;
}
