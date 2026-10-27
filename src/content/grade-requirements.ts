// Wymagania egzaminacyjne Polskiej Organizacji Karate Kyokushin (KWF – Kyokushin World Federation).
// Źródła:
//   juniorzy 10.1–9.3: https://www.karate.org.pl/kyokushin/wym_jun.php
//   juniorzy 8.1–5.3:  tabela „Wymagania do 14 lat” w tym samym układzie (karatemarkowa.pl)
//   dan:               https://www.karate.org.pl/kyokushin/wym_sen.php („Aktualne wymagania”)
// Seniorskie kyu (10–1) organizacja publikuje jako grafikę – dopiszemy je po otrzymaniu tabeli.
// Każdy stopień obejmuje też wymagania wszystkich niższych stopni.

type Requirements = {
  pozycje?: string;
  uderzenia?: string;
  bloki?: string;
  kopniecia?: string;
  renraku?: string;
  kumite?: string;
  kata?: string;
  sprawnosc?: string;
  teoria?: string;
  staz?: string;
  wiek?: string;
  oboz?: string;
  inne?: string[];
};

const LABELS: [keyof Requirements, string][] = [
  ["staz", "Staż"],
  ["wiek", "Wiek"],
  ["pozycje", "Pozycje (dachi)"],
  ["uderzenia", "Uderzenia i cięcia"],
  ["bloki", "Bloki (uke)"],
  ["kopniecia", "Kopnięcia (geri)"],
  ["renraku", "Renraku"],
  ["kata", "Kata"],
  ["kumite", "Kumite"],
  ["sprawnosc", "Test sprawności"],
  ["teoria", "Teoria i komendy"],
  ["oboz", "Obozy KWF"],
];

