import { useEffect, useState } from "react";
import Aboutcontactus from "../../section/AboutContactus";
import Info from "../../section/Info";
import AOS from "aos";
import "aos/dist/aos.css";

// --- KONSTANTALAR ---
const TELEGRAM_BOT_TOKEN = "8697395061:AAE4gjwOO6t-lVDYkDPZCa9uIlp472EZpYU";
const TELEGRAM_CHAT_ID = "6877805958";

// --- TYPES ---
interface FormData {
  fullName: string;
  email: string;
  message: string;
}

type MessageType = "success" | "error";

interface MessageState {
  visible: boolean;
  exiting: boolean;
  type: MessageType;
  content: string;
}

// --- ANTD MESSAGE 100% STYLE (Tepa markazdan chiqadi) ---
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
    top: 20px;
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
    padding: 10px 16px;
    border-radius: 8px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 150px;
  }

  .ant-message-notice.entering {
    animation: antMessageMoveIn 0.3s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  }

  .ant-message-notice.exiting {
    animation: antMessageMoveOut 0.2s cubic-bezier(0.78, 0.14, 0.15, 0.86) forwards;
  }

  .ant-message-text {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.88);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .ant-message-icon-success { color: #52c41a; }
  .ant-message-icon-error { color: #ff4d4f; }
`;

function AntMessage({ msg }: { msg: MessageState }) {
  if (!msg.visible) return null;

  return (
    <>
      <style>{messageStyles}</style>
      <div className="ant-message-wrapper">
        <div className={`ant-message-notice ${msg.exiting ? "exiting" : "entering"}`}>
          <span className={`ant-message-icon-${msg.type}`}>
            {msg.type === "success" ? (
              <svg viewBox="64 64 896 896" width="16" height="16" fill="currentColor">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H700c6.5 0 10.3 7.4 5.5 12.8z" />
              </svg>
            ) : (
              <svg viewBox="64 64 896 896" width="16" height="16" fill="currentColor">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
              </svg>
            )}
          </span>
          <span className="ant-message-text">{msg.content}</span>
        </div>
      </div>
    </>
  );
}

function useAntMessage() {
  const [msg, setMsg] = useState<MessageState>({
    visible: false,
    exiting: false,
    type: "success",
    content: "",
  });

  const show = (type: MessageType, content: string) => {
    setMsg({ visible: true, exiting: false, type, content });
    setTimeout(() => {
      setMsg((prev) => ({ ...prev, exiting: true }));
      setTimeout(() => {
        setMsg((prev) => ({ ...prev, visible: false, exiting: false }));
      }, 200);
    }, 3000);
  };

  return { msg, show };
}

export default function ContactUs() {
  const [formData, setFormData] = useState<FormData>({ fullName: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const { msg, show: showMessage } = useAntMessage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendToTelegram = async () => {
    const text = `📬 *Yangi xabar*\n👤 *Ism:* ${formData.fullName}\n📧 *Email:* ${formData.email}\n💬 *Xabar:* ${formData.message}`;
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "Markdown" }),
    });
    if (!res.ok) throw new Error("Telegram error");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;
    setStatus("sending");
    try {
      await sendToTelegram();
      setStatus("idle");
      setFormData({ fullName: "", email: "", message: "" });
      showMessage("success", "Send Success Message !");
    } catch {
      setStatus("idle");
      showMessage("error", "Error sending message");
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <main className="bg-white font-sans text-gray-800 mt-12">
      <AntMessage msg={msg} />

      <section className="px-5 pt-12 pb-10 md:px-16 lg:px-25 max-w-5xl ">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium mt-8 text-gray-900"  data-aos="fade-right">
          We believe in sustainable decor. We’re passionate about <br />  life at home.
        </h1>
        <p className="mt-5 text-gray-500 max-w-2xl" data-aos="fade-left">
          Our features timeless furniture, with natural fabrics, curved lines, plenty of mirrors and classic design, which can be incorporated into any decor project. The pieces enchant for their sobriety, to last for generations, faithful to the shapes of each period, with a touch of the present
        </p>
      </section>

      <Aboutcontactus />
      <Info />

      <section className="px-5 md:px-16 lg:px-24 max-w-7xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-gray-300 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-gray-300 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows={4}
                required
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-gray-300 outline-none resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-black text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400 transition-all w-fit"
            >
              {status === "sending" ? "Yuborilmoqda..." : "Send Message"}
            </button>
          </form>

          <div className="h-[400px] rounded-lg overflow-hidden border">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.8116317849167!2d69.21295458469035!3d41.33470927130674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bfe2c9dfdb7%3A0x4e70e6b88f98e874!2sMARS%20IT%20Tinchlik!5e0!3m2!1sen!2s" 
              width="100%" 
              height="100%" 
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Footer info qismi */}
      <section className="bg-gray-50 py-10 px-5 md:px-16 lg:px-24">
         <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><p className="font-bold">Free Shipping</p><p className="text-xs text-gray-400">Order above $200</p></div>
            <div><p className="font-bold">Money-back</p><p className="text-xs text-gray-400">30 days guarantee</p></div>
            <div><p className="font-bold">Secure Payments</p><p className="text-xs text-gray-400">Secured by Stripe</p></div>
            <div><p className="font-bold">24/7 Support</p><p className="text-xs text-gray-400">Phone & Email</p></div>
         </div>
      </section>
    </main>
  );
}