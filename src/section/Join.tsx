import { useState } from "react";
import bgImage from "../assets/image-join.png"; 
import { useTranslation } from "react-i18next";

const Join = () => {
  
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSignup = () => {
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setEmail("");
  };

  return (
    <section className="w-full relative overflow-hidden">
      
      <img
        src={bgImage}
        alt="newsletter background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

    
      <div className="absolute inset-0 " />

      
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12 sm:py-16 md:py-20 gap-4 md:gap-5 min-h-[200px]">
        
        <h2 className="font-serif text-[clamp(22px,4vw,46px)] font-semibold text-[#2a2420] leading-tight tracking-tight">
          {t("join_newsletter")}
        </h2>

        
        <p className="text-sm md:text-[15px] text-[#666] tracking-wide font-light">
          {t("signup_description")}
        </p>

        
        <div className="flex items-center w-full max-w-sm border-b border-[#c8c2ba] pb-2 gap-2 mt-2">
          <svg
            className="text-[#aaa] shrink-0"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <polyline points="2 4 12 13 22 4" />
          </svg>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSignup()}
            placeholder={t("email_address")}
            className="flex-1 bg-transparent outline-none text-sm text-[#444] placeholder-[#bbb] tracking-wide font-light"
          />

          <button
            onClick={handleSignup}
            className="shrink-0 text-xs font-medium uppercase tracking-widest text-[#2a2420] relative group transition-colors duration-200 hover:text-[#8b7355]"
          >
            {submitted ?  t("done") : t("signup")}
            <span className="absolute -bottom-[2px] left-0 right-0 h-px bg-[#2a2420] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </div>

        
        {submitted && (
          <p className="text-xs text-[#8b7355] tracking-wide">
            {t("subscription_thanks")}
          </p>
        )}
      </div>
    </section>
  );
};

export default Join;