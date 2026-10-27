
import type { KnowledgeCategory } from "@/lib/types";

export const knowledgeCategories: KnowledgeCategory[] = [
  { slug: "historia", name: "Historia", description: "Korzenie karate Kyokushin, jego twórca i rozwój na świecie.", sort_order: 1 },
  { slug: "zasady-i-etykieta", name: "Zasady i etykieta", description: "Dojo Kun, ukłony, zachowanie na sali i wobec innych.", sort_order: 2 },
  { slug: "stopnie-i-egzaminy", name: "Stopnie i egzaminy", description: "System kyu i dan, kolory pasów, przygotowanie do egzaminu.", sort_order: 3 },
  { slug: "wiedza-treningowa", name: "Wiedza treningowa", description: "Artykuły o technice, przygotowaniu fizycznym i zdrowiu.", sort_order: 4 },
];

export const seedArticles: any[] = [
  // Tutaj zostaw inne artykuły (historia, dojo-kun, etykieta), ale USEŃ wpis o systemie stopni
];
