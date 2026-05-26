import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import article1Img from "../../assets/im1.png";
import article2Img from "../../assets/im2.png";
import article3Img from "../../assets/im3.png";

function Homearticles() {
  const { t } = useTranslation();

 
  const articles = [
    { title: t("decor_home"),         to: "/blog/decor-home",    image: article1Img },
    { title: t("kitchen_organization"), to: "/blog/kitchen",      image: article2Img },
    { title: t("decor_bedroom"),      to: "/blog/decor-bedroom", image: article3Img },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{t("articles")}</h2>
        <Link
          to="/blog"
          className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:opacity-60 transition-opacity"
        >
          {t("more_articles")}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map(({ title, to, image }) => (
          <div key={to} className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-sm aspect-[4/3]">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
              <Link
                to={to}
                className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:opacity-60 transition-opacity"
              >
                {t("read_more")}
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Homearticles;