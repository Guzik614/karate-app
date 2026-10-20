import type { Technique } from "@/lib/types";

// Przykładowe techniki i program. Wideo podpinasz w panelu admina (upload do Mux).

type SeedTechnique = Omit<Technique, "id" | "mux_playback_id">;

export const seedTechniques: SeedTechnique[] = [
  {
    slug: "seiken-chudan-tsuki",
    name: "Seiken chudan tsuki",
    name_jp: "正拳中段突き",
    category: "kihon",
    subcategory: "tsuki",
    belt_level: "10 kyu",
    description:
      "Prosty cios pięścią na poziom środkowy. Uderzasz dwoma pierwszymi kostkami, ramię prowadzisz po najkrótszej drodze, a druga ręka wraca do biodra (hikite).",
    sort_order: 1,
  },
  {
    slug: "uraken-ganmen-uchi",
    name: "Uraken ganmen uchi",
    name_jp: "裏拳顔面打ち",
    category: "kihon",
    subcategory: "uchi",
    belt_level: "10 kyu",
    description:
      "Uderzenie grzbietem pięści w twarz. Ruch jest biczowy: łokieć prowadzi, a nadgarstek strzela na końcu.",
    sort_order: 2,
  },
  {
    slug: "mae-geri",
    name: "Mae geri chudan",
    name_jp: "前蹴り中段",
    category: "kihon",
    subcategory: "geri",
    belt_level: "10 kyu",
    description:
      "Kopnięcie wprost na poziom środkowy, poduszką stopy. Unieś kolano wysoko, wyprostuj nogę i szybko ją cofnij.",
    sort_order: 3,
  },
  {
    slug: "gedan-barai",
    name: "Gedan barai",
    name_jp: "下段払い",
    category: "kihon",
    subcategory: "uke",
    belt_level: "10 kyu",
    description: "Blok dolny zmiatający. Ręka startuje od przeciwległego ucha i zmiata w dół nad kolanem.",
    sort_order: 4,
  },
  {
    slug: "taikyoku-sono-ichi",
    name: "Taikyoku sono ichi",
    name_jp: "太極その一",
    category: "kata",
    subcategory: null,
    belt_level: "10 kyu",
    description:
      "Pierwsze kata w Kyokushin. Uczy podstawowego przemieszczania się w kształcie litery H z gedan barai i seiken oi tsuki.",
    sort_order: 1,
  },
  {
    slug: "sanbon-kumite-jodan",
    name: "Sanbon kumite jodan",
    name_jp: "三本組手上段",
    category: "kihon_kumite",
    subcategory: null,
    belt_level: "9 kyu",
    description:
      "Trzy ataki seiken jodan oi tsuki i trzy bloki jodan uke z kontrą na koniec. Uczy dystansu i timingu.",
    sort_order: 1,
  },
];

export const seedPrograms = [
  {
    slug: "start-10-kyu",
    title: "Start: przygotowanie do 10 kyu",
    description:
      "Czterotygodniowy program dla początkujących: podstawowe ciosy, bloki, kopnięcia i pierwsze kata.",
    level: "Początkujący",
    duration_weeks: 4,
    items: [
      { day: 1, technique: "seiken-chudan-tsuki", reps: "3 × 20 na stronę", notes: "Pilnuj powrotu ręki do biodra." },
      { day: 1, technique: "gedan-barai", reps: "3 × 15 na stronę", notes: null },
      { day: 2, technique: "mae-geri", reps: "3 × 10 na nogę", notes: "Najpierw wolno, potem z kiai." },
      { day: 2, technique: "uraken-ganmen-uchi", reps: "3 × 15 na stronę", notes: null },
      { day: 3, technique: "taikyoku-sono-ichi", reps: "5 powtórzeń", notes: "Licz kroki na głos." },
    ],
  },
];
