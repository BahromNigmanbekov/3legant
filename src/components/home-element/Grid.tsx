import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import livingRoomImg from "../../assets/livingroom.png";
import bedroomImg from "../../assets/badroom.png";
import kitchenImg from "../../assets/kitchen.png";

function Grid() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const categories = [
    { label: t("living_room"), image: livingRoomImg, isLarge: true },
    { label: t("bedroom"), image: bedroomImg, isLarge: false },
    { label: t("kitchen"), image: kitchenImg, isLarge: false },
  ];

  return (
    <div className="flex flex-col max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 md:h-[560px]">
        
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => navigate("/shop")}
            className={`relative bg-gray-100 overflow-hidden group rounded-xl h-64 md:h-auto cursor-pointer shadow-sm transition-all duration-300 hover:shadow-md ${
              category.isLarge ? "md:row-span-2" : ""
            }`}
          >
            <img
              src={category.image}
              alt={category.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col items-start text-white z-10">
              <h2 className={`font-medium tracking-wide drop-shadow-sm mb-3 text-white ${
                category.isLarge ? "text-2xl" : "text-xl"
              }`}>
                {category.label}
              </h2>
              
              <button className="inline-flex items-center justify-center bg-white text-neutral-900 rounded-full px-5 py-2 text-xs font-semibold tracking-wide shadow-sm hover:bg-neutral-100 transition-all active:scale-95">
                {t("shop_now")}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2.5} 
                  stroke="currentColor" 
                  className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Grid;