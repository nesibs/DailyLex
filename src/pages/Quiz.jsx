import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

import {
  ArrowLeft,
  Brain,
  Eye,
  Shuffle,
  BookOpen,
  Sparkles,
} from "lucide-react";

import { auth, db } from "../firebase/firebase";

function Quiz() {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const chooseRandomWord = (list) => {
    if (list.length === 0) return;

    const randomIndex = Math.floor(Math.random() * list.length);

    setCurrentWord(list[randomIndex]);
    setShowAnswer(false);
  };

  useEffect(() => {
    const getWords = async () => {
      const q = query(
        collection(db, "words"),
        where("userId", "==", auth.currentUser.uid)
      );

      const data = await getDocs(q);

      const wordList = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setWords(wordList);
      chooseRandomWord(wordList);
    };

    getWords();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#f6f1e8] text-slate-900">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-100px] top-[-100px] h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute right-[-120px] top-40 h-80 w-80 rounded-full bg-slate-900/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-5 sm:px-6 lg:px-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-3 font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="mt-6 rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-2xl backdrop-blur-xl sm:p-6 md:p-10">
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-slate-950 text-white shadow-xl">
              <Brain size={30} />
            </div>

            <p className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-800">
              <Sparkles size={15} className="shrink-0" />
              <span className="truncate">Daily practice mode</span>
            </p>

            <h1 className="mt-5 break-words text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
              Vocabulary Quiz
            </h1>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
              Sözə bax, mənasını yadına sal, sonra cavabı göstər və növbəti
              random sözlə davam et.
            </p>
          </div>

          {!currentWord ? (
            <div className="mt-10 rounded-[1.5rem] bg-slate-950 p-8 text-center text-white">
              <BookOpen className="mx-auto" size={36} />

              <h2 className="mt-4 text-2xl font-black">
                No words yet
              </h2>

              <p className="mt-2 text-slate-300">
                Quiz üçün əvvəlcə lüğətinə söz əlavə etməlisən.
              </p>

              <Link
                to="/add-word"
                className="mt-6 inline-block rounded-2xl bg-white px-6 py-3 font-bold text-slate-950"
              >
                Add Word
              </Link>
            </div>
          ) : (
            <div className="mt-10">
              <div className="rounded-[2rem] bg-slate-950 p-6 text-center text-white shadow-2xl sm:p-8 md:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200 sm:text-sm sm:tracking-[0.35em]">
                  Guess the meaning
                </p>

                <h2 className="mt-8 break-words text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                  {currentWord.word}
                </h2>

                {currentWord.pronunciation && (
                  <p className="mt-4 break-all text-lg text-slate-300 sm:text-xl">
                    {currentWord.pronunciation}
                  </p>
                )}

                {currentWord.category && (
                  <span className="mt-6 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200">
                    {currentWord.category}
                  </span>
                )}
              </div>

              {showAnswer && (
                <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 sm:text-sm sm:tracking-[0.25em]">
                    Meaning
                  </p>

                  <p className="mt-3 break-words text-2xl font-black text-slate-950 sm:text-3xl">
                    {currentWord.meaning}
                  </p>

                  {currentWord.example && (
                    <p className="mt-5 break-words border-l-4 border-amber-300 pl-4 text-base italic leading-8 text-slate-600 sm:text-lg">
                      “{currentWord.example}”
                    </p>
                  )}
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={() => setShowAnswer(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 font-bold text-white shadow-xl transition hover:bg-slate-800 sm:w-auto"
                >
                  <Eye size={20} />
                  Show Answer
                </button>

                <button
                  onClick={() => chooseRandomWord(words)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 font-bold text-slate-950 shadow-sm transition hover:shadow-lg sm:w-auto"
                >
                  <Shuffle size={20} />
                  Next Word
                </button>
              </div>

              <p className="mt-6 text-center text-sm font-medium text-slate-500">
                Total words in quiz: {words.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;