export type SpecialId =
  | "combat"
  | "parcours-exodus"
  | "priere"
  | "heure-sainte"
  | "asceses"
  | "fraternite"
  | "pourquoi"
  | "guide-reunions"
  | "examen-conscience";

export type SpecialPage = {
  id: SpecialId;
  title: string;
  mdPath?: string;
  bodyMd?: string; // fallback / legacy
};

export const SPECIAL_PAGES: SpecialPage[] = [
  {
    id: "combat",
    title: "Le Plan de Combat",
    mdPath: "/specials/combat.md",
  },
  {
    id: "parcours-exodus",
    title: "Parcours carême St Michel",
    mdPath: "/specials/parcours-exodus.md",
  },
  {
    id: "priere",
    title: "La Prière",
    mdPath: "/specials/priere.md",
  },
  {
    id: "heure-sainte",
    title: "Prier une heure sainte",
    mdPath: "/specials/heure-sainte.md",
  },
  {
    id: "asceses",
    title: "Les Ascèses",
    mdPath: "/specials/asceses.md",
  },
  {
    id: "fraternite",
    title: "La Fraternité",
    mdPath: "/specials/fraternite.md",
  },
  {
    id: "pourquoi",
    title: "Votre appel",
    mdPath: "/specials/votre-pourquoi.md",
  },
  {
    id: "guide-reunions",
    title: "Guide des réunions",
    mdPath: "/specials/guide-reunions.md",
  },
  {
    id: "examen-conscience",
    title: "Examen de conscience",
    mdPath: "/specials/examen-conscience.md",
  },
];