import { useState } from "react";
import bgImage from "../assets/image-join.png";
import { useTranslation } from "react-i18next";
import { FaTelegramPlane } from "react-icons/fa";

const BOT_TOKEN = "8974032324:AAGmkA2udDav_eWg3El8HxNuu9Fn16XZ354";
const CHAT_ID = "5615938203";

const Join = () => {
const { t } = useTranslation();

const [telegram, setTelegram] = useState("");
const [submitted, setSubmitted] = useState(false);

const handleSignup = async () => {
if (!telegram.trim()) return;


try {
  await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `📩 Yangi Telegram obunachi:\n${telegram}`,
      }),
    }
  );

  setSubmitted(true);
  setTimeout(() => setSubmitted(false), 3000);
  setTelegram("");
} catch (error) {
  console.error("Telegram yuborishda xatolik:", error);
}


};

return ( <section className="w-full relative overflow-hidden"> <img
     src={bgImage}
     alt="telegram background"
     className="absolute inset-0 w-full h-full object-cover object-center"
   />


  <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12 sm:py-16 md:py-20 gap-4 md:gap-5 min-h-[200px]">
    <h2 className="font-serif text-[clamp(22px,4vw,46px)] font-semibold text-[#2a2420] leading-tight tracking-tight">
      {t("join_newsletter")}
    </h2>

    <p className="text-sm md:text-[15px] text-[#666] tracking-wide font-light">
      Telegram username qoldiring
    </p>

    <div className="flex items-center w-full max-w-sm border-b border-[#c8c2ba] pb-2 gap-2 mt-2">
      <FaTelegramPlane
        size={20}
        className="text-[#229ED9] shrink-0"
      />

      <input
        type="text"
        value={telegram}
        onChange={(e) => setTelegram(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSignup()}
        placeholder="@username"
        className="flex-1 bg-transparent outline-none text-sm text-[#444] placeholder-[#bbb] tracking-wide font-light"
      />

      <button
        onClick={handleSignup}
        className="shrink-0 text-xs font-medium uppercase tracking-widest text-[#2a2420] relative group transition-colors duration-200 hover:text-[#8b7355]"
      >
        {submitted ? t("done") : t("signup")}

        <span className="absolute -bottom-[2px] left-0 right-0 h-px bg-[#2a2420] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </button>
    </div>

    {submitted && (
      <p className="text-xs text-[#8b7355] tracking-wide">
        Telegram username muvaffaqiyatli yuborildi!
      </p>
    )}
  </div>
</section>


);
};

export default Join;
