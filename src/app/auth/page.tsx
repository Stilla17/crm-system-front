"use client";

import {
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "src/hooks/useAuth";
import { LoginData } from "src/types/auth.type";

export default function LoginAuth() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { mutate, isPending } = useLogin();

  const { register, handleSubmit } = useForm<LoginData>({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginData) => {
    mutate(data);
  };

  return (
    <main className="auth-page relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-8 text-[#262b28] sm:px-8">
      <div aria-hidden="true" className="auth-page__glow" />

      <div className="auth-card relative grid w-full max-w-[1000px] overflow-hidden rounded-[26px] bg-white shadow-[0_28px_90px_-42px_rgba(35,48,40,0.28)] md:min-h-[600px] md:grid-cols-[1fr_0.94fr]">
        <section
          aria-label="Book.uz haqida"
          className="auth-intro relative flex min-h-[220px] flex-col justify-between overflow-hidden px-7 py-7 text-white sm:px-10 sm:py-9 md:min-h-full md:px-12 md:py-11"
        >
          <div aria-hidden="true" className="auth-intro__texture" />

          <Link
            href="/"
            aria-label="Book.uz bosh sahifasi"
            className="relative z-10 inline-flex w-fit items-center gap-2.5 rounded-sm text-[17px] font-semibold tracking-[-0.03em] text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e7b678]"
          >
            <span className="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-white/10">
              <BookOpen size={17} strokeWidth={1.8} />
            </span>
            <span>
              Book<span className="text-[#e9b978]">.uz</span>
            </span>
          </Link>

          <div className="relative z-10 mt-8 max-w-[390px] md:mt-16">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e6bd8c]">
              Ishingiz uchun yagona makon
            </p>
            <h1 className="max-w-[360px] text-[30px] font-medium leading-[1.15] tracking-[-0.04em] sm:text-[36px]">
              Kitoblar olamidagi ishlaringiz —{" "}
              <span className="font-serif italic text-[#e9b978]">
                tartib bilan.
              </span>
            </h1>
            <p className="mt-4 max-w-[330px] text-sm leading-6 text-white/65">
              Book.uz boshqaruv tizimiga kiring va kundalik ishlaringizni bir
              joydan boshqaring.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="auth-book-art pointer-events-none absolute bottom-[-42px] right-[-12px] hidden h-[250px] w-[230px] md:block"
          >
            <div className="auth-book-art__shadow" />
            <div className="auth-book-art__book auth-book-art__book--back" />
            <div className="auth-book-art__book auth-book-art__book--front">
              <BookOpen
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#e8bd8a]/85"
                size={46}
                strokeWidth={1}
              />
              <span className="absolute bottom-6 left-0 right-0 text-center text-[9px] font-medium uppercase tracking-[0.22em] text-[#f1d7b6]/70">
                BOOK. UZ
              </span>
            </div>
          </div>

          <p className="relative z-10 mt-7 text-[11px] tracking-wide text-white/45 md:mt-12">
            Kitoblar olamiga yaqinroq.
          </p>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-12 sm:py-14 md:px-14">
          <div className="w-full max-w-[360px]">
            <div className="auth-form-heading mb-8">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b7855]">
                Xush kelibsiz
              </p>
              <h2 className="text-[28px] font-semibold tracking-[-0.04em] text-[#272d29]">
                Tizimga kirish
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#7a817c]">
                Davom etish uchun login va parolingizni kiriting.
              </p>
            </div>

            <form
              className="space-y-5"
              onSubmit={handleSubmit(onSubmit)}
              aria-busy={isPending}
            >
              <div>
                <label
                  htmlFor="login"
                  className="mb-2 block text-[13px] font-medium text-[#414944]"
                >
                  Login
                </label>
                <div className="flex h-[50px] items-center gap-3 rounded-xl border border-[#e7e9e6] bg-[#fcfcfb] px-3.5 transition-colors focus-within:border-[#728579] focus-within:ring-4 focus-within:ring-[#728579]/10">
                  <Mail
                    size={17}
                    aria-hidden="true"
                    className="shrink-0 text-[#9aa29c]"
                  />
                  <input
                    id="login"
                    type="text"
                    {...register("login", { required: true })}
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="Loginingizni kiriting"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#303833] outline-none placeholder:text-[#a8aeaa]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-[13px] font-medium text-[#414944]"
                >
                  Parol
                </label>
                <div className="flex h-[50px] items-center gap-3 rounded-xl border border-[#e7e9e6] bg-[#fcfcfb] px-3.5 transition-colors focus-within:border-[#728579] focus-within:ring-4 focus-within:ring-[#728579]/10">
                  <LockKeyhole
                    size={17}
                    aria-hidden="true"
                    className="shrink-0 text-[#9aa29c]"
                  />
                  <input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Parolingizni kiriting"
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#303833] outline-none placeholder:text-[#a8aeaa]"
                    {...register("password", { required: true })}
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible((visible) => !visible)}
                    aria-label={
                      passwordVisible ? "Parolni yashirish" : "Parolni ko‘rsatish"
                    }
                    aria-pressed={passwordVisible}
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#89928c] transition-colors hover:bg-[#f0f2ef] hover:text-[#46544b] focus-visible:outline-2 focus-visible:outline-[#728579] cursor-pointer"
                  >
                    {passwordVisible ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#34483d] px-4 text-sm font-semibold text-white shadow-[0_8px_18px_-12px_rgba(52,72,61,0.75)] transition-[background-color,transform,box-shadow] hover:bg-[#40594b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34483d] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
              >
                {isPending ? "Kirilmoqda..." : "Tizimga kirish"}
                {!isPending && <ArrowRight size={17} aria-hidden="true" />}
              </button>
            </form>

            <p className="mt-8 text-center text-[11px] text-[#a0a6a1]">
              Book.uz CRM <span className="px-1.5">·</span> Xavfsiz kirish
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
