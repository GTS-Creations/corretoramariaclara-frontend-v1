import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const navigation = [
  { name: "Encontre seu Imóvel", href: "/" },
  { name: "Sobre Financiamento", href: "/entenda-sobre-o-financiamento" },
];

export default function Footer() {
  return (
    <footer className="bg-clara-quaternary text-white font-urban">
      <div className="mx-auto max-w-7xl px-4 xl:px-0 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                <Image
                  src="/footer.png"
                  alt="Logo Maria Clara Corretora"
                  className="rounded-lg bg-white p-0.5 object-contain object-center w-full h-full"
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight">
                  MARIA CLARA
                </span>
                <span className="text-xs leading-tight">CORRETORA</span>
                <span className="text-xs leading-tight">CRECI: 21203</span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed">
              Especialista em encontrar o imóvel ideal para você e sua família.
            </p>

            <div className="mt-4 flex items-center justify-start gap-4">
              <a
                href="https://www.instagram.com/mariaclara_corretorarcoverde/"
                className="text-white hover:text-red-500 transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>

              <a
                href="https://wa.me/5587999380401"
                className="text-white hover:text-green-500 transition-all duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-white/70 hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://wa.me/5587999380401"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white/70 hover:underline"
                >
                  (87) 99938-0401
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:mariaclaracorretora87@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white/70 hover:underline"
                >
                  mariaclaracorretora87@gmail.com
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="https://maps.app.goo.gl/2pcP7onscYyLxZcCA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white/70 hover:underline"
                >
                  <span>Stand Loteamento Teresópolis, 56510-600</span>
                  <br />
                  <span>Arcoverde - PE</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col items-center justify-center">
          <p>
            © {new Date().getFullYear()} Maria Clara Corretora. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
