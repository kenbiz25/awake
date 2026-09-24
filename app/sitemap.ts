import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { SOLUTIONS } from "@/lib/solutions";
import { INDUSTRIES } from "@/lib/industries";
import { CASE_STUDIES } from "@/lib/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: new URL(path, site.url).toString(),
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    ...SOLUTIONS.map((s) => entry(`/solutions/${s.slug}`, 0.9)),
    ...INDUSTRIES.map((i) => entry(`/industries/${i.slug}`, 0.8)),
    entry("/case-studies", 0.8, "weekly"),
    ...CASE_STUDIES.map((c) => entry(`/case-studies/${c.slug}`, 0.7)),
    entry("/pricing", 0.8),
    entry("/contact", 0.7),
    entry("/security", 0.4, "yearly"),
  ];
}
