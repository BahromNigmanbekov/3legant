import { Link } from "react-router-dom";
import bannerImg from ".././assets/abouthome.png";
import { useTranslation } from "react-i18next";

function Abouthome() {
  const { t } = useTranslation();
  return (

    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[320px] md:min-h-[400px] lg:min-h-[480px]">

      <div className="overflow-hidden h-[260px] sm:h-[320px] md:h-auto">
        <img
          src={bannerImg}
          alt="Promo banner"
          className="w-full h-full object-cover"
        />
      </div>

      
      <div className="bg-gray-100 flex flex-col justify-center px-6 py-10 sm:px-12 md:px-16 lg:px-24">
        
        <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-2 md:mb-3">
          {t("sale_up_to")}
        </p>
        
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3 md:mb-4">
          {t("new_lower_prices")}<br className="hidden sm:inline" /> 
        </h2>
        
        <p className="text-sm text-gray-500 leading-relaxed mb-6 md:mb-8 max-w-xs sm:max-w-sm">
         {t("stylish_makeover")}
        </p>
        
        <Link
          to="/shop"
          className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:opacity-60 transition-opacity w-fit"
        >
          {t("shop_now")} →
        </Link> 
      </div>

    </div>
  );
}

export default Abouthome;