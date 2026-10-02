import { ArrowRight, Eye, LockKeyhole, Mail } from "lucide-react";

export default function LoginAuth() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#f4f2ef] px-4 py-8 text-[#272326] sm:px-8 lg:px-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(#b8aeb0 0.7px, transparent 0.7px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative overflow-hidden rounded-[28px] bg-white shadow-[0_32px_100px_-42px_rgba(52,30,37,0.28)]  lg:grid-cols-[1.02fr_0.98fr]">
        <section className="flex items-center justify-center px-6 py-10 sm:px-12 sm:py-14 lg:px-14">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="login"
                className="mb-2 block text-[13px] font-medium text-[#41383a]"
              >
                Login
              </label>
              <div className="flex h-[50px] items-center gap-3 rounded-xl border border-[#e8e3e1] bg-white px-3.5 transition-colors focus-within:border-[#8b626b] focus-within:ring-4 focus-within:ring-[#8b626b]/10">
                <Mail size={17} className="shrink-0 text-[#9b8d8e]" />
                <input
                  id="login"
                  name="login"
                  type="text"
                  autoComplete="username"
                  placeholder="Loginingizni kiriting"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#30272a] outline-none placeholder:text-[#b2aaab]"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[13px] font-medium text-[#41383a]"
                >
                  Parol
                </label>
              </div>
              <div className="flex h-[50px] items-center gap-3 rounded-xl border border-[#e8e3e1] bg-white px-3.5 transition-colors focus-within:border-[#8b626b] focus-within:ring-4 focus-within:ring-[#8b626b]/10">
                <LockKeyhole size={17} className="shrink-0 text-[#9b8d8e]" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Parolingizni kiriting"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#30272a] outline-none placeholder:text-[#b2aaab]"
                />
                <button
                  type="button"
                  aria-label="Parolni ko‘rsatish"
                  className="flex size-8 items-center justify-center rounded-lg text-[#9b8d8e] transition-colors hover:bg-[#f5f2f1] hover:text-[#5a4449] focus-visible:outline-2 focus-visible:outline-[#8b626b] cursor-pointer"
                >
                  <Eye size={17} />
                </button>
              </div>
            </div>

            <label className="flex w-fit cursor-pointer items-center gap-2.5 text-[13px] text-[#6e6566]">
              <input
                type="checkbox"
                name="remember"
                className="size-4 accent-[#57333c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b626b]"
              />
              Meni eslab qol
            </label>

            <button
              type="button"
              className="flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#42282e] px-4 text-sm font-semibold text-white shadow-[0_8px_18px_-10px_rgba(66,40,46,0.8)] transition-all hover:bg-[#57343d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42282e] active:translate-y-px cursor-pointer"
            >
              Tizimga kirish
              <ArrowRight size={17} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
