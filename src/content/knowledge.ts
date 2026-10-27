import type { Article, KnowledgeCategory } from "@/lib/types";

// Treści startowe sekcji „Teoria i Wiedza”. `npm run db:seed` wgrywa je do Supabase,
// a bez skonfigurowanej bazy aplikacja wyświetla je bezpośrednio z tego pliku.

export const knowledgeCategories: KnowledgeCategory[] = [
  {
    slug: "historia",
    name: "Historia",
    description: "Korzenie karate Kyokushin, jego twórca i rozwój na świecie.",
    sort_order: 1,
  },
  {
    slug: "zasady-i-etykieta",
    name: "Zasady i etykieta",
    description: "Dojo Kun, ukłony, zachowanie na sali i wobec innych.",
    sort_order: 2,
  },
  {
    slug: "stopnie-i-egzaminy",
    name: "Stopnie i egzaminy",
    description: "System kyu i dan, kolory pasów, przygotowanie do egzaminu.",
    sort_order: 3,
  },
  {
    slug: "wiedza-treningowa",
    name: "Wiedza treningowa",
    description: "Artykuły o technice, przygotowaniu fizycznym i zdrowiu.",
    sort_order: 4,
  },
];

type SeedArticle = Omit<Article, "id" | "updated_at">;

export const seedArticles: SeedArticle[] = [
  {
    slug: "historia-kyokushin",
    title: "Historia karate Kyokushin",
    excerpt:
      "Od samotnego treningu w górach Masutatsu Oyamy do jednej z najpopularniejszych szkół karate na świecie.",
    category_slug: "historia",
    published: true,
    sort_order: 1,
    body: `## Twórca: Masutatsu Oyama

Karate Kyokushin stworzył **Masutatsu Oyama** (1923–1994). Urodził się w Korei, a jako młody człowiek wyjechał do Japonii, gdzie trenował karate Shotokan pod okiem Gichina Funakoshiego oraz Goju-ryu. Wiele lat spędził na samotnym treningu w górach, szlifując technikę, siłę i ducha.

Oyama zasłynął pokazami siły i wytrzymałości, a także ideą sprawdzania technik w pełnym kontakcie. Uważał, że karate musi być skuteczne, a nie tylko efektowne.

## Narodziny stylu

W latach 50. Oyama prowadził w Tokio własne dojo, którego treningi słynęły z twardości i realnej walki. W **1964 roku** założył organizację **IKO Kyokushinkaikan** z siedzibą (Honbu) w Tokio.

Nazwa **Kyokushin** (極真) oznacza „najwyższą prawdę” lub „ostateczną rzeczywistość”.

## Pełny kontakt

Wyróżnikiem Kyokushin jest **walka w pełnym kontakcie** (knockdown): ciosy i kopnięcia zadaje się z pełną siłą, a o zwycięstwie decyduje skuteczność. Ze względów bezpieczeństwa w zawodach nie wolno uderzać rękami w głowę, dozwolone są natomiast kopnięcia na głowę.

Pierwsze mistrzostwa Japonii odbyły się w 1969 roku, a pierwsze otwarte mistrzostwa świata w 1975 roku w Tokio.

## Kyokushin na świecie i w Polsce

Styl szybko rozprzestrzenił się po całym świecie. Do Polski trafił w latach 70., a pierwsze kluby powstawały m.in. w Krakowie. Po śmierci Oyamy w 1994 roku ruch podzielił się na kilka organizacji, ale wszystkie odwołują się do tych samych korzeni, kata i zasad.

> Treść startowa. Uzupełnij ją o historię Twojego klubu i organizacji w panelu admina.`,
  },
  {
    slug: "dojo-kun",
    title: "Dojo Kun – przysięga dojo",
    excerpt:
      "Siedem zasad recytowanych na zakończenie treningu. Ich autorem jest Masutatsu Oyama wraz z pisarzem Eiji Yoshikawą.",
    category_slug: "zasady-i-etykieta",
    published: true,
    sort_order: 1,
    body: `Dojo Kun recytuje się na koniec treningu, w pozycji seiza. Prowadzący wypowiada każdy wers, a grupa powtarza go głośno. Każdy wers zaczyna się od słów **„Hitotsu! Wareware wa…”** („Po pierwsze! My…”).

1. **Hitotsu, wareware wa shinshin o renmashi, kakko fubatsu no shingi o kiwameru koto.**  
   Będziemy ćwiczyć nasze serca i ciała, aby osiągnąć mocnego, niezachwianego ducha.

2. **Hitotsu, wareware wa bu no shinzui o kiwame, ki ni hasshi, kan ni bin naru koto.**  
   Będziemy dążyć do zrozumienia prawdziwej istoty sztuki walki, aby nasze zmysły były zawsze czujne.

3. **Hitotsu, wareware wa shitsujitsu goken o motte, kokki no seishin o kanyo suru koto.**  
   Z prawdziwą wytrwałością będziemy kształtować ducha samozaparcia.

4. **Hitotsu, wareware wa reisetsu o omonji, choue o keishi, sobo no furumai o tsutsushimu koto.**  
   Będziemy przestrzegać zasad grzeczności, szanować starszych i powstrzymywać się od przemocy.

5. **Hitotsu, wareware wa shinbutsu o tattobi, kenjo no bitoku o wasurezaru koto.**  
   Będziemy szanować wartości duchowe i nigdy nie zapomnimy o cnocie pokory.

6. **Hitotsu, wareware wa chisei to tairyoku to o kojo sase, koto ni nozonde ayamatazaru koto.**  
   Będziemy dążyć do mądrości i siły, nie szukając innych pragnień.

7. **Hitotsu, wareware wa shogai no shugyo o karate no michi ni tsuuji, Kyokushin no michi o mattou suru koto.**  
   Przez całe życie, poprzez dyscyplinę karate, będziemy dążyć do wypełnienia prawdziwego sensu drogi Kyokushin.

> Polskie tłumaczenia różnią się nieco między organizacjami. Dostosuj je do wersji używanej w Twoim dojo.`,
  },
  {
    slug: "etykieta-w-dojo",
    title: "Etykieta w dojo",
    excerpt:
      "Ukłony, „Osu!”, przebieg rozpoczęcia i zakończenia treningu oraz podstawowe zasady zachowania na sali.",
    category_slug: "zasady-i-etykieta",
    published: true,
    sort_order: 2,
    body: `## Wejście i wyjście z dojo

- Przy wejściu i wyjściu z sali wykonujemy ukłon (**rei**) w stronę shomen (ściany honorowej) i mówimy **„Osu!”**.
- Na trening przychodzimy przed czasem, w czystym dogi i z poprawnie zawiązanym pasem (**obi**).
- Paznokcie są krótkie, biżuteria zdjęta, a telefon zostaje w szatni.

## Rozpoczęcie treningu

1. Uczniowie ustawiają się w szeregach według stopni: najwyższy stopień po prawej stronie, z przodu.
2. Komenda **„Seiza!”** oznacza siad klęczny. **„Mokuso!”** oznacza zamknięcie oczu i wyciszenie, a **„Mokuso yame!”** jego koniec.
3. Następują ukłony: **„Shomen ni rei!”** (w stronę ściany honorowej), **„Shihan/Sensei ni rei!”** (do prowadzącego), **„Otagai ni rei!”** (do siebie nawzajem).

## Podczas treningu

- Na każde polecenie prowadzącego odpowiadamy głośnym **„Osu!”**.
- Jeśli musisz poprawić strój, odwróć się tyłem do shomen.
- Spóźniony uczeń czeka w seiza przy wejściu, aż prowadzący pozwoli mu dołączyć.
- Partnerowi w kumite okazujemy szacunek: ukłon przed i po każdym ćwiczeniu.
- Nie opuszczamy sali bez zgody prowadzącego.

## Zakończenie treningu

Trening kończy recytacja **Dojo Kun**, mokuso i ukłony. Po treningu dziękujemy prowadzącemu i partnerom słowami **„Osu, arigato gozaimashita!”**.

## „Osu!”

„Osu” to najważniejsze słowo w Kyokushin. Oznacza szacunek, zrozumienie, zgodę i gotowość do wysiłku. Wywodzi się od wyrażenia *oshi shinobu*, czyli „wytrwać pod presją”.`,
  },
  {
    slug: "system-stopni-kyu-dan",
    title: "System stopni: Junior i Senior",
    excerpt:
      "Dwa tory stopni: juniorzy do 15 lat zdobywają kyu w podstopniach (10.1, 10.2, 10.3…), seniorzy od 16 lat pełne kyu i dan.",
    category_slug: "stopnie-i-egzaminy",
    published: true,
    sort_order: 1,
    body: `W Kyokushin stopnie uczniowskie (**kyu**) liczy się w dół, od 10. do 1. kyu. Potem zaczynają się stopnie mistrzowskie (**dan**), liczone w górę od 1. do 8. dan. W naszym klubie obowiązują dwa tory: **Junior** i **Senior**.

## Junior: do 15. roku życia

Dzieci i młodzież zdobywają każde kyu od 10. do 5. w trzech krokach (np. 10.1, 10.2, 10.3). Podstopień oznaczają **czerwone belki** na pasie: jedna, dwie lub trzy. Na przykład 9.3 kyu to pas pomarańczowy z niebieską belką i trzema czerwonymi, a 7.1 kyu to pas niebieski z żółtą belką i jedną czerwoną.

Po ukończeniu 16 lat zawodnik przechodzi do toru Senior.

## Senior: od 16. roku życia

Seniorzy zdobywają pełne kyu, bez podstopni. **Egzaminy na 4. kyu i wyższe stopnie mogą zdawać wyłącznie osoby, które ukończyły 16 lat.**

- 10 i 9 kyu: pas pomarańczowy
- 8 i 7 kyu: pas niebieski
- 6 i 5 kyu: pas żółty
- 4 i 3 kyu: pas zielony
- 2 i 1 kyu: pas brązowy

Na nieparzystym kyu pas ma belkę w kolorze kolejnego pasa.

## Dan: stopnie mistrzowskie

Czarny pas ze złotymi belkami: 1 dan to jedna złota belka, 2 dan dwie, i tak dalej aż do 8 dan.

Pełne tabele z rysunkami pasów znajdziesz poniżej i na stronie [Stopnie i pasy](/wiedza/stopnie).`,
  },
];
