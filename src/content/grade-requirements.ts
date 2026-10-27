// Wymagania egzaminacyjne KWF (Kyokushin World Federation) na każdy stopień.
// Źródła:
//   juniorzy 10.1–5.3: karate.org.pl/kyokushin/wym_jun.php oraz lista „Wymagania do 15 roku życia”
//                      od Senseia Łukasza Guzika,
//   seniorzy 10–1 kyu i 1–4 dan: tabela „Wymagania egzaminacyjne KWF” (dorośli, PDF).
// Każdy stopień obejmuje też wymagania wszystkich niższych stopni.
//
// Pozycje w sekcjach z `video: true` to techniki: przy każdej aplikacja pokazuje przycisk filmu.
// Film przypisujesz technice w panelu admina (/admin/techniki) – slug tworzy techniqueSlug().

import type { TechniqueCategory } from "@/lib/types";

export type RequirementSection = {
  label: string;
  items: string[];
  video?: boolean;
  category?: TechniqueCategory; // domyślnie kihon
};

export type GradeRequirements = { sections: RequirementSection[]; note?: string };

// Skróty do budowania sekcji.
const pozycje = (...items: string[]): RequirementSection => ({ label: "Pozycje (tachikata)", items, video: true });
const uderzenia = (...items: string[]): RequirementSection => ({
  label: "Uderzenia i cięcia (tsuki / uchi)",
  items,
  video: true,
});
const bloki = (...items: string[]): RequirementSection => ({ label: "Bloki (uke)", items, video: true });
const kopniecia = (...items: string[]): RequirementSection => ({ label: "Kopnięcia (keri)", items, video: true });
const ido = (...items: string[]): RequirementSection => ({
  label: "Ido (poruszanie się w pozycjach)",
  items,
  video: true,
});
const kata = (...items: string[]): RequirementSection => ({ label: "Kata", items, video: true, category: "kata" });
const kumiteTechniki = (...items: string[]): RequirementSection => ({
  label: "Kumite",
  items,
  video: true,
  category: "kihon_kumite",
});
const ruch = (...items: string[]): RequirementSection => ({ label: "Pozycje i poruszanie się", items });
const kumite = (...items: string[]): RequirementSection => ({ label: "Kumite", items });
const kokyu = (...items: string[]): RequirementSection => ({ label: "Kokyu ho (oddychanie)", items, video: true });
const renraku = (...items: string[]): RequirementSection => ({ label: "Renraku (kombinacje)", items });
const sprawnosc = (...items: string[]): RequirementSection => ({ label: "Test sprawności", items });
const teoria = (...items: string[]): RequirementSection => ({ label: "Teoria i komendy", items });
const dyplomy = (...items: string[]): RequirementSection => ({ label: "Uprawnienia", items });

// Stamina w tabeli KWF: pompki / brzuszki / przysiady.
const stamina = (reps: string, tobiGeri?: string) =>
  sprawnosc(`Pompki / brzuszki / przysiady: ${reps}`, ...(tobiGeri ? [tobiGeri] : []));

