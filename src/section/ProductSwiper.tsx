import React from 'react'
import { useGetProducts } from '../hooks/useProducts'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice: number | null;
  currency: string;
  images?: string[];
}


const ProductCardSkeleton = () => (
  <div className="flex flex-col min-w-[195px] sm:min-w-[215px] md:min-w-[235px] snap-start animate-pulse">
    
    <div className="bg-[#E5E7EB] rounded aspect-[3/4] w-full" />
    
    
    <div className="mt-2 flex flex-col gap-1.5">
   
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 bg-[#E5E7EB] rounded-full" />
        ))}
      </div>
   
      <div className="h-4 bg-[#E5E7EB] rounded w-5/6" />
  
      <div className="flex items-center gap-2 mt-0.5">
        <div className="h-3.5 bg-[#E5E7EB] rounded w-1/3" />
        <div className="h-3.5 bg-[#E5E7EB] rounded w-1/4" />
      </div>
    </div>
  </div>
)

function ProductSwiper() {
  const { data, isError, isLoading } = useGetProducts({})
  const navigate = useNavigate()
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <section className="px-4 md:px-8 py-8 max-w-[1440px] mx-auto overflow-hidden">
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-black">{t("new_arrivals")}</h2>
          <div className="w-24 h-4 bg-[#E5E7EB] rounded animate-pulse" />
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
          {[...Array(5)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    )
  }
  
  if (isError) {
    return <h1 className="text-center py-20 text-red-500 font-medium">Xatolik yuz berdi</h1>
  }

  const formatPrice = (amount: number, currency: string): string =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: currency || "USD" }).format(amount)

  return (
    <section className="px-4 md:px-8 py-8 max-w-6xl mx-auto overflow-hidden">
      {/* Sarlavha qismi */}
      <div className="flex items-end justify-between mb-5">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-black">{t("new_arrivals")}</h2>
        <a href="/products" className="text-xs font-medium border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-all">
          {t("more_products")}
        </a>
      </div>

      {/* Slider (Ixcham o'lchamlar) */}
      <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
        {data?.data.products.map((product) => {
          
          const discount: number = (product.oldPrice && product.oldPrice > product.price)
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0

          return (
            <div 
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
              className="group relative flex flex-col min-w-[195px] sm:min-w-[215px] md:min-w-[235px] snap-start cursor-pointer"
            >
              {/* Rasm qismi */}
              <div className="relative bg-[#F3F5F7] overflow-hidden aspect-[3/4] flex items-center justify-center p-3">
                
                {/* Badgellar */}
                <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
                  <span className="bg-white text-black text-[9px] font-bold px-2 py-0.5 rounded shadow-sm uppercase">New</span>
                  {discount > 0 && (
                    <span className="bg-[#38CB89] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm">-{discount}%</span>
                  )}
                </div>

                {/* Wishlist */}
                <button 
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()} 
                  className="absolute top-2.5 right-2.5 z-10 bg-white rounded-full w-6.5 h-6.5 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Rasm */}
                <img src={product.images?.[0] || "/no-image.png"} alt={product.title} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />

                {/* Add to Cart */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 transition-all duration-300 transform opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                  <button 
                    className="w-full bg-[#141718] text-white text-[11px] font-semibold py-1.5 rounded hover:bg-black transition-colors shadow-lg"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => { 
                      e.stopPropagation(); 
                      navigate(`/product/${product.id}`, { state: { product } }); 
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>

              {/* Ma'lumotlar qismi */}
              <div className="mt-2 flex flex-col gap-0.5">
                {/* Yulduzchalar */}
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 text-[#343839]" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <h3 className="text-[13px] font-semibold text-[#141718] truncate">{product.title}</h3>

                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-semibold text-[#141718]">{formatPrice(product.price, product.currency)}</span>
                  {product.oldPrice && product.oldPrice > product.price && (
                    <span className="text-[12px] text-[#6C7275] line-through">{formatPrice(product.oldPrice, product.currency)}</span>
                  )}
                </div>
              </div>

            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ProductSwiper