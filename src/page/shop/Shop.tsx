import { useEffect, useState, useMemo } from "react";

type Product = {
  id: string;
  title: string;
  price: number;
  desc: string;
  img: string;
};

type MessageType = "success" | "error";

interface MessageState {
  visible: boolean;
  exiting: boolean;
  type: MessageType;
  content: string;
}

const TELEGRAM_BOT_TOKEN = "8961028504:AAFKEpqkqF4DifNq5Gdoz_rpqoV7XhI21Z4";
const TELEGRAM_CHAT_ID = "5615938203";

const messageStyles = `
  @keyframes antMessageMoveIn {
    0% { transform: translateY(-100%); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  @keyframes antMessageMoveOut {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(-100%); opacity: 0; }
  }

  .ant-message-wrapper {
    position: fixed;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    pointer-events: none;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .ant-message-notice {
    pointer-events: all;
    background: #ffffff;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.06), 0 3px 6px -4px rgba(0, 0, 0, 0.1), 0 9px 28px 8px rgba(0, 0, 0, 0.04);
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #f0f0f0;
  }

  .ant-message-notice.entering {
    animation: antMessageMoveIn 0.3s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  }

  .ant-message-notice.exiting {
    animation: antMessageMoveOut 0.2s cubic-bezier(0.78, 0.14, 0.15, 0.86) forwards;
  }

  .ant-message-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }

  .ant-message-dot.success { background-color: #52c41a; }
  .ant-message-dot.error { background-color: #ff4d4f; }

  .ant-message-text {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-weight: 400;
  }
`;

function AntMessage({ msg }: { msg: MessageState }) {
  if (!msg.visible) return null;

  return (
    <>
      <style>{messageStyles}</style>
      <div className="ant-message-wrapper">
        <div className={`ant-message-notice ${msg.exiting ? "exiting" : "entering"}`}>
          <span className={`ant-message-dot ${msg.type}`} />
          <span className="ant-message-text">{msg.content}</span>
        </div>
      </div>
    </>
  );
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [phone, setPhone] = useState("");
  const [telegramUser, setTelegramUser] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [msg, setMsg] = useState<MessageState>({
    visible: false,
    exiting: false,
    type: "success",
    content: "",
  });

  const showMessage = (type: MessageType, content: string) => {
    setMsg({ visible: true, exiting: false, type, content });
    setTimeout(() => {
      setMsg((prev) => ({ ...prev, exiting: true }));
      setTimeout(() => {
        setMsg((prev) => ({ ...prev, visible: false, exiting: false }));
      }, 200);
    }, 3000);
  };

  useEffect(() => {
    fetch("https://69cdc87a33a09f831b7c872b.mockapi.io/api/v2/product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !phone || !telegramUser) return;

    setIsSending(true);

    const message = `
🛍️ *YANGI BUYURTMA!*
──────────────────
📦 *Mahsulot:* ${selectedProduct.title}
💰 *Narxi:* $${selectedProduct.price}
🆔 *ID:* ${selectedProduct.id}
──────────────────
👤 *Mijoz:* @${telegramUser.replace("@", "")}
📞 *Telefon:* ${phone}
    `;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );

      if (response.ok) {
        setSelectedProduct(null);
        setPhone("");
        setTelegramUser("");
        showMessage("success", "Success Message: Buyurtmangiz muvaffaqiyatli qabul qilindi!");
      } else {
        showMessage("error", "Error Message: Xatolik yuz berdi. Qayta urinib ko'ring.");
      }
    } catch (error) {
      console.error(error);
      showMessage("error", "Error Message: Tarmoq xatoligi yuz berdi.");
    } finally {
      setIsSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f4f4f4]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-800 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] px-4 py-8 text-neutral-800 antialiased sm:px-8 md:px-16">
      <AntMessage msg={msg} />

      <div className="mb-12 mt-[80px] flex flex-col items-center justify-between gap-4 border-b border-neutral-200 pb-6 md:flex-row">
        <div>
          <h1 className="text-2xl font-light uppercase tracking-widest text-neutral-900 md:text-3xl">
            Katalog
          </h1>
          <p className="text-xs text-neutral-400 mt-1">Premium interyer elementlari</p>
        </div>
        
        <div className="w-full max-w-lg mt-[100px] md:mt-0">
          <div className="relative flex items-center bg-white border border-neutral-200 rounded-full p-1.5 shadow-sm transition-all focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
            <input
              type="text"
              placeholder="Mahsulotlarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-5 py-2.5 text-sm tracking-wide text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mr-3 text-neutral-400 hover:text-neutral-600 transition-colors text-sm"
              >
                ✕
              </button>
            )}

            <button className="flex items-center justify-center gap-2 bg-neutral-900 text-white rounded-full px-6 py-2.5 hover:bg-neutral-800 transition-all shadow-sm active:scale-95 shrink-0">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.601z" />
              </svg>
              <span className="text-xs font-medium tracking-wide">Qidirish</span>
            </button>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
          <p className="text-lg">Hech qanday mahsulot topilmadi.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProduct(item)}
              className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[24px] bg-neutral-100 shadow-sm transition-transform duration-500 hover:-translate-y-1 hover:shadow-md"
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 w-full p-6 text-white transition-all duration-500 transform translate-y-0 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                <p className="text-xs uppercase tracking-widest text-neutral-300 mb-1">
                  {item.desc || "Premium Collection"}
                </p>
                <h3 className="text-xl font-medium tracking-wide">{item.title}</h3>
                <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3">
                  <span className="text-lg font-light">{item.price}.000 so'm</span>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-md">
                    Sotib olish
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm transition-opacity sm:items-center sm:p-4">
          <div
            className="relative w-full max-h-[90vh] overflow-y-auto rounded-t-[30px] bg-white p-6 shadow-2xl transition-all sm:max-w-lg sm:rounded-[24px] md:max-w-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200 transition-colors"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="aspect-square w-full overflow-hidden rounded-[18px] bg-neutral-100">
                <img
                  src={selectedProduct.img}
                  alt={selectedProduct.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-neutral-400">
                    {selectedProduct.desc || "Premium element"}
                  </span>
                  <h2 className="text-2xl font-normal text-neutral-900 mt-1">
                    {selectedProduct.title}
                  </h2>
                  <p className="mt-2 text-xl font-light text-neutral-700">
                    ${selectedProduct.price}
                  </p>
                </div>

                <form onSubmit={handleOrderSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500 mb-1">
                      Telefon raqamingiz
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+998 (90) 123-45-67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500 mb-1">
                      Telegram Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">
                        @
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="username"
                        value={telegramUser}
                        onChange={(e) => setTelegramUser(e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 pl-8 pr-4 py-3 text-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full rounded-xl bg-neutral-900 py-4 text-sm font-medium tracking-wide text-white transition-colors hover:bg-neutral-800 disabled:bg-neutral-400"
                  >
                    {isSending ? "Yuborilmoqda..." : "Buyurtma berish"}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedProduct(null)} />
        </div>
      )}
    </div>
  );
};

export default Shop;