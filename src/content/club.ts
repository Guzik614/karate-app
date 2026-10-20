// Treści zakładki „O Klubie & Trenerze”. Edytuj je tutaj: puste pola nie są wyświetlane.
// Zdjęcia trzymamy w public/klub/ i podajemy ścieżkę od /klub/…

export type Photo = { src: string; caption: string };

export type TeamMember = {
  name: string;
  rank?: string; // np. "2 dan" – wyświetlany jako czarny pas
  role: string;
  bio: string;
  achievements?: string[];
  photo?: string;
};

export const club = {
  name: "Dragon Fight Club Radom",
  founded: 2011,
  traditionYears: 40,
  website: "https://dragonfightclubradom.pl/",
  heroImage: "/klub/ring-mural.jpg",
  motto: "My o sporcie nie tylko gadamy – my go po prostu robimy.",
  lead: "Kompleksowe centrum sportów walki w Radomiu: karate Kyokushin, kickboxing, boks, capoeira, trening hybrydowy i Akademia 50+. Za nami 40 lat rodzinnej tradycji i realne wyniki na matach całego kraju.",
  history: [
    "Nasza historia zaczęła się cztery dekady temu, kiedy Shihan Mirek Guzik otworzył radomski klub Kyokushin Karate. W 2011 roku jego syn, Sensei Łukasz Guzik, kontynuował tę misję i powołał do życia Dragon Fight Club Radom.",
    "Rozszerzyliśmy wtedy ofertę i stworzyliśmy kompleksowe centrum sportowe: doszły treningi kickboxingu, boksu i capoeiry, specjalna strefa treningu hybrydowego oraz zajęcia dla osób powyżej 50. roku życia.",
    "To, co nas wyróżnia, to autentyczność. Nie tylko wymagamy od naszych klubowiczów, ale sami jesteśmy dla nich przykładem: codziennie trenujemy, trzymamy żelazną formę i udowadniamy na własnej skórze, że nasze metody działają.",
  ],
  stats: [
    { value: "40 lat", label: "rodzinnej tradycji" },
    { value: "2011", label: "start Dragon Fight Club" },
    { value: "3", label: "czarne pasy na macie" },
    { value: "6", label: "sekcji treningowych" },
  ],
  disciplines: [
    { name: "Karate Kyokushin", description: "Tradycyjne karate pełnego kontaktu: kihon, kata, kumite i egzaminy na stopnie." },
    { name: "Kickboxing (K1)", description: "Dynamiczny trening uderzeń rękami, nogami i kolanami w formule K1." },
    { name: "Boks", description: "Praca rąk, poruszanie się i obrona. Trening na worku, tarczach i w ringu." },
    { name: "Capoeira", description: "Brazylijska sztuka walki łącząca akrobatykę, muzykę i ruch." },
    {
      name: "Trening hybrydowy",
      description: "Kompleksowy rozwój całego ciała: siła, żelazna kondycja, wytrzymałość i stabilizacja w jednym systemie.",
    },
    { name: "Akademia 50+", description: "Specjalistyczne treningi ogólnorozwojowe dla osób powyżej 50. roku życia." },
  ],
};

export const team: TeamMember[] = [
  {
    name: "Łukasz Guzik",
    rank: "2 dan",
    role: "Sensei · założyciel i prezes klubu",
    bio: "Wszechstronny zawodnik i instruktor. W 2011 roku założył Dragon Fight Club Radom, kontynuując rodzinną tradycję Kyokushin.",
    achievements: [
      "Multimedalista Mistrzostw Polski w karate Kyokushin",
      "Multimedalista Mistrzostw Polski w kickboxingu (formuła K1)",
      "Wicemistrz Pucharu Europy w MMA",
      "Wicemistrz Polski ADCC w grapplingu",
    ],
  },
  {
    name: "Mirek Guzik",
    rank: "5 dan",
    role: "Shihan · Akademia 50+",
    bio: "Filar naszej tradycji i wielokrotny medalista Mistrzostw Polski. Cztery dekady temu otworzył radomski klub Kyokushin Karate.",
  },
  {
    name: "Iwona Guzik",
    rank: "1 dan",
    role: "Sensei · Akademia 50+",
    bio: "Posiadaczka czarnego pasa. Razem z Shihanem Mirkiem prowadzi Akademię 50+ i jest żywym dowodem, że sport daje formę i witalność na długie lata.",
  },
  {
    name: "Marcin Pluta",
    role: "Główny trener kickboxingu",
    bio: "Wielokrotny medalista Mistrzostw Polski, który swoje umiejętności udowadniał w ringu.",
  },
  {
    name: "Jakub Opiłowski",
    role: "Trener boksu",
    bio: "Klubowy wychowanek. Zaczynał na naszej macie, a dziś, stale podnosząc kwalifikacje, szkoli kolejne pokolenia.",
  },
  {
    name: "Jarek Dziewierz „ET”",
    role: "Trener capoeiry",
    bio: "Jedyny taki trener w Radomiu. Specjalista z ogromnym doświadczeniem, który z pasją prowadzi sekcję capoeiry.",
  },
];

export const academy50 = {
  title: "Akademia 50+",
  lead: "Specjalistyczne zajęcia ogólnorozwojowe dla osób, które chcą aktywnie dbać o zdrowie, formę i witalność. Nie przygotowujemy tu do zawodów: celem jest, by każdy czuł się świetnie we własnym ciele i zachował pełną sprawność na długie lata.",
  points: [
    {
      title: "Bezpieczny rozwój",
      text: "Budujemy siłę, wytrzymałość i kondycję w sposób dostosowany do możliwości i potrzeb organizmu.",
    },
    {
      title: "Zdrowie psychiczne",
      text: "Ruch to najlepszy sposób na redukcję stresu, dotlenienie organizmu i codzienne dobre samopoczucie.",
    },
    {
      title: "Autentyczni prowadzący",
      text: "Zajęcia prowadzą instruktorzy, którzy sami są w wieku emerytalnym i dają żywy przykład, że aktywność to forma na całe życie.",
    },
    {
      title: "Społeczność",
      text: "Wspierająca atmosfera na sali, w której każdy znajdzie swoje tempo bez niepotrzebnej presji.",
    },
  ],
  closing: "Wiek to tylko liczba, a na ruch i dobre zdrowie nigdy nie jest za późno.",
};

export const photos: Photo[] = [
  { src: "/klub/sala-ring.jpg", caption: "Sala z ringiem" },
  { src: "/klub/ring.jpg", caption: "Ring" },
  { src: "/klub/strefa-hybrydowa.jpg", caption: "Strefa treningu hybrydowego" },
  { src: "/klub/sala-worki.jpg", caption: "Strefa worków" },
  { src: "/klub/neon-kakuto.jpg", caption: "格闘 – walka" },
  { src: "/klub/be-stronger.jpg", caption: "Be stronger than your excuses" },
  { src: "/klub/sala-panorama.jpg", caption: "Sala treningowa" },
  { src: "/klub/naroznik-ringu.jpg", caption: "Narożnik ringu" },
  { src: "/klub/neon-samuraj.jpg", caption: "Strefa drabinek" },
];

export const contact = {
  // Puste pola są ukrywane na stronie.
  address: "ul. Tybla 10",
  city: "Radom",
  phone: "790 813 281",
  whatsapp: "48790813281",
  email: "kontakt@dragonfightclub.pl",
  facebook: "",
  instagram: "",
  mapQuery: "Dragon Fight Club, Tybla 10, Radom",
};
