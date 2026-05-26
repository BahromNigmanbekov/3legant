import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

// Assetlarni import qilish
import grid1 from "../../assets/grid1.jpg";
import grid2 from "../../assets/grid2.jpg";
import grid3 from "../../assets/grid3.jpg";

// --- Types ---
interface BlogPost {
  id: number;
  titleKey: string;
  dateKey: string;
  image: string;
}

// --- Static Data ---
const BLOG_DATA: BlogPost[] = [
  { id: 1, titleKey: "blog_title", dateKey: "blog_date", image: grid1 },
  { id: 2, titleKey: "blog_title", dateKey: "blog_date", image: grid2 },
  { id: 3, titleKey: "blog_title", dateKey: "blog_date", image: grid3 },
  { id: 4, titleKey: "blog_title", dateKey: "blog_date", image: grid1 },
  { id: 5, titleKey: "blog_title", dateKey: "blog_date", image: grid2 },
  { id: 6, titleKey: "blog_title", dateKey: "blog_date", image: grid3 },
  { id: 7, titleKey: "blog_title", dateKey: "blog_date", image: grid1 },
  { id: 8, titleKey: "blog_title", dateKey: "blog_date", image: grid2 },
  { id: 9, titleKey: "blog_title", dateKey: "blog_date", image: grid3 },
];

// --- Sub-component: BlogCard ---
const BlogCard: React.FC<BlogPost> = memo(({ titleKey, dateKey, image }) => {
  const { t } = useTranslation();

  return (
    <article className="group relative w-full cursor-pointer overflow-hidden rounded-[32px] bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ease-out">
      
      {/* Image Container - Bo'yi h-[420px] gacha uzaytirildi */}
      <div className="overflow-hidden h-[420px] w-full">
        <img
          src={image}
          alt={t(titleKey)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
      </div>

      {/* Premium Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100" 
        aria-hidden="true" 
      />

      {/* Date Badge */}
      <div className="absolute top-5 left-5 z-10">
        <div className="backdrop-blur-md bg-white/15 border border-white/20 px-5 py-2.5 rounded-full shadow-inner">
          <time className="text-xs text-white font-bold tracking-[2px] uppercase">
            {t(dateKey)}
          </time>
        </div>
      </div>

      {/* Content Box - Kattaroq va pastki qismga mukammal joylashtirilgan */}
      <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 z-10">
        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-[28px] p-6 sm:p-7 transition-all duration-500 ease-out group-hover:bg-white/15 group-hover:border-white/20">
          
          {/* Title - Shrift o'lchami kattalashtirildi */}
          <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-wide transition-all duration-300 group-hover:translate-x-1">
            {t(titleKey)}
          </h3>

          {/* Card Footer Interaction */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-white rounded-full transition-all duration-500 ease-out group-hover:w-16" aria-hidden="true" />
              <span className="text-sm sm:text-base text-white/90 font-medium tracking-wide">
                {t("read_more2", "Read More")}
              </span>
            </div>

            {/* Action Icon */}
            <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-500 ease-out group-hover:rotate-45 group-hover:bg-white/25">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
});

BlogCard.displayName = "BlogCard";

// --- Main Component: OurBlog ---
const OurBlog: React.FC = () => {
  const posts = useMemo(() => BLOG_DATA, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Responsive Grid System: Mobil qurilmalardan tortib 4K monitorlargacha moslashuvchan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12 lg:gap-x-8 lg:gap-y-14 justify-items-center">
        {posts.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
};

export default OurBlog;