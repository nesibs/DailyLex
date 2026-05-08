import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  ArrowLeft,
  Search,
  Pencil,
  Trash2,
  CheckCircle2,
  RotateCcw,
  BookOpen,
  Sparkles,
} from "lucide-react";

import { auth, db } from "../firebase/firebase";

function MyWords() {
  const [words, setWords] = useState([]);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editWord, setEditWord] = useState("");
  const [editMeaning, setEditMeaning] = useState("");
  const [editPronunciation, setEditPronunciation] = useState("");
  const [editExample, setEditExample] = useState("");
  const [editCategory, setEditCategory] = useState("");

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

    wordList.sort((a, b) => a.word.localeCompare(b.word));

    setWords(wordList);
  };

  useEffect(() => {
    getWords();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Bu sözü silmək istəyirsən?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "words", id));
    getWords();
  };

  const toggleStatus = async (item) => {
    const newStatus = item.status === "learned" ? "learning" : "learned";

    await updateDoc(doc(db, "words", item.id), {
      status: newStatus,
    });

    getWords();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditWord(item.word);
    setEditMeaning(item.meaning);
    setEditPronunciation(item.pronunciation || "");
    setEditExample(item.example || "");
    setEditCategory(item.category || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleUpdate = async (id) => {
    if (!editWord || !editMeaning) {
      alert("Söz və məna boş ola bilməz");
      return;
    }

    await updateDoc(doc(db, "words", id), {
      word: editWord.trim(),
      meaning: editMeaning.trim(),
      pronunciation: editPronunciation.trim(),
      example: editExample.trim(),
      category: editCategory,
    });

    cancelEdit();
    getWords();
  };

  const filteredWords = words.filter((item) =>
    item.word.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#f6f1e8] text-slate-900">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-100px] top-[-100px] h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute right-[-120px] top-40 h-80 w-80 rounded-full bg-slate-900/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-3 font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-800">
              <Sparkles size={15} className="shrink-0" />
              <span className="truncate">
                Personal Vocabulary Library
              </span>
            </div>

            <h1 className="mt-4 break-words text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              My Words
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Bütün sözlərin burada saxlanılır. Axtar, düzəlt, sil və ya
              öyrənilmiş kimi işarələ.
            </p>
          </div>

          <div className="relative w-full lg:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search word..."
              className="w-full rounded-2xl border border-white/70 bg-white/70 py-4 pl-12 pr-4 shadow-sm backdrop-blur-xl outline-none transition focus:border-slate-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredWords.map((item) => (
            <div
              key={item.id}
              className="min-w-0 rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition duration-300 hover:bg-white hover:shadow-2xl sm:p-6"
            >
              {editingId === item.id ? (
                <div className="space-y-3">
                  <input
                    className="w-full rounded-2xl border p-4 outline-none"
                    value={editWord}
                    onChange={(e) => setEditWord(e.target.value)}
                    placeholder="Word"
                  />

                  <input
                    className="w-full rounded-2xl border p-4 outline-none"
                    value={editMeaning}
                    onChange={(e) => setEditMeaning(e.target.value)}
                    placeholder="Meaning"
                  />

                  <input
                    className="w-full rounded-2xl border p-4 outline-none"
                    value={editPronunciation}
                    onChange={(e) => setEditPronunciation(e.target.value)}
                    placeholder="Pronunciation"
                  />

                  <select
                    className="w-full rounded-2xl border p-4 outline-none"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    <option value="Verb">Verb</option>
                    <option value="Noun">Noun</option>
                    <option value="Adjective">Adjective</option>
                    <option value="Adverb">Adverb</option>
                    <option value="Daily">Daily</option>
                    <option value="Academic">Academic</option>
                  </select>

                  <textarea
                    className="w-full rounded-2xl border p-4 outline-none"
                    value={editExample}
                    onChange={(e) => setEditExample(e.target.value)}
                    placeholder="Example sentence"
                  />

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => handleUpdate(item.id)}
                      className="rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white"
                    >
                      Save
                    </button>

                    <button
                      onClick={cancelEdit}
                      className="rounded-2xl bg-slate-200 px-5 py-3 font-semibold text-slate-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg">
                          <BookOpen size={22} />
                        </div>

                        <div className="min-w-0">
                          <h2 className="break-words text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                            {item.word}
                          </h2>

                          {item.pronunciation && (
                            <p className="mt-1 break-all text-slate-500">
                              {item.pronunciation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                        item.status === "learned"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status === "learned"
                        ? "Learned"
                        : "Learning"}
                    </span>
                  </div>

                  <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400 sm:text-sm sm:tracking-[0.25em]">
                      Meaning
                    </p>

                    <p className="mt-2 break-words text-xl font-bold sm:text-2xl">
                      {item.meaning}
                    </p>
                  </div>

                  {item.category && (
                    <span className="mt-4 inline-block rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-800">
                      {item.category}
                    </span>
                  )}

                  {item.example && (
                    <p className="mt-5 break-words border-l-4 border-amber-300 pl-4 italic leading-8 text-slate-600">
                      “{item.example}”
                    </p>
                  )}

                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      onClick={() => toggleStatus(item)}
                      className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      {item.status === "learned" ? (
                        <>
                          <RotateCcw size={18} />
                          Learning
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={18} />
                          Learned
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => startEdit(item)}
                      className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                    >
                      <Pencil size={18} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {filteredWords.length === 0 && (
          <div className="mt-8 rounded-[2rem] bg-white/70 p-8 text-center shadow-sm backdrop-blur-xl sm:p-10">
            <h2 className="text-3xl font-black text-slate-900">
              No words found
            </h2>

            <p className="mt-3 text-slate-500">
              Axtardığın söz tapılmadı və ya hələ lüğətinə söz əlavə etməmisən.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyWords;