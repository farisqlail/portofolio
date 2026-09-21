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
  Engineering: "/assets/images/categories/engineering.jpg",
  Architecture: "/assets/images/categories/architecture.jpg",
  "AI & ML": "/assets/images/categories/ai-ml.jpg",
  Web3: "/assets/images/categories/web3.jpg",
  Leadership: "/assets/images/categories/leadership.jpg",
};

export const FALLBACK_DEFAULT_COVER = "/assets/images/categories/engineering.jpg";

export function getDefaultCover(category?: string): string {
  if (!category) return FALLBACK_DEFAULT_COVER;
  const match = Object.entries(DEFAULT_CATEGORY_COVERS).find(
    ([k]) => k.toLowerCase() === category.trim().toLowerCase()
  );
  return match ? match[1] : FALLBACK_DEFAULT_COVER;
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
