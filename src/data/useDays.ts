import { useEffect, useState } from "react";
import type { DayEntry } from "../types";

export function useDays() {
  const [days, setDays] = useState<DayEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/days.json")
      .then(async (response) => {
        const text = await response.text();

        // Vérifie erreur HTTP
        if (!response.ok) {
          throw new Error(
            `Erreur HTTP ${response.status} : ${text.slice(0, 120)}`
          );
        }

        // Vérifie JSON valide
        try {
          return JSON.parse(text) as DayEntry[];
        } catch (err: any) {
          throw new Error(`JSON invalide : ${err.message}`);
        }
      })
      .then((data) => {
        setDays(data);
      })
      .catch((err: any) => {
        console.error(err);
        setError(String(err?.message ?? err));
      });
  }, []);

  return { days, error };
}