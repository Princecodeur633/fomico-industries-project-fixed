export interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  department: string;
  description: string;
  requirements: string[];
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Ingénieur Commercial Industriel",
    location: "Brazzaville",
    type: "CDI",
    department: "Commercial",
    description:
      "Développement du portefeuille clients B2B dans le secteur industriel. Prospection, négociation et suivi des grands comptes.",
    requirements: ["Bac+5 Commerce/Ingénierie", "5 ans expérience B2B industriel", "Anglais courant", "Permis B"],
  },
  {
    id: 2,
    title: "Technicien Hydraulique",
    location: "Pointe-Noire",
    type: "CDI",
    department: "Technique",
    description:
      "Maintenance, diagnostic et réparation de systèmes hydrauliques sur site client. Intervention en offshore et onshore.",
    requirements: ["Bac+2 Maintenance", "3 ans expérience hydraulique", "Habilitation travail en hauteur", "Disponibilité 24/7"],
  },
  {
    id: 3,
    title: "Responsable Logistique CEMAC",
    location: "Brazzaville",
    type: "CDI",
    department: "Logistique",
    description:
      "Gestion de la chaîne logistique internationale, dédouanement et coordination des livraisons multi-pays.",
    requirements: ["Bac+5 Logistique/Transport", "5 ans expérience internationale", "Connaissance douanes CEMAC", "Anglais courant"],
  },
  {
    id: 4,
    title: "Assistant(e) Achats Industriels",
    location: "Brazzaville",
    type: "CDD",
    department: "Achats",
    description:
      "Sourcing de fournisseurs, négociation des conditions, suivi des commandes et gestion des stocks.",
    requirements: ["Bac+3 Achats/Commerce", "2 ans expérience achats industriels", "Maîtrise ERP", "Rigoureux(se)"],
  },
];

export function getJobById(id: number): Job | undefined {
  return jobs.find((job) => job.id === id);
}