const requirements: Record<string, GradeRequirements> = {
  // ───────────── Junior (do 15 lat) ─────────────
  "J-10.1": {
    sections: [
      teoria("Zasady bezpieczeństwa: sala, szatnia, ubiór itp. Strefy: jodan, chudan, gedan. Znaczenie słowa kiai – okrzyk."),
      pozycje("Fudo-dachi"),
      uderzenia("Morote-tsuki (jodan, chudan, gedan)"),
      kopniecia("Hiza-geri (chudan)"),
      sprawnosc("50 razy zaciskanie pięści", "10 przysiadów: obciążone całe stopy, ręce dowolnie"),
    ],
  },
  "J-10.2": {
    sections: [
      teoria("Pozycja seiza – siadanie i wstawanie, ukłony. Znaczenie słowa naore – powrót."),
      pozycje("Zenkutsu-dachi"),
      uderzenia("Uraken-shomen-uchi"),
      bloki("Morote-gedan-barai"),
      kopniecia("Hiza-geri chudan plus kiai"),
      renraku("Krok w tył do zenkutsu-dachi z morote-gedan-barai / gedan-barai i powrót do fudo-dachi"),
      sprawnosc("10 skłonów w przód z leżenia na plecach, ręce dowolnie"),
    ],
  },
  "J-10.3": {
    sections: [
      teoria("Znaczenie słów karate i osu."),
      pozycje("Heiko-dachi", "Yoi-dachi"),
      uderzenia("Seiken-tsuki (jodan, chudan, gedan)"),
      bloki("Gedan-barai"),
      kopniecia("Hiza-geri jodan plus kiai"),
      renraku("Krok w tył do zenkutsu-dachi z morote-gedan-barai / gedan-barai i powrót do fudo-dachi"),
      sprawnosc("10 ugięć ramion z leżenia przodem w podporze na dłoniach i kolanach"),
    ],
  },
  "J-9.1": {
    sections: [
      teoria("Prawidłowy wygląd karategi i wiązanie pasa. Liczenie po japońsku do 10."),
      pozycje("Heisoku-dachi"),
      uderzenia("Oi-tsuki (jodan, chudan, gedan)"),
      bloki("Jodan-uke"),
      kopniecia("Mae-keage"),
      renraku("Trzy kroki w przód / tył w zenkutsu-dachi z oi-tsuki"),
      sprawnosc(
        "20 przysiadów: obciążone całe stopy, ręce zaplecione na karku, tułów pionowo",
        "10 wahnięć w formie kołyski na brzuchu z leżenia przodem",
      ),
    ],
  },
  "J-9.2": {
    sections: [
      teoria("Znaczenie słów sensei, shihan, sempai."),
      pozycje("Musubi-dachi"),
      uderzenia("Gyaku-tsuki (jodan, chudan, gedan)"),
      bloki("Soto-uke"),
      kopniecia("Kin-geri"),
      renraku("Trzy kroki w przód / tył w zenkutsu-dachi z gyaku-tsuki"),
      sprawnosc(
        "10 skłonów w przód z leżenia na plecach, ręce zaplecione na karku, tułów prosty",
        "10 wahnięć w formie kołyski na plecach z przysiadu, ręce zaplecione wokół kolan",
      ),
    ],
  },
  "J-9.3": {
    sections: [
      teoria("Znaczenie słów kyoku-shin-kai."),
      pozycje("Nekoashi-dachi"),
      uderzenia("Seiken-ago-uchi"),
      bloki("Uchi-uke"),
      kopniecia("Mae-geri chudan"),
      renraku("Trzy kroki w przód w zenkutsu-dachi z oi-tsuki / uke, obrót z gedan-barai"),
      sprawnosc(
        "10 ugięć ramion z leżenia przodem w podporze na pięściach i kolanach",
        "10 wahnięć w formie kołyski na plecach z przysiadu, ręce pod kątem 45° amortyzują pad w tył",
      ),
    ],
  },
  "J-8.1": {
    sections: [
      teoria("Przysięga dojo."),
      pozycje("Kokutsu-dachi"),
      uderzenia("Shuto-sakotsu-uchi-komi"),
      bloki("Soto-keage"),
      kopniecia("Soto-keage"),
      renraku("Trzy kroki w przód w zenkutsu-dachi z keri, obrót z morote-gedan-barai"),
      sprawnosc("10 przewrotów w przód", "30 sekund mostka w tył z leżenia na plecach"),
    ],
  },
  "J-8.2": {
    sections: [
      teoria("Oddychanie – nogare I."),
      pozycje("Moroashi-dachi", "Uchi-hachiji-dachi"),
      uderzenia("Shuto-sakotsu-uchi"),
      kopniecia("Uchi-keage"),
      renraku("Krok w tył do zenkutsu-dachi z gedan-barai plus gyaku-tsuki i powrót do fudo-dachi"),
      sprawnosc(
        "10 przewrotów w tył",
        "10 razy po 20 sekund rozciągania w maksymalnym rozkroku ze skrętem w lewo i w prawo (szpagat)",
      ),
    ],
  },
  "J-8.3": {
    sections: [
      teoria("Nogare II."),
      pozycje("Sanchin-dachi"),
      uderzenia("Shuto-ganmen-uchi"),
      kopniecia("Mae-geri jodan"),
      renraku("Trzy kroki w przód w zenkutsu-dachi z uke plus gyaku-tsuki, obrót z gedan-barai"),
      kata("Kihon kata I"),
      sprawnosc(
        "10 razy gwiazda gimnastyczna",
        "10 razy dotknąć głową podłogi w skłonie w przód, siedząc w maksymalnie szerokim rozkroku, nogi proste w kolanach",
      ),
    ],
  },
  "J-7.1": {
    sections: [
      teoria("Oddychanie – ibuki."),
      pozycje("Kiba-dachi"),
      uderzenia("Uraken-sayu-uchi", "Uraken-hizo-uchi"),
      kopniecia("Kansetsu-geri"),
      renraku("Trzy kroki w przód w sanchin-dachi z tsuki / uchi / keri / uke, obrót poprzez przekrok"),
      kata("Taikyoku I"),
      sprawnosc("10 razy zamach nogą i przejście do stania na rękach pod drabinkami"),
    ],
  },
  "J-7.2": {
    sections: [
      teoria("Etykieta dojo."),
      pozycje("Tsuruashi-dachi"),
      uderzenia("Uraken-yoko-uchi (jodan, chudan)"),
      kopniecia("Kakato-geri"),
      renraku("Trzy kroki w przód w zenkutsu-dachi z mae-geri plus gyaku-tsuki, obrót z morote-gedan-barai"),
      kata("Taikyoku II"),
      sprawnosc("15 sekund stania na rękach pod drabinkami"),
    ],
  },
  "J-7.3": {
    sections: [
      teoria("Historia karate Kyokushin i Sosai Masutatsu Oyamy."),
      pozycje("Kake-dachi"),
      uderzenia("Shuto-mawashi-uchi"),
      kopniecia("Yoko-keage", "Ushiro-keage"),
      bloki("Shuto-mawashi-uke"),
      renraku("Trzy kroki w przód w kokutsu-dachi z shuto-mawashi-uke, obrót poprzez przekrok"),
      kata("Sakugi I"),
    ],
  },
  "J-6.1": {
    sections: [
      ruch("Pozycja walki"),
      uderzenia("Seiken-tate-tsuki (jodan, chudan, gedan)"),
      kopniecia("Mawashi-geri gedan"),
      renraku("Trzy kroki w przód w pozycji walki z gyaku-tate-tsuki, obrót poprzez zakrok"),
      kumite("5 × 1 minuta"),
      kata("Sakugi II"),
      sprawnosc("10 razy scyzoryk w zwisie tyłem na drabinkach", "60 sekund szpagatu w bok na piętach"),
    ],
  },
  "J-6.2": {
    sections: [
      teoria("Wiedza na temat Światowej Organizacji Karate."),
      ruch("Krok dostawny w pozycji walki"),
      uderzenia("Tettsui-hizo-uchi", "Tettsui-yoko-uchi (jodan, chudan, gedan)"),
      kopniecia("Mawashi-geri chudan"),
      renraku("Trzy kroki w przód w zenkutsu-dachi z mae-keage / yoko-keage / soto-keage plus gyaku-tsuki, obrót"),
      kumite("10 × 1 minuta"),
      kata("Taikyoku III"),
      sprawnosc("10 przeskoków z przysiadu przez partnera klęczącego na kolanach i rękach, obrót"),
    ],
  },
  "J-6.3": {
    sections: [
      teoria("Wyniki Polaków na mistrzostwach świata i Europy."),
      ruch("Przekrok i zakrok w pozycji walki"),
      uderzenia("Tettsui-komekami-uchi", "Uraken-shita-tsuki"),
      bloki("Osae-uke"),
      kopniecia("Mawashi-geri jodan"),
      renraku("Trzy kroki w przód w zenkutsu-dachi z kin-geri / mae-geri / mawashi-geri plus gyaku-tsuki, obrót"),
      kumite("15 × 1 minuta"),
      kata("Pinan I"),
      sprawnosc("10 razy przeskok w przód i w tył przez pas trzymany oburącz"),
    ],
  },
  "J-5.1": {
    sections: [
      teoria("Znajomość podstawowych słów ze słownika japońskiego."),
      ruch("Poruszanie się z partnerem w pozycji walki"),
      uderzenia("Seiken-mawashi-uchi"),
      bloki("Morote-uke"),
      kopniecia("Yoko-geri chudan"),
      renraku("Trzy kroki w przód w pozycji walki z mae-geri / mawashi-geri / yoko-geri plus gyaku-tate-tsuki, obrót"),
      kumite("20 × 1 minuta"),
      kata("Pinan II"),
      sprawnosc("5 podciągnięć na drążku"),
    ],
  },
  "J-5.2": {
    sections: [
      teoria("Komendy stosowane na treningu karate Kyokushin."),
      ruch(
        "Poruszanie się w pozycji walki z dowolnymi technikami ręcznymi i nożnymi, stosując bloki, uniki, zmianę dystansu oraz kiai",
      ),
      uderzenia("Gohon-nukite"),
      bloki("Uchi-uke", "Gedan-barai"),
      kopniecia("Ushiro-geri chudan"),
      renraku("Trzy kroki w przód w pozycji walki z oi-tate-tsuki plus gyaku-tate-tsuki, obrót"),
      kumite("25 × 1 minuta"),
      kata("Sakugi III"),
      sprawnosc("10 przeskoków ponad krzesłem z przewrotem przodem na materacu"),
    ],
  },
  "J-5.3": {
    sections: [
      teoria("Komendy stosowane na zawodach karate Kyokushin."),
      ruch("Walka z cieniem"),
      uderzenia("Nukite ippon / nihon / yonhon"),
      bloki("Juji-uke (jodan, gedan)"),
      kopniecia("Yoko-geri jodan"),
      renraku(
        "Trzy kroki w przód w pozycji walki z oi-tate-tsuki plus gyaku-tate-tsuki plus mae-geri / mawashi-geri / yoko-geri, obrót z podniesieniem rąk",
      ),
      kumite("30 × 1 minuta"),
      kata("Pinan III", "Kihon kata II", "Sanchin kata"),
      sprawnosc("Próba przejścia na rękach wszerz sali", "Elementy samoobrony"),
    ],
  },

  // ───────────── Senior (od 16 lat): tabela KWF ─────────────
  "S-10": {
    sections: [
      pozycje("Yoi", "Fudo Dachi", "Sanchin Dachi", "Zenkutsu Dachi"),
      uderzenia("Seiken Oi Tsuki (J/C/G)", "Seiken Gyaku Tsuki (J/C/G)", "Seiken Morote Tsuki (J/C/G)", "Seiken Ago Uchi"),
      bloki("(Seiken/Shuto) Jodan Uke", "(Seiken/Shuto) Mae Gedan Barai"),
      kopniecia("Hiza Geri", "Kin Geri", "Mae Geri (J/C)"),
      ido("Zenkutsu Dachi", "Sanchin Dachi"),
      kata("Taikyoku Sono Ichi", "Taikyoku Sono Ni"),
      stamina("15 / 40 / 15"),
      kumiteTechniki("Ippon Kumite"),
      kokyu("Nogare (Omote, Ura)", "Kiai"),
    ],
  },
  "S-9": {
    sections: [
      pozycje("Musubi Dachi", "Heiko Dachi", "Heisoku Dachi", "Kokutsu Dachi"),
      uderzenia("Seiken Shita Tsuki", "Seiken Tate Tsuki (J/C/G)", "Seiken Kagi Tsuki", "Hiji Ate (J/C)"),
      bloki("(Seiken/Shuto) Chudan Soto Uke", "(Seiken/Shuto) Chudan Uchi Uke"),
      kopniecia("Mae Keage", "Yoko Keage", "Uchi Mawashi Keage", "Soto Mawashi Keage"),
      ido("Kokutsu Dachi"),
      kata("Taikyoku Sono San"),
      stamina("20 / 45 / 20"),
      kumiteTechniki("Yakusoku Kumite", "Sanbon Kumite"),
    ],
  },
  "S-8": {
    sections: [
      pozycje("Kiba Dachi", "Tsuru Ashi Dachi", "Kumite No Kamae"),
      uderzenia(
        "Uraken Ganmen Uchi",
        "Uraken Sayu Ganmen Uchi",
        "Uraken Hizo Uchi",
        "Uraken Mawashi Uchi",
        "Uraken Oroshi Ganmen Uchi",
      ),
      bloki("(Seiken/Shuto) Uchi Uke / Gedan Barai", "Morote Chudan Uchi Uke"),
      kopniecia("Kansetsu Geri", "Yoko Geri (J/C)", "Mawashi Geri (J/C/G)"),
      ido("Kiba Dachi"),
      kata("Sokugi Taikyoku Sono Ichi", "Sokugi Taikyoku Sono Ni", "Sokugi Taikyoku Sono San"),
      renraku("Mae geri, chudan gyaku tsuki", "Chudan soto uke, mae gedan barai, chudan gyaku tsuki"),
      stamina("30 / 50 / 30", "Tobi geri"),
      kumite("Jiyu kumite 2 × 60 s"),
    ],
  },
  "S-7": {
    sections: [
      pozycje("Uchi Hachiji Dachi", "Neko Ashi Dachi", "Shiko Dachi"),
      uderzenia(
        "Tettsui Komekami",
        "Tettsui Oroshi Ganmen Uchi",
        "Tettsui Hizo Uchi",
        "Tettsui Yoko Uchi (J/C/G)",
        "Tettsui Mae Yoko Uchi (J/C/G)",
      ),
      bloki("Shuto Mawashi Uke", "Mae Shuto Mawashi Uke"),
      kopniecia("Jodan Uchi Heisoku Geri", "Ago Jodan Geri"),
      ido("Neko Ashi Dachi"),
      kata("Pinan Sono Ichi", "Sanchin No Kata"),
      stamina("35 / 55 / 35", "Tobi geri + 10 cm"),
      kumite("Jiyu kumite 3 × 60 s"),
      kokyu("Ibuki Sankai"),
    ],
  },
  "S-6": {
    sections: [
      pozycje("Kake Ashi Dachi"),
      uderzenia(
        "Shuto Yoko Ganmen Uchi",
        "Shuto Sakotsu Uchi",
        "Shuto Hizo Uchi",
        "Shuto Jodan Uchi Uchi",
        "Shuto Sakotsu Uchi Komi",
        "Ushiro Hiji Ate",
        "Nihon Nukite",
        "Yonhon Nukite (J/C)",
      ),
      bloki("Enkei Gyaku Tsuki", "Mawashi Gedan Barai", "Juji Gedan Barai", "Hiji Uke", "Jodan Shuto Uchi Uke"),
      kopniecia("Ushiro Geri (J/C/G) – 3 metody", "Ushiro Mawashi Geri (J/C/G)"),
      ido("Kake Ashi Dachi"),
      kata("Pinan Sono Ni", "Pinan Sono San"),
      stamina("40 / 60 / 40", "Tobi geri + 15 cm"),
      kumite("Jiyu kumite 4 × 60 s"),
    ],
  },
  "S-5": {
    sections: [
      pozycje("Moro Ashi Dachi"),
      uderzenia("Shotei Uchi (J/C/G)", "Age Hiji Ate (J/C)", "Oroshi Hiji Ate", "Jun Tsuki (J/C/G)"),
      bloki("Seiken/Shuto Juji Uke (J/G)", "Shotei Uke (J/C/G)"),
      kopniecia("Oroshi Uchi Kakato Geri", "Oroshi Soto Kakato Geri"),
      ido("Moro Ashi Dachi"),
      kata("Pinan Sono Yon"),
      stamina("45 / 65 / 45", "Tobi geri + 15 cm"),
      kumite("Jiyu kumite 5 × 60 s"),
    ],
  },
  "S-4": {
    sections: [
      uderzenia("Koken Uchi (J/C/G)", "Mae Hiji Ate (J/C)", "Haishu Uchi (J/C)"),
      bloki("Koken Uke (J/C/G)"),
      kopniecia("Kake Geri (J/C/G)"),
      ido("Ura Ido"),
      kata("Pinan Sono Go", "Taikyoku Sono Ichi Ura", "Taikyoku Sono Ni Ura", "Taikyoku Sono San Ura"),
      renraku("Mae geri, yoko geri, ushiro geri, chudan gyaku tsuki"),
      stamina("50 / 70 / 50", "Tobi geri + 20 cm"),
      kumite("Jiyu kumite 6 × 60 s"),
    ],
  },
  "S-3": {
    sections: [
      uderzenia("Hira Ken Tsuki (J/C)", "Hira Ken Oroshi Uchi", "Hira Ken Mawashi Uchi"),
      bloki("Gedan Shuto Morote Uke", "Gedan Shotei Morote Uke"),
      kopniecia("Mae Kakato Geri (J/C/G)", "Age Kakato Ushiro Geri"),
      ido("Yon Ju Go Do Ido"),
      kata("Tsuki No Kata"),
      stamina("55 / 75 / 55", "Tobi geri + 20 cm"),
      kumite("Jiyu kumite 10 × 60 s"),
    ],
  },
  "S-2": {
    sections: [
      uderzenia(
        "Ryuto Ken Tsuki (J/C)",
        "Nakayubi Ippon Ken (J/C)",
        "Oyayubi Ippon Ken (J/C)",
        "Hitosashi Yubi Ippon Ken (J/C)",
        "Yama Tsuki",
      ),
      bloki("Kake Uke (J/C)", "Morote Kake Uke"),
      kopniecia("Tobi Mae Geri", "Tobi Nidan Geri"),
      {
        label: "Ido w kumite no kamae (mae, sagari, pod różnymi kątami)",
        items: ["Okuri Ashi", "Fumi Ashi", "Kosa", "Oi Ashi"],
        video: true,
      },
      kata("Gekisai Dai", "Tensho"),
      renraku(
        "Cofnięcie z gedan barai, krok w przód z ago uchi i gyaku tsuki",
        "Mae geri (oi ashi), mawashi geri, ushiro geri, gedan barai, gyaku tsuki",
      ),
      stamina("60 / 80 / 60", "Tobi geri + 30 cm"),
      kumite("Jiyu kumite 12 × 60 s"),
    ],
  },
  "S-1": {
    sections: [
      uderzenia("Keiko Uchi", "Haito Uchi (J/C/G)", "Morote Haito Uchi (J/C)"),
      bloki("Chudan Haito Uchi Uke", "Osae Uke"),
      kopniecia("Yoko Tobi Geri", "Mawashi Tobi Geri", "Ushiro Tobi Geri", "Ushiro Mawashi Tobi Geri"),
      kata("Gekisai Sho", "Yantsu"),
      renraku(
        "A: oi tsuki, gyaku tsuki, oi tsuki, shita tsuki",
        "B: mawashi geri przednią nogą, oi tsuki, gyaku tsuki, mawashi geri tylną nogą",
      ),
      stamina("65 / 100 / 65", "Tobi geri + 30 cm"),
      kumite("Jiyu kumite 15 × 60 s"),
    ],
  },
  "D-1": {
    sections: [
      uderzenia("Toho Uchi", "Age Jodan Tsuki"),
      bloki("Morote Haito Uchi Uke"),
      kata(
        "Saifa",
        "Pinan Sono Ichi Ura",
        "Pinan Sono Ni Ura",
        "Pinan Sono San Ura",
        "Pinan Sono Yon Ura",
        "Pinan Sono Go Ura",
      ),
      renraku("Mawashi geri, ushiro mawashi geri", "Jodan mae geri, mawashi geri, ushiro mawashi geri"),
      stamina("75 / 150 / 75", "Tobi geri + 30 cm"),
      kumite("Jiyu kumite 20 × 60 s"),
    ],
  },
  "D-2": {
    sections: [
      kata("Seipai", "Seienchin"),
      stamina("75 / 150 / 75", "Tobi geri + 30 cm"),
      kumite("Jiyu kumite 30 × 60 s"),
      dyplomy("Sędzia krajowy"),
    ],
  },
  "D-3": {
    sections: [
      kata("Kanku", "Garyu"),
      { label: "Kata autorskie", items: ["Własne kata"] },
      stamina("75 / 150 / 75", "Tobi geri + 30 cm"),
      kumite("Jiyu kumite 40 × 60 s"),
      dyplomy("Sędzia międzynarodowy (judge)"),
    ],
  },
  "D-4": {
    sections: [
      kata("Sushiho"),
      stamina("75 / 150 / 75", "Tobi geri + 30 cm"),
      kumite("Jiyu kumite 50 × 60 s"),
      dyplomy("Sędzia międzynarodowy (referee)"),
    ],
  },
};

