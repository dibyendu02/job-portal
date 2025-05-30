/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

type Position =
  | "Frontend Developer"
  | "Backend Engineer"
  | "Full Stack Developer"
  | "DevOps Engineer"
  | "Product Manager"
  | "UI/UX Designer";

interface Company {
  name: string;
  logo: string;
}

interface Job {
  id: number;
  title: Position;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  posted: string;
  shortDescription: string;
  longDescription: string;
  skills: string[];
}

const positions: Position[] = [
  "Frontend Developer",
  "Backend Engineer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Product Manager",
  "UI/UX Designer",
];

const companies: Company[] = [
  {
    name: "TechCorp",
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQFoGfXpB-oDTQ/company-logo_200_200/company-logo_200_200/0/1631305481850?e=2147483647&v=beta&t=dv3Og_RiKhBUxJXkKYxTcggE1CnEksdrS8EzS_mnXPw",
  },
  {
    name: "InnovateX",
    logo: "data:image/png;base64,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",
  },
  {
    name: "Fordel Studios",
    logo: "data:image/jpeg;base64,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",
  },
  { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
  { name: "Apple", logo: "https://logo.clearbit.com/apple.com" },
  { name: "Google", logo: "https://logo.clearbit.com/google.com" },
];

const locations = [
  "Remote",
  "San Francisco, CA",
  "Austin, TX",
  "New York, NY",
  "Berlin, Germany",
];

const skillsMap: Record<Position, string[]> = {
  "Frontend Developer": ["React", "TypeScript", "HTML", "CSS", "Tailwind"],
  "Backend Engineer": ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST"],
  "Full Stack Developer": ["Next.js", "GraphQL", "Prisma", "Docker"],
  "DevOps Engineer": ["AWS", "Kubernetes", "CI/CD", "Terraform"],
  "Product Manager": ["Agile", "Scrum", "Product Strategy", "Analytics"],
  "UI/UX Designer": ["Figma", "User Research", "Prototyping", "Design Systems"],
};

function generateJobs(count: number): Job[] {
  const jobs: Job[] = [];

  for (let i = 1; i <= count; i++) {
    const position = positions[i % positions.length];
    const company = companies[i % companies.length];
    const location = locations[i % locations.length];
    const skills = skillsMap[position];

    jobs.push({
      id: i,
      title: position,
      company: company.name,
      companyLogo: company.logo,
      location,
      salary: `$${70_000 + (i % 10) * 5_000}`,
      posted: `2025-05-${String((i % 28) + 1).padStart(2, "0")}`,
      shortDescription: `Join us as a ${position} and help build next-gen solutions.`,
      longDescription: `As a ${position}, you’ll work with a world-class team to deliver impactful products at scale. Collaborate across departments, own your code, and help shape the future of technology.`,
      skills,
    });
  }

  return jobs;
}

const data = generateJobs(100);
const filePath = path.join(process.cwd(), "data", "jobs.json");

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`✅ Successfully generated ${data.length} jobs at ${filePath}`);