const requirements: Record<string, Requirements> = {
  "J-10.1": {
    pozycje: "Fudo-dachi",
    uderzenia: "Morote-tsuki jodan / chudan / gedan",
    kopniecia: "Hiza-geri chudan",
    sprawnosc: "50 × zaciskanie pięści. 10 przysiadów: obciążone całe stopy, ręce dowolnie.",
    teoria: "Zasady bezpieczeństwa: sala, szatnia, ubiór itp. Strefy: jodan, chudan, gedan. Znaczenie słowa Kiai – okrzyk.",
  },
  "J-10.2": {
    pozycje: "Zenkutsu-dachi",
    uderzenia: "Uraken-shomen-uchi",
    bloki: "Morote gedan-barai",
    kopniecia: "Hiza-geri chudan plus kiai",
    renraku: "Krok w tył do zenkutsu-dachi i powrót do fudo-dachi",
    sprawnosc: "10 skłonów w przód z leżenia na plecach, ręce dowolnie.",
    teoria: "Pozycja seiza: siadanie i wstawanie, ukłony. Znaczenie słowa Naore – powrót.",
  },
  "J-10.3": {
    pozycje: "Heiko-dachi, yoi-dachi",
    uderzenia: "Seiken-tsuki jodan / chudan / gedan",
    bloki: "Gedan-barai",
    kopniecia: "Hiza-geri jodan plus kiai",
    renraku: "Krok w tył do zenkutsu-dachi z morote gedan-barai / gedan-barai i powrót do fudo-dachi",
    sprawnosc: "10 ugięć ramion z leżenia przodem w podporze na dłoniach i kolanach.",
    teoria: "Znaczenie słowa Karate: Kara – pusty, Te – ręka. Znaczenie słowa Osu – akceptacja, pozdrowienie itp.",
  },
  "J-9.1": {
    pozycje: "Heisoku-dachi",
    uderzenia: "Oi-tsuki jodan / chudan / gedan",
    bloki: "Jodan-uke",
    kopniecia: "Mae-keage",
    renraku: "Trzy kroki w przód i w tył w zenkutsu-dachi z oi-tsuki",
    sprawnosc:
      "20 przysiadów: obciążone całe stopy, ręce zaplecione na karku, tułów pionowo. 10 wahnięć w formie kołyski na brzuchu z leżenia przodem.",
    teoria: "Prawidłowy wygląd karategi i wiązanie pasa. Liczenie po japońsku do 10.",
  },
  "J-9.2": {
    pozycje: "Musubi-dachi",
    uderzenia: "Gyaku-tsuki jodan / chudan / gedan",
    bloki: "Soto-uke",
    kopniecia: "Kin-geri",
    renraku: "Trzy kroki w przód i w tył w zenkutsu-dachi z gyaku-tsuki",
    sprawnosc:
      "10 skłonów w przód z leżenia na plecach, ręce zaplecione na karku, tułów prosty. 10 wahnięć w formie kołyski na plecach z przysiadu, ręce zaplecione wokół kolan.",
    teoria: "Znaczenie słów: Sensei – nauczyciel, Shihan – nauczyciel mistrz, Sempai – starszy rangą.",
  },
  "J-9.3": {
    pozycje: "Nekoashi-dachi",
    uderzenia: "Seiken-ago-uchi",
    bloki: "Uchi-uke",
    kopniecia: "Mae-geri chudan",
    renraku: "Trzy kroki w przód w zenkutsu-dachi z oi-tsuki / gyaku-tsuki / uke, obrót z gedan-barai",
    sprawnosc:
      "10 ugięć ramion z leżenia przodem w podporze na pięściach i kolanach. 10 wahnięć w formie kołyski na plecach z przysiadu, ręce pod kątem 45° amortyzują pad w tył.",
    teoria: "Znaczenie słowa Kyoku-shin-kai.",
  },
  "J-8.1": {
    pozycje: "Kokutsu-dachi",
    uderzenia: "Shuto-sakotsu-uchi-komi",
    kopniecia: "Soto-keage",
    renraku: "Trzy kroki w przód w zenkutsu-dachi z keri, obrót z morote gedan-barai",
    sprawnosc: "10 przewrotów w przód. 30 sekund mostka w tył z leżenia na plecach.",
    teoria: "Przysięga dojo.",
  },
  "J-8.2": {
    pozycje: "Moroashi-dachi, uchi-hachiji-dachi",
    uderzenia: "Shuto-sakotsu-uchi",
    kopniecia: "Uchi-keage",
    renraku: "Krok w tył do zenkutsu-dachi z gedan-barai plus gyaku-tsuki i powrót do fudo-dachi",
    sprawnosc:
      "10 przewrotów w tył. 10 razy po 20 sekund rozciągania w maksymalnym rozkroku ze skrętem w lewo i w prawo (szpagat).",
    teoria: "Oddychanie – nogare I.",
  },
  "J-8.3": {
    pozycje: "Sanchin-dachi",
    uderzenia: "Shuto-ganmen-uchi",
    kopniecia: "Mae-geri jodan",
    renraku: "Trzy kroki w przód w zenkutsu-dachi z uke plus gyaku-tsuki, obrót z gedan-barai",
    kata: "Kihon kata I",
    sprawnosc:
      "10 gwiazd gimnastycznych. 10 razy dotknąć głową podłogi w skłonie w przód, siedząc w maksymalnie szerokim rozkroku, nogi proste w kolanach.",
    teoria: "Nogare II.",
  },
  "J-7.1": {
    pozycje: "Kiba-dachi",
    uderzenia: "Uraken-sayu-uchi, uraken-hizo-uchi",
    kopniecia: "Kansetsu-geri",
    renraku: "Trzy kroki w przód w sanchin-dachi z tsuki / uchi / keri / uke, obrót poprzez przekrok",
    kata: "Taikyoku I",
    sprawnosc: "10 razy zamach nogą i przejście do stania na rękach pod drabinkami.",
    teoria: "Oddychanie – ibuki.",
  },
  "J-7.2": {
    pozycje: "Tsuruashi-dachi",
    uderzenia: "Uraken-yoko-uchi jodan / chudan",
    kopniecia: "Kakato-geri",
    renraku: "Trzy kroki w przód w zenkutsu-dachi z mae-geri plus gyaku-tsuki, obrót z morote gedan-barai",
    kata: "Taikyoku II",
    sprawnosc: "15 sekund stania na rękach pod drabinkami.",
    teoria: "Etykieta dojo.",
  },
  "J-7.3": {
    pozycje: "Kake-dachi",
    uderzenia: "Shuto-mawashi-uchi",
    bloki: "Shuto-mawashi-uke",
    kopniecia: "Yoko-keage, ushiro-keage",
    renraku: "Trzy kroki w przód w kokutsu-dachi z shuto-mawashi-uke, obrót poprzez przekrok",
    kata: "Sakugi I",
    teoria: "Historia karate Kyokushin i Sosai Masutatsu Oyamy.",
  },
  "J-6.1": {
    pozycje: "Pozycja walki",
    uderzenia: "Seiken-tate-tsuki jodan / chudan / gedan",
    kopniecia: "Mawashi-geri gedan",
    renraku: "Trzy kroki w przód w pozycji walki z gyaku tate-tsuki, obrót poprzez zakrok",
    kumite: "5 × 1 minuta",
    kata: "Sakugi II",
    sprawnosc: "10 razy scyzoryk w zwisie tyłem na drabinkach. 60 sekund szpagatu w bok na piętach.",
  },
  "J-6.2": {
    pozycje: "Krok dostawny w pozycji walki",
    uderzenia: "Tettsui-hizo-uchi, tettsui-yoko-uchi jodan / chudan / gedan",
    kopniecia: "Mawashi-geri chudan",
    renraku: "Trzy kroki w przód w zenkutsu-dachi z mae-keage / yoko-keage / soto-keage plus gyaku-tsuki, obrót",
    kumite: "10 × 1 minuta",
    kata: "Taikyoku III",
    sprawnosc: "10 przeskoków z przysiadu przez partnera klęczącego na kolanach i rękach, z obrotem.",
    teoria: "Wiedza o światowej organizacji karate.",
  },
  "J-6.3": {
    pozycje: "Przekrok i zakrok w pozycji walki",
    uderzenia: "Tettsui-komekami-uchi, uraken-shita-tsuki",
    bloki: "Osae-uke",
    kopniecia: "Mawashi-geri jodan",
    renraku: "Trzy kroki w przód w zenkutsu-dachi z kin-geri / mae-geri / mawashi-geri plus gyaku-tsuki, obrót",
    kumite: "15 × 1 minuta",
    kata: "Pinan I",
    sprawnosc: "10 przeskoków w przód i w tył przez pas trzymany oburącz.",
    teoria: "Wyniki Polaków na mistrzostwach świata i Europy.",
  },
  "J-5.1": {
    pozycje: "Poruszanie się z partnerem w pozycji walki",
    uderzenia: "Seiken-mawashi-uchi",
    bloki: "Morote-uke",
    kopniecia: "Yoko-geri chudan",
    renraku: "Trzy kroki w przód w pozycji walki z mae-geri / mawashi-geri / yoko-geri plus gyaku tate-tsuki, obrót",
    kumite: "20 × 1 minuta",
    kata: "Pinan II",
    sprawnosc: "5 podciągnięć na drążku.",
    teoria: "Podstawowe słowa ze słowniczka japońskiego.",
  },
  "J-5.2": {
    pozycje:
      "Poruszanie się w pozycji walki z dowolnymi technikami ręcznymi i nożnymi, z blokami, unikami, zmianą dystansu i kiai",
    uderzenia: "Gohon-nukite",
    bloki: "Uchi-uke i gedan-barai",
    kopniecia: "Ushiro-geri chudan",
    renraku: "Trzy kroki w przód w pozycji walki z oi tate-tsuki plus gyaku tate-tsuki, obrót",
    kumite: "25 × 1 minuta",
    kata: "Sakugi III",
    sprawnosc: "10 przeskoków nad krzesłem z przewrotem w przód na materacu.",
    teoria: "Komendy stosowane na treningu karate Kyokushin.",
  },
  "J-5.3": {
    pozycje: "Walka z cieniem",
    uderzenia: "Nukite ippon / nihon / yonhon",
    bloki: "Juji-uke jodan / gedan",
    kopniecia: "Yoko-geri jodan",
    renraku:
      "Trzy kroki w przód w pozycji walki z oi tate-tsuki plus gyaku tate-tsuki plus mae-geri / mawashi-geri / yoko-geri, obrót z podniesieniem rąk",
    kumite: "30 × 1 minuta",
    kata: "Pinan III, kihon kata II, sanchin no kata",
    sprawnosc: "Próba przejścia na rękach wszerz sali, elementy samoobrony.",
    teoria: "Komendy stosowane na zawodach karate Kyokushin.",
  },
  "D-1": {
    staz: "Minimum 1 rok na 1. kyu",
    wiek: "Co najmniej 16 lat",
    kata: "Saiha, Pinan sono ichi – sono go w wersji ura",
    kumite: "Jiyu kumite: 20 walk po 60 sekund",
    oboz: "Udział w obozie letnim KWF rok przed egzaminem",
    sprawnosc: "Lepsza kondycja fizyczna niż na 1. kyu",
    inne: [
      "Znajomość wszystkich technik programu KWF wymaganych na stopnie kyu",
      "Opłacone składki w krajowej federacji KWF",
    ],
  },
  "D-2": {
    staz: "Minimum 3 lata na 1. dan",
    wiek: "Co najmniej 19 lat",
    kata: "Seipai, Seienchin",
    kumite: "Jiyu kumite: 30 walk po 60 sekund",
    oboz: "Od 1. dan minimum 1 obóz letni, w tym obóz KWF przed egzaminem",
    sprawnosc: "Doskonała kondycja fizyczna, lepsza niż na 1. dan",
    inne: [
      "Znajomość wszystkich wymagań na 1. dan",
      "Zasługi dla organizacji",
      "Uprawnienia sędziego krajowego",
      "Udział w oficjalnym kursie instruktorskim PZK",
    ],
  },
  "D-3": {
    staz: "Minimum 4 lata na 2. dan",
    wiek: "Co najmniej 25 lat",
    kata: "Kanku, Garyu oraz własne kata (również w formie pisemnej)",
    kumite: "Jiyu kumite: 40 walk po 60 sekund",
    oboz: "Od 2. dan minimum 2 obozy letnie, w tym obóz KWF przed egzaminem",
    inne: [
      "Znajomość wszystkich wymagań na 2. dan",
      "Uprawnienia międzynarodowego sędziego KWF",
      "List polecający od prezydenta krajowej federacji i lidera dojo",
      "Brany pod uwagę udział jako instruktor na obozach letnich",
    ],
  },
  "D-4": {
    staz: "Minimum 5 lat na 3. dan",
    wiek: "Co najmniej 30 lat",
    kata: "Sushiho oraz własne kata (również w formie pisemnej)",
    kumite: "Jiyu kumite: 40 walk po 60 sekund",
    oboz: "Od 3. dan minimum 3 obozy letnie, w tym obóz KWF przed egzaminem",
    inne: [
      "Znajomość wszystkich wymagań na 3. dan",
      "Uprawnienia sędziego międzynarodowego i regularne sędziowanie",
      "List polecający od prezydenta krajowej federacji i lidera dojo",
      "W komisji egzaminacyjnej Shihan Antonio Pinero lub osoba przez niego wyznaczona",
    ],
  },
  "D-5": {
    staz: "Minimum 6 lat na 4. dan",
    wiek: "Co najmniej 35 lat",
    inne: [
      "Znajomość wszystkich wymagań na 4. dan",
      "Poprowadzenie lekcji dla czarnych pasów przed komisją",
      "Egzamin przed komisją KWF z udziałem Shihana Antonio Pinero lub osoby przez niego wyznaczonej",
      "List polecający od prezydenta krajowej federacji i lidera dojo",
      "Pisemna historia kariery w Kyokushin",
    ],
  },
  "D-6": {
    staz: "Minimum 7 lat na 5. dan",
    wiek: "Co najmniej 45 lat",
    inne: [
      "Wybitny wkład w rozwój Kyokushin w federacjach krajowych i międzynarodowych",
      "List polecający od prezydenta krajowej federacji, lidera dojo oraz zarządu EKF / KWF",
      "Pisemna historia kariery w Kyokushin",
    ],
  },
};

// Wymagania jako Markdown – tak trafiają do kolumny grades.requirements.
export function requirementsMarkdown(code: string): string | null {
  const req = requirements[code];
  if (!req) return null;
  const lines = LABELS.filter(([key]) => req[key]).map(([key, label]) => `- **${label}:** ${req[key]}`);
  if (req.inne?.length) lines.push(`- **Pozostałe wymagania:**\n${req.inne.map((i) => `  - ${i}`).join("\n")}`);
  return lines.join("\n");
}
