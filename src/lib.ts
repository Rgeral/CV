import cv from "../data/cv-data.json";

export type Showcase = {
  order: number;
  code: string;
  diagram: "A" | "B" | "C" | "D";
  glyph?: string;
  zones: string[];
  steps: { label: string; text: string }[];
};

export const info = cv.personalInfo;
export const portfolio = cv.portfolio;
export const summary = cv.summary;
export const experiences = cv.experiences;

export const NAME = info.name.toUpperCase();
export const REGION = info.location.toUpperCase();
export const CITY = info.location.split(",")[0].toUpperCase();

export const projects = cv.projects
  .filter((p) => p.showcase)
  .map((p) => ({ ...p, showcase: p.showcase as Showcase }))
  .sort((a, b) => a.showcase.order - b.showcase.order);

export const url = (s: string) => (s.startsWith("http") ? s : `https://${s}`);

export const sections = [
  { key: "profile", label: "PROFILE" },
  { key: "projects", label: "PROJECTS" },
  { key: "experience", label: "EXPERIENCE" },
  { key: "skills", label: "SKILLS" },
  { key: "contact", label: "LET'S CHAT" },
];
