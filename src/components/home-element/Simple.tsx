import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

function Simple() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    AOS.refresh();
  }, []);

  return (
    <div className="mt-12 md:mt-[100px] flex flex-col md:flex-row max-w-6xl mx-auto px-5 md:px-4 py-10 gap-6 md:gap-16 lg:gap-24 items-start md:items-center justify-between">

      <h1
        data-aos="fade-right"
        data-aos-duration="1200"
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-black leading-tight"
      >
        {t("hero_title")}
      </h1>

      <p
        data-aos="fade-left"
        data-aos-delay="200"
        className="text-base md:text-lg text-gray-600 max-w-md leading-relaxed"
      >
        <span
          data-aos="zoom-in"
          data-aos-delay="400"
          className="font-semibold text-black"
        >
          3legant
        </span>{" "}
        {t("hero_description")}
      </p>

    </div>
  );
}

export default Simple;