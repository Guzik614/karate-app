// Quiz z teorii do każdego stopnia. Pytania odpowiadają sekcji „Teoria i komendy”
// z wymagań juniorskich KWF (src/content/grade-requirements.ts).
// Senior n kyu dostaje pytania z juniorskich stopni n.1–n.3, od 4 kyu i na dan pytania ze wszystkich.

export type QuizQuestion = {
  question: string;
  answer: string; // poprawna odpowiedź
  wrong: string[];
};

export const QUIZ_PASS_PERCENT = 80;
const MAX_QUESTIONS = 10;
const REVIEW_QUESTIONS = 3; // pytania powtórkowe z niższych stopni

const q = (question: string, answer: string, ...wrong: string[]): QuizQuestion => ({ question, answer, wrong });

const bank: Record<string, QuizQuestion[]> = {
  "J-10.1": [
    q("Co oznacza słowo jodan?", "Poziom górny (głowa)", "Poziom środkowy (tułów)", "Poziom dolny (nogi)"),
    q("Co oznacza słowo chudan?", "Poziom środkowy (tułów)", "Poziom górny (głowa)", "Poziom dolny (nogi)"),
    q("Co oznacza słowo gedan?", "Poziom dolny (poniżej pasa)", "Poziom górny (głowa)", "Poziom środkowy (tułów)"),
    q("Co to jest kiai?", "Okrzyk, który dodaje siły technice", "Ukłon na koniec treningu", "Rodzaj kopnięcia"),
    q(
      "Czy na treningu można mieć na sobie zegarek albo łańcuszek?",
      "Nie, zdejmujemy wszystko, co może kogoś zranić",
      "Tak, jeśli jest mały",
      "Tak, ale tylko na rozgrzewce",
    ),
    q(
      "Co robisz, gdy coś cię zaboli na treningu?",
      "Od razu mówię o tym instruktorowi",
      "Ćwiczę dalej i nic nie mówię",
      "Wychodzę z sali bez słowa",
    ),
  ],
  "J-10.2": [
    q("Co to jest seiza?", "Siad klęczny na piętach", "Pozycja walki", "Okrzyk przy ciosie"),
    q("Co oznacza komenda naore?", "Powrót do pozycji wyjściowej", "Zacznij", "Obrót"),
    q(
      "Kiedy kłaniamy się w dojo?",
      "Przy wejściu i wyjściu z sali oraz na początku i końcu treningu",
      "Tylko na egzaminie",
      "Tylko gdy instruktor się spóźni",
    ),
  ],
  "J-10.3": [
    q("Co oznacza słowo karate?", "Pusta ręka", "Silna pięść", "Droga wojownika"),
    q(
      "Kiedy mówimy osu?",
      "Na powitanie, gdy rozumiemy polecenie i gdy dziękujemy",
      "Tylko na koniec walki",
      "Gdy chcemy przerwać ćwiczenie",
    ),
  ],
  "J-9.1": [
    q("Jak nazywa się strój do karate?", "Karategi", "Kimono do judo", "Hakama"),
    q("Która poła bluzy karategi jest na wierzchu?", "Lewa", "Prawa", "Obojętnie"),
    q("Jak po japońsku powiesz „jeden”?", "Ichi", "Ni", "Go"),
    q("Jak po japońsku powiesz „trzy”?", "San", "Shi", "Roku"),
    q("Jak po japońsku powiesz „pięć”?", "Go", "Hachi", "Ichi"),
    q("Jak po japońsku powiesz „dziesięć”?", "Ju", "Ku", "Shichi"),
  ],
  "J-9.2": [
    q("Kto to jest sensei?", "Nauczyciel, instruktor", "Najmłodszy uczeń", "Sędzia na zawodach"),
    q("Kto to jest sempai?", "Starszy stopniem kolega", "Założyciel karate", "Młodszy uczeń"),
    q("Kto to jest shihan?", "Mistrz, nauczyciel instruktorów", "Początkujący uczeń", "Rodzic ucznia"),
  ],
  "J-9.3": [
    q("Co oznacza słowo kyoku?", "Ostateczny, najwyższy", "Prawda", "Stowarzyszenie"),
    q("Co oznacza słowo shin?", "Prawda", "Pięść", "Szkoła"),
    q("Co oznacza słowo kai?", "Stowarzyszenie, spotkanie", "Okrzyk", "Ręka"),
  ],
  "J-8.1": [
    q("Ile punktów ma przysięga dojo Kyokushin?", "7", "5", "10"),
    q("Kiedy recytujemy przysięgę dojo?", "Na zakończenie treningu", "W trakcie walki", "Tylko na egzaminie na czarny pas"),
  ],
  "J-8.2": [
    q(
      "Na czym polega oddychanie nogare?",
      "Spokojny wdech nosem i długi, cichy wydech ustami",
      "Głośny okrzyk przy każdym ciosie",
      "Wstrzymanie oddechu na minutę",
    ),
    q("Do czego służy nogare?", "Do uspokojenia oddechu i odzyskania sił", "Do rozgrzewki nóg", "Do liczenia powtórzeń"),
  ],
  "J-8.3": [
    q("Jakie dwa rodzaje oddychania ćwiczymy w Kyokushin?", "Nogare i ibuki", "Kiai i osu", "Seiza i naore"),
  ],
  "J-7.1": [
    q(
      "Na czym polega oddychanie ibuki?",
      "Mocny wydech z napięciem mięśni brzucha",
      "Ciche oddychanie przez nos podczas snu",
      "Szybkie oddychanie w biegu",
    ),
  ],
  "J-7.2": [
    q(
      "Co robisz, gdy spóźnisz się na trening?",
      "Siadam w seiza przy wejściu i czekam na zgodę instruktora",
      "Od razu dołączam do ćwiczeń",
      "Czekam w szatni do końca",
    ),
    q("Czy w dojo można żuć gumę?", "Nie", "Tak", "Tylko na rozgrzewce"),
    q("Jak odpowiadasz na polecenie instruktora?", "Osu", "Hajime", "Yame"),
  ],
  "J-7.3": [
    q("Kto założył karate Kyokushin?", "Masutatsu Oyama", "Gichin Funakoshi", "Bruce Lee"),
    q("W którym roku założono organizację Kyokushinkaikan?", "1964", "1923", "1994"),
    q("Jak nazywa się główna siedziba Kyokushin w Tokio?", "Honbu", "Dojo kun", "Shihan"),
    q("Ilu walk z rzędu wymaga legendarny test kumite Sosaia Oyamy?", "100", "10", "1000"),
  ],
  "J-6.2": [
    q("Co oznacza skrót KWF?", "Kyokushin World Federation", "Karate Wielka Federacja", "Kumite Walka Finał"),
    q("W jakim kraju powstało karate Kyokushin?", "W Japonii", "W Chinach", "W Polsce"),
  ],
  "J-5.1": [
    q("Co oznacza hidari?", "Lewy", "Prawy", "Przód"),
    q("Co oznacza migi?", "Prawy", "Lewy", "Tył"),
    q("Co oznacza ushiro?", "Tył", "Bok", "Przód"),
    q("Co oznacza geri?", "Kopnięcie", "Cios", "Blok"),
    q("Co oznacza uke?", "Blok", "Kopnięcie", "Pozycja"),
    q("Co oznacza dachi?", "Pozycja", "Uderzenie", "Obrót"),
  ],
  "J-5.2": [
    q("Co oznacza komenda hajime?", "Zacznij", "Stop", "Obrót"),
    q("Co oznacza komenda yame?", "Stop, przerwij", "Zacznij", "Ukłon"),
    q("Co oznacza komenda mawatte?", "Obrót", "Siad", "Powrót"),
    q("Co oznacza komenda mokuso?", "Zamknij oczy, medytacja", "Kopnij", "Wstań"),
    q("Co oznacza komenda yoi?", "Gotowość", "Koniec", "Ukłon"),
  ],
  "J-5.3": [
    q("Co oznacza na zawodach waza-ari?", "Pół punktu", "Remis", "Dyskwalifikacja"),
    q("Co oznacza na zawodach ippon?", "Pełny punkt, wygrana", "Dogrywka", "Ostrzeżenie"),
    q("Co oznacza na zawodach hikiwake?", "Remis", "Wygrana", "Początek walki"),
    q("Co oznacza na zawodach encho?", "Dogrywka", "Przerwa", "Pół punktu"),
    q("Co oznacza na zawodach hantei?", "Decyzja sędziów", "Kopnięcie", "Ukłon"),
  ],
};

