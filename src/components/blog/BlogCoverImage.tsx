import { useState, useEffect } from "react";
import Image from "next/image";

interface BlogCoverImageProps {
  src?: string | null;
  category?: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export const DEFAULT_CATEGORY_COVERS: Record<string, string> = {
  Architecture: "/assets/images/lab/ai-code-review.jpg",
  Engineering: "/assets/images/lab/ai-agents.jpg",
  "AI & ML": "/assets/images/lab/simple-wallet.jpg",
  Web3: "/assets/images/lab/simple-wallet.jpg",
  Leadership: "/assets/images/lab/brongwood.jpg",
};

export const FALLBACK_DEFAULT_COVER = "/assets/images/lab/ai-code-review.jpg";

export function getDefaultCover(category?: string): string {
  if (category && DEFAULT_CATEGORY_COVERS[category]) {
    return DEFAULT_CATEGORY_COVERS[category];
  }
  return FALLBACK_DEFAULT_COVER;
}

export default function BlogCoverImage({
  src,
  category,
  alt,
  priority = false,
  className = "object-cover object-top transition-transform duration-500 group-hover:scale-103",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: BlogCoverImageProps) {
  const fallback = getDefaultCover(category);
  const validSrc = src && src.trim() !== "" ? src : fallback;
  const [currentSrc, setCurrentSrc] = useState(validSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const nextValid = src && src.trim() !== "" ? src : fallback;
    setCurrentSrc(nextValid);
    setHasError(false);
  }, [src, fallback]);

  const handleError = () => {
    if (!hasError && currentSrc !== fallback) {
      setCurrentSrc(fallback);
      setHasError(true);
    }
  };

  const isExternal =
    currentSrc.startsWith("http://") || currentSrc.startsWith("https://");

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
      onError={handleError}
      unoptimized={isExternal}
    />
  );
}
