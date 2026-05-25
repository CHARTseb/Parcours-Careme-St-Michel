export type DayEntry = {
  id: number;
  date: string; // YYYY-MM-DD
  titre: string;

  reference_biblique?: string;

  texte_biblique?: string;

  reflexion?: string;

  resolution?: string;

  priere?: string | null;

  paroisse?: string | null;
};