// Wymagania egzaminacyjne Polskiej Organizacji Karate Kyokushin (KWF – Kyokushin World Federation).
// Źródła:
//   juniorzy 10.1–9.3: https://www.karate.org.pl/kyokushin/wym_jun.php
//   juniorzy 8.1–5.3:  tabela „Wymagania do 14 lat” w tym samym układzie (karatemarkowa.pl)
//   Całość juniorów sprawdzona z listą „Wymagania do 15 roku życia” od Senseia Łukasza Guzika.
//   seniorzy 10–1 kyu i 1–3 dan: lista od Senseia Łukasza Guzika (literówki poprawione).
// Wymagania na wyższe stopnie dan są w gestii Światowej Organizacji Kyokushin Honbu Tokyo.
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
  punkty?: string[]; // wymagania seniorów i dan w kolejności z listy organizacji
};

const LABELS: [keyof Requirements, string][] = [
  ["staz", "Staż"],
  ["pozycje", "Pozycje (dachi)"],
  ["uderzenia", "Uderzenia i cięcia"],
  ["bloki", "Bloki (uke)"],
  ["kopniecia", "Kopnięcia (geri)"],
  ["renraku", "Renraku"],
  ["kata", "Kata"],
  ["kumite", "Kumite"],
  ["sprawnosc", "Test sprawności"],
  ["teoria", "Teoria i komendy"],
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
    renraku: "Krok w tył do zenkutsu-dachi z morote-gedan-barai / gedan-barai i powrót do fudo-dachi",
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
    teoria: "Znaczenie słów karate i osu.",
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
    renraku: "Trzy kroki w przód w zenkutsu-dachi z oi-tsuki / uke, obrót z gedan-barai",
    sprawnosc:
      "10 ugięć ramion z leżenia przodem w podporze na pięściach i kolanach. 10 wahnięć w formie kołyski na plecach z przysiadu, ręce pod kątem 45° amortyzują pad w tył.",
    teoria: "Znaczenie słowa Kyoku-shin-kai.",
  },
  "J-8.1": {
    pozycje: "Kokutsu-dachi",
    uderzenia: "Shuto-sakotsu-uchi-komi",
    bloki: "Soto-keage",
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
  "S-10": {
    staz: "Minimum 1 miesiąc treningu",
    punkty: [
      "Zasady noszenia kyokushin karategi i wiązanie pasa (obi).",
      "Znaczenie słowa kyoku-shin-kai oraz znajomość etykiety dojo i przysięgi dojo.",
      "Liczenie po japońsku do 10.",
      "**Pozycje:** fudo-dachi, yoi-dachi, uchi-hachi-ji-dachi, heisoku-dachi, zenkutsu-dachi.",
      "**Uderzenia:** morote-tsuki (jodan, chudan, gedan), seiken-tsuki (jodan, chudan, gedan).",
      "**Bloki:** seiken-jodan-uke, seiken-gedan-barai, kake-wake-uke.",
      "**Kopnięcia:** hiza-geri, kin-geri, mae-keage.",
      "**Kumite:** poruszanie się w pozycji walki krokiem dostawnym.",
      "Z aktywnej pozycji heisoku-dachi przejść do zenkutsu-dachi i wykonać techniki: morote-tsuki (jodan, chudan, gedan), seiken-gedan-barai, kake-wake-uke, hiza-geri, kin-geri. Uwzględnić stronę lewą (hidari) oraz prawą (migi), stosować okrzyk (kiai).",
    ],
  },
  "S-9": {
    staz: "Minimum 2 kolejne miesiące treningu",
    punkty: [
      "Historia kyokushin karate.",
      "**Pozycje:** musubi-dachi, sanchin-dachi.",
      "**Uderzenia:** seiken-ago-uchi, seiken-gyaku-tsuki, seiken-oi-tsuki (jodan, chudan, gedan), seiken-chudan-mawashi-tsuki, seiken-tate-tsuki (jodan, chudan, gedan).",
      "**Bloki:** seiken-chudan-soto-uke.",
      "**Kopnięcia:** mae-geri-chudan (chusoku).",
      "**Kata:** kihon-no-kata sono-ichi.",
      "**Oddychanie:** nogare.",
      "**Ippon-kumite:** tori (atakujący): jodan-tsuki; uke (broniący się): jodan-uke plus kontra chudan-gyaku-tsuki.",
      "**Jiyu-ippon-kumite:** atakujący: jodan-tsuki; broniący się: jodan-uke plus kontra seiken-chudan-mawashi-tsuki.",
      "**Jiyu-ippon-kumite (samoobrona):** atakujący wykonuje atak ręką, broniący się jodan-uke plus jodan-gyaku-tsuki i hiza-geri.",
      "**Test kondycji:** 20 ugięć ramion w podporze przodem na pięściach i kolanach; 10 ugięć ramion w podporze przodem na palcach i kolanach; 20 skłonów w przód z leżenia na plecach.",
      "Test poruszania się w pozycji sanchin-dachi i zenkutsu-dachi, stosując techniki zawarte w kihon-no-kata.",
    ],
  },
  "S-8": {
    staz: "Minimum 3 kolejne miesiące treningu",
    punkty: [
      "**Pozycje:** kokutsu-dachi, kiba-dachi.",
      "**Uderzenia i cięcia:** uraken-shomen, seiken-shita-tsuki, jun-tsuki (jodan, chudan, gedan), shuto-sakotsu-uchi, shuto-sakotsu-uchi-komi.",
      "**Bloki:** seiken-chudan-uchi-uke.",
      "**Kopnięcia:** mawashi-geri-gedan (haisoku, chusoku), yoko-keage (sokuto).",
      "**Kata:** taikyoku sono-ichi i sono-ni.",
      "**Oddychanie:** nogare, ibuki (san-kai).",
      "**Ippon-kumite:** atakujący wykonuje chudan-tsuki, broniący się soto-uke plus kontra chudan-gyaku-tsuki.",
      "**Jiyu-ippon-kumite:** atakujący wykonuje seiken-chudan-tsuki, broniący się soto-uke plus seiken-shita-tsuki i gedan-mawashi-geri.",
      "**Jiyu-ippon-kumite (samoobrona):** atakujący wykonuje chudan-tsuki, broniący się soto-uke plus seiken-tate-tsuki i hiza-geri.",
      "**Jiyu-kumite:** wolna walka pod kątem zawodów.",
      "**Test kondycji:** 25 ugięć ramion w podporze przodem na pięściach; 15 ugięć ramion w podporze na palcach i kolanach; 25 skłonów w przód z leżenia na plecach.",
      "Test poruszania się w pozycji kokutsu-dachi i kiba-dachi, stosując techniki zawarte w kihon-no-kata.",
    ],
  },
  "S-7": {
    staz: "Minimum 3 kolejne miesiące treningu",
    punkty: [
      "**Pozycje:** neko-ashi-dachi.",
      "**Uderzenia i cięcia:** tettsui-oroshi-ganmen-uchi, tettsui-komekami-uchi, tettsui-hizo-uchi, tettsui-yoko-uchi (jodan, chudan, gedan), shuto-ganmen-uchi, shuto-hizo-uchi.",
      "**Bloki:** seiken-juji-uke (jodan, gedan), shuto-mawashi-uke.",
      "**Kopnięcia:** teisoku-mawashi-soto-keage, haisoku-mawashi-uchi-keage, mawashi-geri-chudan (haisoku, chusoku), kansetsu-geri.",
      "**Kata:** taikyoku sono-san, pinan sono-ichi.",
      "**Sanbon-kumite:** atakujący wykonuje 3 kroki, atakując kolejno jodan-tsuki, chudan-tsuki i gedan-tsuki; broniący się, cofając się, wykonuje 3 kroki z kolejno jodan-uke, soto-uke, gedan-barai plus kontruje chudan-gyaku-tsuki i gedan-barai.",
      "**Oddychanie:** nogare i ibuki (san-kai).",
      "**Ippon-kumite:** atakujący wykonuje jodan-tsuki, broniący się uchi-uke i uraken-shomen-uchi.",
      "**Jiyu-ippon-kumite:** atakujący wykonuje jodan-tsuki, broniący się uchi-uke oraz kontruje technikami seiken-shita-tsuki, seiken-chudan-mawashi-tsuki i mawashi-geri-gedan.",
      "**Jiyu-ippon-kumite:** atakujący wykonuje seiken-jodan-tsuki, broniący się seiken-uchi-uke i kontruje, stosując uraken-shomen-uchi, seiken-shita-tsuki i hiza-geri.",
      "**Jiyu-kumite:** randori.",
      "**Test sprawnościowy:** 30 ugięć ramion w podporze przodem na pięściach i kolanach; 20 ugięć ramion w podporze przodem na palcach i kolanach; 30 skłonów w przód z leżenia na plecach.",
      "Test poruszania się w pozycjach zenkutsu-dachi, kiba-dachi, kokutsu-dachi i neko-ashi-dachi, stosując techniki zawarte w kihon-no-kata.",
    ],
  },
  "S-6": {
    staz: "Minimum 4 kolejne miesiące treningu",
    punkty: [
      "**Pozycje:** tsuru-ashi-dachi.",
      "**Uderzenia i cięcia:** uraken-sayu-uchi, uraken-mawashi-uchi, uraken-hizo-uchi, uraken-ganmen-oroshi-uchi, nihon-nukite (me-tsuki), yonhon-nukite (jodan, chudan), hiji-ate jodan i chudan.",
      "**Bloki:** morote-chudan-uchi-uke, seiken-uchi-uke / gedan-barai.",
      "**Kopnięcia:** yoko-geri-chudan, ushiro-geri-chudan.",
      "**Kata:** pinan sono-ni.",
      "**Renraku:** atakujący: mae-geri-chudan i chudan-gyaku-tsuki; broniący się: soto-uke, gedan-barai i chudan-gyaku-tsuki.",
      "**Ippon-kumite:** atakujący: migi-jodan-tsuki i chudan-gyaku-tsuki; broniący się: hidari-uchi-uke, soto-uke i gedan-barai, kontrując gyaku-shuto-sakotsu-uchi.",
      "**Jiyu-ippon-kumite:** atakujący: migi-jodan-tsuki i chudan-gyaku-tsuki; broniący się: hidari-uchi-uke, soto-uke i gedan-barai, kontrując mae-geri, chudan-mawashi-tsuki i chudan-mawashi-geri.",
      "**Jiyu-kumite:** I kyokushin-kumite.",
      "**Jiyu-kumite:** 10 × 2 min.",
      "**Test sprawnościowy:** 50 ugięć ramion w podporze przodem na pięściach i kolanach; 30 ugięć ramion w podporze przodem na 5 palcach; 20 ugięć ramion w podporze przodem na 3 palcach; 40 skłonów w przód z leżenia na plecach.",
      "Test poruszania się w pozycji zenkutsu-dachi, kokutsu-dachi, kiba-dachi, neko-ashi-dachi i tsuru-ashi-dachi, stosując techniki zawarte w kihon-no-kata.",
    ],
  },
  "S-5": {
    staz: "Minimum 4 kolejne miesiące treningu",
    punkty: [
      "**Pozycje:** moro-ashi-dachi.",
      "**Uderzenia i cięcia:** shotei-uchi (jodan / chudan / gedan), hiji-age-ate-jodan.",
      "**Bloki:** shotei-uke (jodan / chudan / gedan), mae-mawashi-uke.",
      "**Kopnięcia:** ushiro-geri-chudan 3 metodami (przekrok z obrotem, obrót z miejsca, poprzez zakrok).",
      "**Kata:** pinan sono-san.",
      "**Kombinacje:** mae-geri-chudan, yoko-geri-chudan, ushiro-geri-chudan i chudan-gyaku-tsuki.",
      "**Oddychanie:** ibuki i nogare wykonywane w sanchin-dachi z morote-uke i gyaku-tsuki.",
      "**Ippon-kumite:** atak: migi-mae-geri-chudan; obrona: hidari-shotei-uke-gedan i kontra hidari-mae-geri-chudan i migi-jodan-gyaku-tsuki.",
      "**Jiyu-ippon-kumite:** atak: migi-mae-geri-chudan; obrona: hidari-shotei-uke-gedan plus kontra hidari-mae-geri-chudan, migi-chudan-gyaku-tsuki i migi-mawashi-geri-gedan.",
      "**Jiyu-ippon-kumite:** II kyokushin-kumite.",
      "**Jiyu-kumite:** 12 × 2 min.",
      "**Test kondycyjny:** 70 ugięć ramion w podporze przodem na pięściach i kolanach; 40 ugięć ramion w podporze przodem na 5 palcach; 30 ugięć ramion w podporze przodem na 3 palcach; 50 skłonów w przód z leżenia na plecach.",
      "Test poruszania się w pozycji moro-ashi-dachi, stosując techniki zawarte w kihon-no-kata.",
    ],
  },
  "S-4": {
    staz: "Minimum 6 kolejnych miesięcy treningu",
    punkty: [
      "**Pozycje:** heiko-dachi, kake-dachi.",
      "**Pozycje w formie kata:** lewa i prawa pozycja, początek w aktywnej pozycji heisoku-dachi. Pozycje zenkutsu-dachi, kokutsu-dachi, sanchin-dachi, neko-ashi-dachi, kiba-dachi, moro-ashi-dachi, kake-dachi i tsuru-ashi-dachi.",
      "**Uderzenia i cięcia:** 5 wariantów shuto w sanchin-dachi w kombinacji: shuto-sakotsu-uchi, -ganmen-uchi, -uchi-komi i -uchi-uchi.",
      "**Bloki:** 6 bloków w różnych pozycjach: shuto-jodan-kake-uke, shuto-jodan-uke, shuto-chudan-soto-uke, shuto-chudan-uchi-uke, shuto-gedan-barai, shuto-mae-mawashi-uke.",
      "**Kopnięcia:** yoko-geri-jodan, mawashi-geri-jodan (chusoku / haisoku), ushiro-geri-jodan.",
      "**Kata:** sanchin-no-kata.",
      "**Jiyu-ippon-kumite:** III kyokushin-kumite.",
      "**Jiyu-kumite:** 15 × 2 min, oceniając siłę, kondycję, rozciągnięcie, odporność, ducha walki i dyscyplinę.",
      "**Test sprawnościowy:** 30 ugięć ramion w podporze przodem na pięściach; 70 skłonów w przód z leżenia na plecach; 10 przeskoków nad partnerem w przysiadzie; 10 przeskoków przez własny pas w przód i w tył.",
    ],
  },
  "S-3": {
    staz: "Minimum 6 kolejnych miesięcy treningu",
    punkty: [
      "**Pozycje:** shiko-dachi.",
      "**Uderzenia i cięcia:** 6 uderzeń łokciem w pozycji kiba-dachi w kombinacji: chudan-hiji-ate, chudan-mae-hiji-ate, jodan-mae-hiji-ate, jodan-age-hiji-ate, oroshi-hiji-ate i ushiro-hiji-ate.",
      "**Bloki:** warianty shuto w pozycji sanchin-dachi w kombinacji: shuto-chudan-soto-uke, shuto-chudan-uchi-uke, shuto-mae-gedan-barai, shuto-mae-mawashi-uke, shuto-juji-jodan-uke i shuto-juji-gedan-uke.",
      "**Kopnięcia:** mae-kakato-geri (jodan / chudan / gedan), ago-jodan-geri.",
      "**Kata:** pinan sono-yon, kihon-kata sono-ni.",
      "**Yakusoku-ippon-kumite:** atakujący (tori) informuje, jaki atak wykona, broniący się (uke) musi przygotować obronę i kontrę z kiai.",
      "**Jiyu-ippon-kumite:** IV kyokushin-kumite.",
      "**Jiyu-kumite:** 20 × 2 min.",
      "**Test kondycyjny:** 50 ugięć ramion w podporze przodem na pięściach; 10 skłonów w przód z leżenia na plecach; 15 przeskoków nad partnerem w przysiadzie; 15 przeskoków nad pasem trzymanym oburącz.",
      "Test poruszania się w różnych pozycjach, stosując techniki z kihon-no-kata.",
      "Wiedza na temat Polskiego Związku Karate i Komisji Kyokushin.",
    ],
  },
  "S-2": {
    staz: "Minimum 8 kolejnych miesięcy treningu",
    punkty: [
      "**Uderzenia i cięcia:** hiraken-tsuki (chudan / jodan), hiraken-oroshi-uchi, hiraken-mawashi-uchi, haishu (chudan / jodan), age-jodan-tsuki.",
      "**Bloki:** koken-uke (chudan / jodan / gedan).",
      "**Kopnięcia:** tobi-nidan-geri, tobi-gyaku-mae-geri, tobi-oi-mae-geri.",
      "**Kata:** pinan sono-go, gekisai-dai.",
      "**Renraku:** lewa pozycja walki. Rozpoczęcie przez hidari-gedan-barai, następnie seiken-ago-uchi, seiken-gyaku-tsuki.",
      "**Jiyu-ippon-kumite:** V kyokushin-kumite.",
      "**Jiyu-kumite:** 25 × 2 min.",
      "**Test sprawnościowy:** 60 ugięć ramion w podporze przodem na pięściach; 20 ugięć ramion w podporze przodem na plecach; 100 skłonów w przód z leżenia na plecach ze skrętami do kolan; 20 przeskoków nad partnerem w przysiadzie; 20 przeskoków nad pasem trzymanym oburącz.",
      "**Ukemi-waza:** pady w bok, raz w prawo, raz w lewo.",
      "Karate-ne-waza.",
      "Znajomość przepisów walki sportowej kyokushin.",
    ],
  },
  "S-1": {
    staz: "Minimum 12 kolejnych miesięcy treningu",
    punkty: [
      "**Uderzenia i cięcia:** ryoto-ken-tsuki (chudan / jodan), naka-yubi-ippon-ken (chudan / jodan), oya-yubi-ken (chudan / jodan), atama-tsuki (mae / yoko / ushiro).",
      "**Bloki:** kake-uke-jodan, haito-uchi-uke.",
      "**Kopnięcia:** jodan-uchi-haisoku-geri, oroshi-uchi-kakato-geri, oroshi-soto-kakato-geri, tobi-yoko-geri.",
      "**Kata:** yantsu, tsuki-no-kata.",
      "**Renraku:** lewa pozycja walki. Poruszanie się, atakując: oi-tsuki, gyaku-tsuki, mawashi-tsuki, shita-tsuki. Poruszanie się, atakując: oi-mawashi-geri, oi-tsuki, gyaku-tsuki, gyaku-mawashi, gedan-barai.",
      "**Tachi-waza:** o-soto-gari, o-uchi-gari, de-ashi-barai, o-goshi, soei-nage.",
      "**Jiyu-ippon-kumite:** VI kyokushin-kumite.",
      "**Jiyu-kumite:** 25 × 2 min.",
      "**Tameshiwari** z użyciem 1 standardowej deski (30 × 20 × 2,5 cm): seiken-tsuki, shuto-sakotsu-uchi, keri.",
      "**Test sprawnościowy:** 70 ugięć ramion w podporze przodem na pięściach; 20 ugięć ramion w podporze przodem na 3 palcach; 100 skłonów w przód z leżenia na plecach z podwójnym skrętem; 25 przeskoków nad partnerem w przysiadzie; 30 przeskoków przez własny pas.",
      "Dobra znajomość nomenklatury japońskiej stosowanej w kyokushin.",
    ],
  },
  "D-1": {
    staz: "Minimum kolejny 1 rok treningu",
    punkty: [
      "Znajomość całego materiału do 1. kyu włącznie.",
      "**Uderzenia i cięcia:** morote-haito-uchi (chudan / jodan), haito-uchi (gedan / chudan / jodan).",
      "**Bloki:** morote-kake-uke (chudan / jodan), osae-uke-chudan.",
      "**Kopnięcia:** kake-geri (kakato / chusoku), ushiro-mawashi-geri (gedan / chudan / jodan).",
      "**Kata:** tensho, saiha, taikyoku-ura.",
      "**Renraku:** migi-mawashi-geri-jodan, hidari-ushiro-mawashi-geri-jodan, migi-jodan-mae, hidari-mawashi-geri-jodan, migi-ushiro-mawashi-geri-jodan.",
      "**Jiyu-ippon-kumite:** wszystkie kyokushin-kumite.",
      "**Jiyu-kumite:** minimum 30 × 2 min.",
      "**Tameshiwari** z użyciem 2 standardowych desek: seiken-tsuki, shuto-sakotsu-uchi, keri-waza.",
      "**Test sprawnościowy:** 80 ugięć ramion w podporze przodem na pięściach; 25 ugięć ramion w podporze przodem na 3 palcach; 150 skłonów w przód z leżenia na plecach; 100 przysiadów; 25 przeskoków nad kijem trzymanym w rękach.",
      "Wszystkie techniki w odwrotnej pozycji (gyaku).",
      "Przeszkolenie w zakresie pierwszej pomocy.",
    ],
  },
  "D-2": {
    staz: "Minimum kolejne 3 lata treningu",
    punkty: [
      "Znajomość całego materiału do 1. dan włącznie.",
      "**Uderzenia i cięcia:** toho-uchi, keiko-uchi.",
      "**Bloki:** hiji-uke-chudan, gedan-shotei-morote-uke, gedan-shuto-morote-uke.",
      "**Kopnięcia:** tobi-ushiro-geri, tobi-ushiro-mawashi-geri, tobi-mawashi-geri, age-kakato-ushiro-geri.",
      "**Kata:** kanku-dai, gekisai-sho, seienchin, pinan sono-ichi ura.",
      "**Jiyu-kumite:** minimum 35 × 2 min.",
      "**Tameshiwari** z użyciem 2 standardowych desek: minimum 4 techniki.",
      "**Test sprawnościowy:** 90 ugięć ramion w podporze przodem na pięściach; 20 ugięć ramion w podporze przodem na 2 palcach; 150 skłonów w przód z leżenia na plecach; 100 przysiadów.",
      "Udział w mistrzostwach Polski lub turnieju międzynarodowym.",
      "Uprawnienia sędziego krajowego.",
    ],
  },
  "D-3": {
    staz: "Minimum kolejne 3 lata treningu",
    punkty: [
      "Znajomość całego materiału do 2. dan włącznie.",
      "**Kata:** sushi-ho, garyu, seipai, pinan sono-ni, sono-san i sono-yon ura, Bo-kata-tsyon.",
      "**Jiyu-kumite:** minimum 50 walk po 2 minuty.",
      "**Tameshiwari:** minimum 5 technik.",
      "**Test kondycyjny:** 100 ugięć ramion w podporze przodem na pięściach; 25 ugięć ramion w podporze przodem na 2, 3 i 5 palcach; 200 uniesień tułowia z leżenia na plecach ze skrętem tułowia; 150 przysiadów.",
      "Licencja sędziego międzynarodowego oraz wiedza medyczna na poziomie ratownika.",
    ],
  },
};

// Wymagania jako Markdown – tak trafiają do kolumny grades.requirements.
export function requirementsMarkdown(code: string): string | null {
  const req = requirements[code];
  if (!req) {
    const dan = code.startsWith("D-") ? Number(code.slice(2)) : 0;
    return dan > 3 ? "Wymagania na wyższe stopnie dan są w gestii Światowej Organizacji Kyokushin Honbu Tokyo." : null;
  }
  const lines = LABELS.filter(([key]) => req[key]).map(([key, label]) => `- **${label}:** ${req[key]}`);
  if (req.punkty?.length) lines.push("", ...req.punkty.map((p, i) => `${i + 1}. ${p}`));
  return lines.join("\n");
}
