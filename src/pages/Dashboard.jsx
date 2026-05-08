import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { BookOpen, Layers3, Brain, LogOut, Sparkles } from "lucide-react";
import { auth } from "../firebase/firebase";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const cards = [
    {
      title: "Add Word",
      desc: "Yeni söz, məna, tələffüz və nümunə cümlə əlavə et.",
      path: "/add-word",
      icon: BookOpen,
      stat: "Build vocabulary",
    },
    {
      title: "My Words",
      desc: "Bütün şəxsi lüğətini əlifba sırası ilə görüntülə.",
      path: "/my-words",
      icon: Layers3,
      stat: "Dictionary view",
    },
    {
      title: "Quiz",
      desc: "Random sözlərlə özünü yoxla və yaddaşını gücləndir.",
      path: "/quiz",
      icon: Brain,
      stat: "Daily practice",
    },
  ];

  return (
  <div className="relative min-h-screen w-full overflow-x-hidden bg-[#f6f1e8] text-slate-900">
    <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
      <div className="absolute right-[-140px] top-40 h-80 w-80 rounded-full bg-slate-900/10 blur-3xl" />
      <div className="absolute bottom-[-160px] left-1/3 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl" />
    </div>

    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <nav className="flex flex-col gap-4 rounded-3xl border border-white/70 bg-white/60 px-4 py-4 shadow-sm backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <Link to="/dashboard" className="flex min-w-0 items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg">
            <BookOpen size={24} />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-black tracking-tight">DailyLex</h1>
            <p className="truncate text-xs font-medium uppercase tracking-[0.18em] text-slate-500 sm:tracking-[0.25em]">
              Personal Dictionary
            </p>
          </div>
        </Link>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800 sm:w-auto"
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>

      <section className="grid items-center gap-8 py-10 lg:grid-cols-2 lg:py-14">
        <div className="min-w-0">
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur">
            <Sparkles size={16} className="shrink-0" />
            <span className="truncate">
              Learn words. Save meaning. Practice daily.
            </span>
          </div>

          <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Build your own elegant English dictionary.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Gün ərzində qarşına çıxan sözləri saxla, mənasını yaz,
            tələffüzünü qeyd et və quiz ilə gündəlik təkrar et.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/add-word"
              className="rounded-2xl bg-slate-950 px-6 py-4 text-center font-semibold text-white shadow-xl transition hover:bg-slate-800"
            >
              Add first word
            </Link>

            <Link
              to="/my-words"
              className="rounded-2xl border border-slate-200 bg-white/70 px-6 py-4 text-center font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:bg-white"
            >
              Open dictionary
            </Link>
          </div>
        </div>

        <div className="w-full min-w-0 rounded-[2rem] border border-white/70 bg-white/65 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
          <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white sm:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200 sm:text-sm sm:tracking-[0.3em]">
              Word of the day
            </p>

            <h3 className="mt-6 break-words text-4xl font-black sm:text-5xl">
              obtain
            </h3>
            <p className="mt-2 text-slate-300">/əbˈteɪn/</p>

            <div className="mt-8 rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-slate-300">Meaning</p>
              <p className="mt-1 text-xl font-semibold">əldə etmək</p>
            </div>

            <p className="mt-5 border-l-2 border-amber-300 pl-4 text-slate-300">
              “I want to obtain more knowledge every day.”
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 pb-8 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              to={card.path}
              className="group min-w-0 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition duration-300 hover:bg-white hover:shadow-2xl"
            >
              <div className="mb-8 flex items-center justify-between gap-3">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg transition group-hover:scale-110">
                  <Icon size={25} />
                </div>

                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                  {card.stat}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-950">
                {card.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">{card.desc}</p>

              <p className="mt-8 font-bold text-slate-950">Open page →</p>
            </Link>
          );
        })}
      </section>
    </div>
  </div>
);
}

export default Dashboard;