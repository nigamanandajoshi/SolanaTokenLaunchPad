import { FC, useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

export const FaqView: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const questions = [
    {
      question: "How do I create a Solana token?",
      answer: "You can create a Solana token instantly using our no-code platform. Just configure your token parameters, and we'll handle the deployment on the Solana blockchain.",
      id: "faq-1",
    },
    {
      question: "What are the costs involved?",
      answer: "Creating a basic token is free. There are only blockchain transaction fees (gas fees) which vary based on network congestion but are typically very low on Solana.",
      id: "faq-2",
    },
    {
      question: "Can I customize my token's metadata?",
      answer: "Yes, you can fully customize your token's name, symbol, logo, and other metadata either during creation or anytime after deployment.",
      id: "faq-3",
    },
    {
      question: "How do I airdrop tokens to my community?",
      answer: "Our platform includes an easy airdrop tool where you can upload a list of wallet addresses and amounts, then execute the airdrop with one click.",
      id: "faq-4",
    },
    {
      question: "Is coding knowledge required?",
      answer: "No coding is required! Our platform handles all the technical complexity, allowing anyone to create and manage Solana tokens through a simple interface.",
      id: "faq-5",
    },
    {
      question: "What blockchain networks are supported?",
      answer: "Currently we support Solana mainnet and devnet. We plan to add support for additional networks in the future based on community demand.",
      id: "faq-6",
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-default-900 to-default-950">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-default-300 mx-auto max-w-2xl">
            Find answers to common questions about creating and managing Solana tokens
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {questions.map((item, index) => (
            <div 
              key={item.id}
              className={`rounded-xl border border-white/10 bg-default-950/40 backdrop-blur-sm transition-all ${
                activeIndex === index ? 'border-primary/30' : ''
              }`}
            >
              <button
                className="flex w-full items-center justify-between p-6 text-left"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-lg font-medium text-white">
                  {item.question}
                </h3>
                <span className={`ml-4 text-primary transition-transform ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}>
                  {activeIndex === index ? <FiMinus /> : <FiPlus />}
                </span>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 text-default-300">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-default-300 mb-4">
            Still have questions?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-primary/90"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};



