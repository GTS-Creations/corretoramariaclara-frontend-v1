import {
  Calculator,
  HelpCircle,
  Wallet,
  Percent,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const info = [
  {
    title: "O que é?",
    desc: "Um empréstimo de longo prazo destinado exclusivamente à compra de imóveis, onde o próprio bem serve como garantia.",
    icon: <Wallet className="text-clara-secondary w-8 h-8" />,
  },
  {
    title: "Como funciona?",
    desc: "O banco paga o vendedor e você paga o banco em parcelas mensais, acrescidas de juros e taxas, em até 35 anos.",
    icon: <Percent className="text-clara-secondary w-8 h-8" />,
  },
  {
    title: "Documentação",
    desc: "Exige comprovação de renda, histórico de crédito limpo e documentos pessoais do comprador e do vendedor.",
    icon: <FileText className="text-clara-secondary w-8 h-8" />,
  },
];

const steps = [
  {
    step: "01",
    label: "Simulação",
    detail: "Escolha o banco e veja o valor das parcelas.",
  },
  {
    step: "02",
    label: "Análise de Crédito",
    detail: "O banco avalia se você pode pagar o valor.",
  },
  {
    step: "03",
    label: "Avaliação do Bem",
    detail: "Um engenheiro visita o imóvel para avaliar o valor.",
  },
  {
    step: "04",
    label: "Assinatura",
    detail: "Contrato assinado e liberação do recurso.",
  },
];

export default function PageFinancing() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-clara-tertiary py-20 px-4 xl:px-0">
        <div className="max-w-5xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-urban mb-6">
            Descomplique o seu{" "}
            <span className="text-clara-secondary">Financiamento</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-urban">
            Entender as regras do jogo é o primeiro passo para conquistar a
            chave da sua casa nova. Preparamos um guia completo para você
            decidir com segurança.
          </p>
        </div>
      </section>

      {/* --- CARDS INFORMATIVOS --- */}
      <section className="max-w-7xl mx-auto px-4 xl:px-0 mt-12 font-urban">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {info.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center text-center"
            >
              <div className="bg-clara-primary p-4 rounded-full mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- ETAPAS DO PROCESSO --- */}
      <section className="py-20 px-4 xl:px-0 max-w-7xl mx-auto font-urban">
        <h2 className="text-3xl font-serif font-extrabold text-slate-900 text-center mb-16">
          O Caminho até a Escritura
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative p-6 bg-slate-100 rounded-xl group hover:bg-clara-secondary/30 transition-colors duration-300"
            >
              <span className="text-4xl font-black text-slate-200 group-hover:text-clara-secondary/30 transition-colors">
                {item.step}
              </span>
              <h4 className="text-lg font-bold text-slate-800 group-hover:text-white mt-2">
                {item.label}
              </h4>
              <p className="text-sm text-slate-500 group-hover:text-clara-secondary mt-2">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- SAC E DÚVIDAS FREQUENTES --- */}
      <section className="bg-white py-20 px-4 xl:px-0 font-urban">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="w-12 h-12 text-clara-secondary mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-slate-900">
              Principais Dúvidas
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-semibold cursor-pointer">
                Posso usar o FGTS no financiamento?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Sim! O FGTS pode ser usado como entrada, para amortizar o saldo
                devedor ou até para abater o valor das prestações, desde que o
                imóvel e o comprador atendam aos requisitos do SFH.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-semibold cursor-pointer">
                Qual a diferença entre SAC e PRICE?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                No sistema **SAC**, as parcelas começam mais altas e terminam
                mais baixas (amortização constante). Na tabela **PRICE**, as
                parcelas são fixas do início ao fim do contrato.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-semibold cursor-pointer">
                Qual o valor máximo que posso comprometer da minha renda?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Geralmente, os bancos permitem que a parcela do financiamento
                comprometa até **30% da renda bruta mensal** da família.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-20 px-4 xl:px-0">
        <div className="max-w-5xl mx-auto bg-clara-secondary rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold font-urban mb-6">
              Pronto para dar esse passo?
            </h2>
            <p className="text-lg mb-10 text-white max-w-xl mx-auto font-urban">
              Nossa equipe de especialistas está pronta para fazer uma simulação
              personalizada para você sem custo algum.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="https://wa.me/5587999380401?text=Olá! Gostaria de saber como simular o financiamento"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-clara-secondary font-bold h-14 px-8 rounded-full hover:bg-white cursor-pointer font-cinzel"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Simular Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
