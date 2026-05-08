import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, LogIn, Mail, Lock, Sparkles } from "lucide-react";
import { auth } from "../firebase/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#f6f1e8] text-slate-900">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute right-[-120px] bottom-[-120px] h-80 w-80 rounded-full bg-slate-900/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-6xl items-center gap-6 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:px-8">
        <section className="hidden min-w-0 lg:block">
          <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl xl:p-10">
            <div className="grid h-16 w-16 place-items-center rounded-3xl bg-white/10">
              <BookOpen size={32} />
            </div>

            <p className="mt-8 inline-flex max-w-full items-center gap-2 rounded-full bg-amber-200 px-4 py-2 text-sm font-bold text-slate-950">
              <Sparkles size={15} className="shrink-0" />
              <span className="truncate">Daily vocabulary system</span>
            </p>

            <h1 className="mt-6 break-words text-5xl font-black leading-tight tracking-tight xl:text-6xl">
              Welcome back to DailyLex.
            </h1>

            <p className="mt-5 max-w-xl leading-8 text-slate-300">
              Şəxsi online lüğətinə daxil ol, yeni sözlərini saxla və gündəlik
              quizlə təkrar et.
            </p>

            <div className="mt-10 rounded-3xl bg-white/10 p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400 xl:text-sm xl:tracking-[0.25em]">
                Saved word
              </p>

              <h2 className="mt-4 break-words text-4xl font-black xl:text-5xl">
                improve
              </h2>

              <p className="mt-2 text-slate-300">/ɪmˈpruːv/</p>
              <p className="mt-5 text-2xl font-bold">yaxşılaşdırmaq</p>
            </div>
          </div>
        </section>

        <form
          onSubmit={handleLogin}
          className="mx-auto w-full max-w-md rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-2xl backdrop-blur-xl sm:p-7 md:p-10"
        >
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-slate-950 text-white shadow-xl">
            <BookOpen size={30} />
          </div>

          <div className="mt-6 text-center">
            <h1 className="text-4xl font-black tracking-tight text-slate-950">
              DailyLex
            </h1>

            <p className="mt-2 text-slate-500">
              Login to your personal dictionary
            </p>
          </div>

          <div className="mt-8 space-y-5">
            <label className="block min-w-0">
              <span className="mb-2 flex items-center gap-2 font-bold text-slate-700">
                <Mail size={18} />
                Email
              </span>

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-white/80 p-4 outline-none transition focus:border-slate-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="block min-w-0">
              <span className="mb-2 flex items-center gap-2 font-bold text-slate-700">
                <Lock size={18} />
                Password
              </span>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-200 bg-white/80 p-4 outline-none transition focus:border-slate-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <button className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 font-bold text-white shadow-xl transition hover:bg-slate-800">
            <LogIn size={20} />
            Login
          </button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-black text-slate-950">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;