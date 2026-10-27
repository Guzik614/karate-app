"use client";

import { useState, useSyncExternalStore } from "react";
import type { PreparedQuestion } from "@/content/theory-quiz";

type Props = {
  code: string;
  questions: PreparedQuestion[];
  passPercent: number;
};

const storageKey = (code: string) => `quiz-teoria:${code}`;

function readPassed(code: string) {
  try {
    return localStorage.getItem(storageKey(code)) === "zaliczone";
  } catch {
    return false;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

// Quiz z teorii: zaznacz odpowiedzi, sprawdź wynik. Zaliczenie zapamiętujemy w tej przeglądarce.
export function TheoryQuiz({ code, questions, passPercent }: Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [checked, setChecked] = useState(false);
  const passedBefore = useSyncExternalStore(
    subscribe,
    () => readPassed(code),
    () => false,
  );

  const score = answers.filter((a, i) => a === questions[i].correct).length;
  const percent = Math.round((score / questions.length) * 100);
  const passed = percent >= passPercent;
  const complete = answers.every((a) => a !== null);

  function check() {
    setChecked(true);
    if (!passed) return;
    try {
      localStorage.setItem(storageKey(code), "zaliczone");
    } catch {}
  }

  function reset() {
    setAnswers(questions.map(() => null));
    setChecked(false);
  }

  return (
    <div>
      {passedBefore && !checked && (
        <p className="mb-4 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-accent-text">
          ✓ Ten quiz masz już zaliczony. Możesz go powtórzyć.
        </p>
      )}
      <ol className="space-y-5">
        {questions.map((question, i) => (
          <li key={question.question}>
            <p className="mb-2 font-medium">
              {i + 1}. {question.question}
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {question.options.map((option, j) => {
                const selected = answers[i] === j;
                let style = selected ? "border-accent bg-accent/10" : "border-border bg-input hover:border-accent";
                if (checked && j === question.correct) style = "border-green-500 bg-green-500/15";
                else if (checked && selected) style = "border-red-500 bg-red-500/15";
                return (
                  <button
                    key={option}
                    type="button"
                    disabled={checked}
                    onClick={() => setAnswers((prev) => prev.map((a, k) => (k === i ? j : a)))}
                    className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${style}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {checked ? (
          <>
            <p className={`text-lg font-bold ${passed ? "text-green-500" : "text-red-500"}`}>
              {passed ? "Zaliczone!" : "Niezaliczone"} {score}/{questions.length} ({percent}%)
            </p>
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-border px-4 py-2 text-sm hover:border-accent"
            >
              Spróbuj jeszcze raz
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={check}
              disabled={!complete}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
            >
              Sprawdź odpowiedzi
            </button>
            <span className="text-sm text-muted">Aby zaliczyć, potrzebujesz {passPercent}% poprawnych odpowiedzi.</span>
          </>
        )}
      </div>
    </div>
  );
}