const HIGHER_DAN_NOTE = "Tabela KWF nie podaje wymagań na ten stopień.";

export function getGradeRequirements(code: string): GradeRequirements | null {
  if (requirements[code]) return requirements[code];
  if (code.startsWith("D-")) return { sections: [], note: HIGHER_DAN_NOTE };
  return null;
}

// Te same techniki zapisane inaczej u juniorów i seniorów kierujemy do jednego filmu.
const ALIASES: Record<string, string> = {
  "oi-tsuki": "seiken-oi-tsuki",
  "gyaku-tsuki": "seiken-gyaku-tsuki",
  "morote-tsuki": "seiken-morote-tsuki",
  "soto-uke": "chudan-soto-uke",
  "uchi-uke": "chudan-uchi-uke",
  "mae-gedan-barai": "gedan-barai",
  "morote-uke": "morote-chudan-uchi-uke",
  "nekoashi-dachi": "neko-ashi-dachi",
  "moroashi-dachi": "moro-ashi-dachi",
  "tsuruashi-dachi": "tsuru-ashi-dachi",
  "kake-dachi": "kake-ashi-dachi",
  "yoi-dachi": "yoi",
  "taikyoku-i": "taikyoku-sono-ichi",
  "taikyoku-ii": "taikyoku-sono-ni",
  "taikyoku-iii": "taikyoku-sono-san",
  "pinan-i": "pinan-sono-ichi",
  "pinan-ii": "pinan-sono-ni",
  "pinan-iii": "pinan-sono-san",
  "sakugi-i": "sokugi-taikyoku-sono-ichi",
  "sakugi-ii": "sokugi-taikyoku-sono-ni",
  "sakugi-iii": "sokugi-taikyoku-sono-san",
  "sanchin-kata": "sanchin-no-kata",
  "uraken-shomen-uchi": "uraken-ganmen-uchi",
  "uraken-sayu-uchi": "uraken-sayu-ganmen-uchi",
  "tettsui-komekami-uchi": "tettsui-komekami",
  "juji-uke": "seiken-shuto-juji-uke",
};

