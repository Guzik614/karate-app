// Treści zakładki „O Klubie & Trenerze”. Edytuj je tutaj: puste pola nie są wyświetlane.
// Zdjęcia wrzucaj do public/klub/ i wpisuj ścieżkę w `src` (np. "/klub/sala.jpg").

export type Photo = { src: string | null; caption: string };

export const club = {
  name: "Dragon Fight Club Radom",
  founded: 2011,
  website: "https://dragonfightclubradom.pl/",
  lead: "Klub sportów walki w Radomiu, założony w 2011 roku przez sensei Łukasza Guzika. Trenują u nas dzieci, młodzież i dorośli: od pierwszego treningu po starty w zawodach.",
  about: [
    "Dragon Fight Club to miejsce, w którym tradycja karate Kyokushin spotyka się z nowoczesnym treningiem sportów walki. Na zajęciach stawiamy na technikę, kondycję i charakter, a atmosfera dojo opiera się na szacunku i zasadach Dojo Kun.",
    "Zajęcia prowadzimy w grupach dopasowanych do wieku i poziomu zaawansowania, więc każdy znajdzie trening dla siebie.",
  ],
  disciplines: [
    { name: "Karate Kyokushin", description: "Tradycyjne karate pełnego kontaktu: kihon, kata, kumite i egzaminy na stopnie." },
    { name: "Kickboxing", description: "Dynamiczny trening uderzeń rękami i nogami, także w formule K1." },
    { name: "Boxing", description: "Praca rąk, poruszanie się i obrona. Trening na worku, tarczach i w sparingu." },
    { name: "Capoeira", description: "Brazylijska sztuka walki łącząca akrobatykę, muzykę i ruch." },
    { name: "Fitness", description: "Zajęcia ogólnorozwojowe i kondycyjne inspirowane sportami walki." },
  ],
};

export const coach = {
  name: "Łukasz Guzik",
  title: "Sensei · założyciel i główny trener",
  photo: null as string | null, // np. "/klub/trener.jpg"
  ranks: ["2 dan Karate Kyokushin"],
  bio: [
    "Wieloletni zawodnik i instruktor karate Kyokushin. W 2011 roku założył w Radomiu Dragon Fight Club, w którym prowadzi treningi karate i sportów walki dla dzieci, młodzieży i dorosłych.",
    "Jako trener łączy doświadczenie startowe z pracą z początkującymi: od pierwszych kroków w kihon po przygotowanie zawodników do turniejów i egzaminów.",
  ],
  // Osiągnięcia sportowe: uzupełnij listę (rok, zawody, wynik).
  achievements: [] as string[],
};

export const photos: Photo[] = [
  { src: null, caption: "Sala treningowa" },
  { src: null, caption: "Zajęcia karate Kyokushin" },
  { src: null, caption: "Ring" },
  { src: null, caption: "Grupa dziecięca" },
  { src: null, caption: "Zawody i egzaminy" },
  { src: null, caption: "Obóz letni" },
];

export const contact = {
  // Dane kontaktowe: puste pola są ukrywane na stronie.
  address: "",
  city: "Radom",
  phone: "",
  email: "",
  facebook: "",
  instagram: "",
  // Zapytanie do mapy Google (nazwa klubu lub dokładny adres).
  mapQuery: "Dragon Fight Club Radom",
};
