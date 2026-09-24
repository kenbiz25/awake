import type { Metadata } from "next";
import { site } from "./site";

/**
 * One place to build page metadata.
 * A page-level `openGraph` object *replaces* the parent's, dropping the inherited /opengraph-image,
 * so every page goes through here to keep share cards, canonicals and Twitter cards consistent.
 * Keep titles ≤ 60 and descriptions ≤ 160 characters — Google truncates beyond that.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  if (process.env.NODE_ENV !== "production" && (title.length > 60 || description.length > 160)) {
    console.warn(`[seo] ${path}: title ${title.length}/60, description ${description.length}/160`);
  }
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — The smarter way to build and scale` };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type, siteName: site.name, locale: "en_KE", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}