// Nazwa techniki bez zakresu poziomów (J/C/G) i dopisków.
export function techniqueName(item: string): string {
  return item
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+–\s+3 metody$/, "")
    .replace(/\s+plus kiai$/i, "")
    .replace(/\s+(jodan|chudan|gedan)$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function techniqueSlug(item: string): string {
  const slug = techniqueName(item)
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return ALIASES[slug] ?? slug;
}

// Wymagania jako Markdown – tak trafiają do kolumny grades.requirements.
export function requirementsMarkdown(code: string): string | null {
  const req = getGradeRequirements(code);
  if (!req) return null;
  const lines = req.sections.map((s) => `- **${s.label}:** ${s.items.join("; ")}`);
  if (req.note) lines.push(req.note);
  return lines.join("\n");
}

export type RequirementTechnique = {
  slug: string;
  name: string;
  category: TechniqueCategory;
  firstGradeCode: string;
};

// Wszystkie techniki z wymagań (bez powtórzeń) – seed tworzy z nich katalog technik.
export function requirementTechniques(gradeCodes: string[]): RequirementTechnique[] {
  const seen = new Map<string, RequirementTechnique>();
  for (const code of gradeCodes) {
    for (const section of getGradeRequirements(code)?.sections ?? []) {
      if (!section.video) continue;
      for (const item of section.items) {
        const slug = techniqueSlug(item);
        if (!seen.has(slug)) {
          seen.set(slug, { slug, name: techniqueName(item), category: section.category ?? "kihon", firstGradeCode: code });
        }
      }
    }
  }
  return [...seen.values()];
}
