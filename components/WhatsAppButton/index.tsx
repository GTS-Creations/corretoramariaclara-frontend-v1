import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/5587999380401?text=Olá! Gostaria de saber como simular o financiamento"
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex items-center gap-3 group"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="bg-white px-4 py-2 rounded-full shadow-xl text-gray-800 font-bold text-[12px] border border-gray-100 group-hover:bg-gray-50 transition-all duration-300 -mr-5 z-10">
        Simular Financiamento
      </span>

      <div className="bg-[#25D366] p-3 rounded-full shadow-lg group-hover:bg-[#20ba5a] group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
        <FaWhatsapp size={40} color="white" />
      </div>
    </Link>
  );
}
