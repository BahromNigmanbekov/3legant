import { Link } from "react-router-dom";

import livingRoomImg from "../../assets/livingroom.png";
import bedroomImg from "../../assets/badroom.png";
import kitchenImg from "../../assets/kitchen.png";
import { useTranslation } from "react-i18next";



function Grid() {
  
    const { t } = useTranslation();

  const categories = [
  { label: t("living_room"), to: "/shop/living-room", image: livingRoomImg },
  { label: t("bedroom"),     to: "/shop/bedroom",     image: bedroomImg    },
  { label: t("kitchen"),     to: "/shop/kitchen",     image: kitchenImg    },
];
  return (
    <div className="flex flex-col max-w-6xl mx-auto px-4 py-10 ">
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-2 md:h-[560px]">

        <div className="md:row-span-2 relative bg-gray-100 overflow-hidden group rounded-sm h-64 md:h-auto">
          <img
            src={categories[0].image}
            alt={categories[0].label}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-6 left-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1.5">{categories[0].label}</h2>
            <Link to={categories[0].to} className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:opacity-60 transition-opacity">
              {t("shop_now")}
            </Link>
          </div>
        </div>

        <div className="relative bg-gray-100 overflow-hidden group rounded-sm h-64 md:h-auto">
          <img
            src={categories[1].image}
            alt={categories[1].label}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-5 left-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-1.5">{categories[1].label}</h2>
            <Link to={categories[1].to} className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:opacity-60 transition-opacity">
              {t("shop_now")}
            </Link>
          </div>
        </div>

        <div className="relative bg-gray-100 overflow-hidden group rounded-sm h-64 md:h-auto">
          <img
            src={categories[2].image}
            alt={categories[2].label}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-5 left-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-1.5">{categories[2].label}</h2>
            <Link to={categories[2].to} className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:opacity-60 transition-opacity">
              {t("shop_now")}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Grid;