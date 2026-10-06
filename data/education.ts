import type { Certification, Education } from "@/types/education";

export const EDUCATION: Education[] = [
  {
    id: "edu-msc",
    qualification: "M.Sc. in Computer Science",
    institution: "Thiagarajar College",
    location: "Madurai",
    period: { start: "2023", end: "2025" },
    score: "81.07%",
    focus: ["MERN Stack", "Administrative Skills"],
  },
  {
    id: "edu-bsc",
    qualification: "B.Sc. in Information Technology",
    institution: "The Madura College",
    location: "Madurai",
    period: { start: "2020", end: "2023" },
    score: "78.09%",
    focus: ["Database Management", "Web Technologies"],
  },
  {
    id: "edu-hsc",
    qualification: "HSC",
    institution: "Anantha Memorial Matric Hr. Sec. School",
    period: { start: "2019", end: "2020" },
    score: "59.66%",
    focus: ["Computer Science", "Mathematics", "Physics", "Chemistry"],
  },
  {
    id: "edu-sslc",
    qualification: "SSLC",
    institution: "Britto Matric School",
    period: { start: "2017", end: "2018" },
    score: "73%",
    focus: ["Mathematics", "Science", "Social Studies", "Languages"],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-ai-fullstack",
    name: "AI Full Stack Development",
    issuer: "LinkedIn Learning",
  },
];
