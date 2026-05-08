import { useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  ArrowLeft,
  BookOpen,
  Languages,
  Mic,
  PenLine,
  Tags,
  Plus,
  Sparkles,
} from "lucide-react";
import { auth, db } from "../firebase/firebase";

function AddWord() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [example, setExample] = useState("");
  const [category, setCategory] = useState("");

  const handleAddWord = async (e) => {
    e.preventDefault();

    if (!word || !meaning) {
      alert("Söz və məna mütləq yazılmalıdır");
      return;
    }

    await addDoc(collection(db, "words"), {
      word: word.trim(),
      meaning: meaning.trim(),
      pronunciation: pronunciation.trim(),
      example: example.trim(),
      category,
      status: "learning",
      userId: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    });

    setWord("");
    setMeaning("");
    setPronunciation("");
    setExample("");
    setCategory("");

    alert("Söz əlavə edildi ✅");
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#f6f1e8] text-slate-900">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-100px] top-[-100px] h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute right-[-120px] top-40 h-80 w-80 rounded-full bg-slate-900/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-3 font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="mt-6 grid w-full gap-6 lg:grid-cols-2">
          <section className="min-w-0 rounded-[2rem] bg-slate-950 p-5 text-white shadow-2xl sm:p-7 lg:p-8">
            <div className="grid h-14 w-14 place-items-center rounded-3xl bg-white/10 sm:h-16 sm:w-16">
              <BookOpen size={30} />
            </div>

            <p className="mt-7 inline-flex max-w-full items-center gap-2 rounded-full bg-amber-200 px-4 py-2 text-sm font-bold text-slate-950">
              <Sparkles size={15} className="shrink-0" />
              <span className="truncate">DailyLex Word Builder</span>
            </p>

            <h1 className="mt-6 break-words text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Add a new word to your dictionary.
            </h1>

            <p className="mt-5 leading-8 text-slate-300">
              Gün ərzində öyrəndiyin sözü burada saxla. Məna, tələffüz,
              kateqoriya və nümunə cümlə əlavə etməklə öz şəxsi lüğətini qur.
            </p>

            <div className="mt-8 rounded-3xl bg-white/10 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400 sm:text-sm sm:tracking-[0.25em]">
                Example
              </p>

              <h2 className="mt-4 break-words text-4xl font-black">obtain</h2>
              <p className="mt-2 text-slate-300">/əbˈteɪn/</p>
              <p className="mt-4 text-xl font-semibold">əldə etmək</p>
            </div>
          </section>

          <section className="min-w-0 rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-2xl backdrop-blur-xl sm:p-7 lg:p-8">
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Word Details
            </h2>

            <p className="mt-2 text-slate-500">
              Söz kartını tamamlamaq üçün məlumatları daxil et.
            </p>

            <form onSubmit={handleAddWord} className="mt-8 grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block min-w-0">
                  <span className="mb-2 flex items-center gap-2 font-bold text-slate-700">
                    <BookOpen size={18} />
                    Word
                  </span>
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-white/80 p-4 outline-none transition focus:border-slate-400"
                    placeholder="obtain"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                  />
                </label>

                <label className="block min-w-0">
                  <span className="mb-2 flex items-center gap-2 font-bold text-slate-700">
                    <Languages size={18} />
                    Meaning
                  </span>
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-white/80 p-4 outline-none transition focus:border-slate-400"
                    placeholder="əldə etmək"
                    value={meaning}
                    onChange={(e) => setMeaning(e.target.value)}
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block min-w-0">
                  <span className="mb-2 flex items-center gap-2 font-bold text-slate-700">
                    <Mic size={18} />
                    Pronunciation
                  </span>
                  <input
                    className="w-full rounded-2xl border border-slate-200 bg-white/80 p-4 outline-none transition focus:border-slate-400"
                    placeholder="/əbˈteɪn/"
                    value={pronunciation}
                    onChange={(e) => setPronunciation(e.target.value)}
                  />
                </label>

                <label className="block min-w-0">
                  <span className="mb-2 flex items-center gap-2 font-bold text-slate-700">
                    <Tags size={18} />
                    Category
                  </span>
                  <select
                    className="w-full rounded-2xl border border-slate-200 bg-white/80 p-4 outline-none transition focus:border-slate-400"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    <option value="Verb">Verb</option>
                    <option value="Noun">Noun</option>
                    <option value="Adjective">Adjective</option>
                    <option value="Adverb">Adverb</option>
                    <option value="Daily">Daily</option>
                    <option value="Academic">Academic</option>
                  </select>
                </label>
              </div>

              <label className="block min-w-0">
                <span className="mb-2 flex items-center gap-2 font-bold text-slate-700">
                  <PenLine size={18} />
                  Example Sentence
                </span>
                <textarea
                  className="min-h-36 w-full rounded-2xl border border-slate-200 bg-white/80 p-4 outline-none transition focus:border-slate-400"
                  placeholder="I want to obtain more knowledge every day."
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                />
              </label>

              <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 font-bold text-white shadow-xl transition hover:bg-slate-800 sm:w-auto">
                <Plus size={20} />
                Add Word
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AddWord;