const juniorCodes = Object.keys(bank);

// Kody juniorskie, z których bierzemy pytania dla danego stopnia.
function sourceCodes(code: string): { current: string[]; lower: string[] } {
  if (code.startsWith("J-")) {
    const i = juniorCodes.indexOf(code);
    if (i >= 0) return { current: [code], lower: juniorCodes.slice(0, i) };
    // Stopień bez własnej teorii: powtórka wszystkiego, co było wcześniej.
    const level = Number(code.slice(2));
    return { current: [], lower: juniorCodes.filter((c) => Number(c.slice(2)) > level) };
  }
  const kyu = code.startsWith("S-") ? Number(code.slice(2)) : 0;
  if (kyu >= 5) {
    const current = juniorCodes.filter((c) => Math.floor(Number(c.slice(2))) === kyu);
    return { current, lower: juniorCodes.filter((c) => Number(c.slice(2)) > kyu + 1) };
  }
  return { current: juniorCodes, lower: [] };
}

// Stały „los” zależny od kodu stopnia, żeby serwer i przeglądarka pokazały te same pytania.
function seeded(code: string) {
  let h = 0;
  for (const ch of code) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return () => {
    h = (h * 1103515245 + 12345) >>> 0;
    return h / 2 ** 32;
  };
}

function shuffle<T>(items: T[], random: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export type PreparedQuestion = { question: string; options: string[]; correct: number };

export function getTheoryQuiz(code: string): PreparedQuestion[] {
  const random = seeded(code);
  const { current, lower } = sourceCodes(code);
  const main = shuffle(
    current.flatMap((c) => bank[c]),
    random,
  ).slice(0, MAX_QUESTIONS);
  const review = shuffle(
    lower.flatMap((c) => bank[c]),
    random,
  ).slice(0, main.length ? Math.min(REVIEW_QUESTIONS, MAX_QUESTIONS - main.length) : MAX_QUESTIONS);

  return [...main, ...review].map(({ question, answer, wrong }) => {
    const options = shuffle([answer, ...wrong], random);
    return { question, options, correct: options.indexOf(answer) };
  });
}
