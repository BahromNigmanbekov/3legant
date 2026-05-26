import { Link } from "react-router-dom";
import bannerImg from "../assets/abouthome.png";

function Aboutcontactus() {
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
        
        
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3 md:mb-4">
         About Us<br className="hidden sm:inline" />
        </h2>
        
        <p className="text-sm text-gray-500 leading-relaxed mb-6 md:mb-8 max-w-xs sm:max-w-sm">
          3legant is a gift & decorations store based in HCMC, Vietnam. Est since 2019. 
Our customer service is always prepared to support you 24/7
        </p>
        
        <Link
          to="/shop"
          className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:opacity-60 transition-opacity w-fit"
        >
          Shop Now →
        </Link>
      </div>

    </div>
  );
}

export default Aboutcontactus;