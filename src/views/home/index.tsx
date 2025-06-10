// import { FC } from 'react';
// import { MdGeneratingTokens } from 'react-icons/md';
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// // INTERNAL IMPORT
// // Commented out to avoid import crash
// import pkg from "../../../package.json";

// export const HomeView: FC<{ setOpenCreateModal: (open: boolean) => void }> = ({ setOpenCreateModal }) => {
//   return (
//     <section id="home" className="relative overflow-hidden pb-20 pt-[72px]">
//       <div className="bg-default-950/40 rounded-2xl">
//         <div className="container">
//           <div className="p-6">
//             <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
//               <div className="bg-primary/10 -z-1 start-0 absolute top-0 h-14 w-14 animate-[spin_10s_linear_infinite] rounded-2xl rounded-br-none rounded-tl-none"></div>
//               <div className="bg-primary/20 -z-1 end-0 absolute bottom-0 h-14 w-14 animate-ping rounded-full"></div>
//               <div>
//                 <span className="text-primary bg-primary/20 rounded-md px-3 py-1 text-sm font-medium uppercase tracking-wider">
//                   CREATE SOLANA TOKEN {pkg.version}
//                 </span>
//                 <h1 className="md:text-5xl/tight my-4 max-w-lg text-4xl font-medium text-white">
//                   Create your Own token without code
//                 </h1>
//                 <p className="text-default-300 md:text-lg">
//                   Launch your Solana token, customize parameters, and deploy instantly—no coding required.
//                 </p>
//                 <div className="new_add-css">
//                   <a
//                     onClick={() => setOpenCreateModal(true)}
//                     className="hover:bg-primary hover pe-4 group-first: mt-10 inline-flex
//                     items-center justify-center gap-2 rounded-full border
//                     border-white/10 px-1 py-1 text-white transition-all duration-300"
//                   >
//                     <span className="bg-primary/20 text-primary me-2 flex h-11 w-11 items-center justify-center rounded-full group-hover:bg-white/10 group-hover:text-white">
//                       <i data-lucide="image">
//                         <MdGeneratingTokens />
//                       </i>
//                     </span>
//                     Create
//                   </a>
//                   <div className="mt-8">
//                     <WalletMultiButton />
//                   </div>
//                 </div>
//               </div>
//               <div className="mx-auto h-[595px] overflow-hidden">
//                 <div className="marquee grid grid-cols-2 gap-6">
//                   <div className="relative m-auto flex flex-col gap-6 overflow-hidden">
//                     <div className="marquee-hero flex min-h-full flex-shrink-0 flex-col items-center justify-around gap-6">
//                       {["img-9", "img-21", "img-14", "img-22", "img-10"].map((images, index) => (
//                         <img
//                           key={index}
//                           src={`/assets/images/ai/${images}.jpg`}
//                           alt=""
//                           className="aspect-1 h-full w-60 rounded-xl object-cover"
//                         />
//                       ))}
//                     </div>
//                     <div
//                       aria-hidden="true"
//                       className="marquee-hero flex min-h-full flex-shrink-0 flex-col items-center justify-around gap-6"
//                     >
//                       {["img-9", "img-21", "img-14", "img-22", "img-10"].map((images, index) => (
//                         <img
//                           key={index}
//                           src={`/assets/images/ai/${images}.jpg`}
//                           alt=""
//                           className="aspect-1 h-full w-60 rounded-xl object-cover"
//                         />
//                       ))}
//                     </div>
//                     <div className="marquee-reverse m-auto flex flex-col gap-6 overflow-hidden">
//                       <div className="marquee-hero flex min-h-full flex-shrink-0 flex-col items-center justify-around gap-6">
//                         {["img-6", "img-10", "img-11", "img-12", "img-13"].map((images, index) => (
//                           <img
//                             key={index}
//                             src={`/assets/images/ai/${images}.jpg`}
//                             alt=""
//                             className="aspect-1 h-full w-60 rounded-xl object-cover"
//                           />
//                         ))}
//                       </div>
//                     </div>
//                     <div
//                       aria-hidden="true"
//                       className="marquee-hero flex min-h-full flex-shrink-0 flex-col items-center justify-around gap-6"
//                     >
//                       {["img-9", "img-21", "img-14", "img-22", "img-10"].map((images, index) => (
//                         <img
//                           key={index}
//                           src={`/assets/images/ai/${images}.jpg`}
//                           alt=""
//                           className="aspect-1 h-full w-60 rounded-xl object-cover"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


// i

//deepseek

import { FC } from 'react';
import { MdGeneratingTokens, MdRocketLaunch } from 'react-icons/md';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// INTERNAL IMPORT
import pkg from "../../../package.json";

export const HomeView: FC<{ setOpenCreateModal: (open: boolean) => void }> = ({ setOpenCreateModal }) => {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-[72px] bg-gradient-to-b from-default-950 to-default-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl opacity-20 animate-float-delay"></div>
      </div>

      <div className="bg-default-950/40 rounded-2xl backdrop-blur-sm border border-white/10">
        <div className="container mx-auto px-4">
          <div className="p-6 md:p-10">
            <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* Decorative elements */}
              <div className="bg-primary/10 absolute top-0 left-0 h-14 w-14 animate-[spin_10s_linear_infinite] rounded-2xl rounded-br-none rounded-tl-none"></div>
              <div className="bg-primary/20 absolute bottom-0 right-0 h-14 w-14 animate-ping rounded-full"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <span className="text-primary bg-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider inline-flex items-center">
                  <MdRocketLaunch className="mr-2" />
                  CREATE SOLANA TOKEN v{pkg.version}
                </span>
                <h1 className="mt-6 mb-5 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Create Your Own <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Solana Token</span> 
                  <br />Without Writing Code
                </h1>
                <p className="text-default-300 text-lg md:text-xl mb-8 max-w-lg">
                  Launch your custom Solana token in minutes. Fully customizable parameters with zero coding required.
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    onClick={() => setOpenCreateModal(true)}
                    className="group relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-purple-600 px-6 py-3 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
                  >
                    <span className="bg-white/20 flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-white/30 transition-all">
                      <MdGeneratingTokens className="text-white" />
                    </span>
                    Create Token Now
                  </button>
                  
                  <div className="wallet-adapter-button-trigger">
                    <WalletMultiButton className="!bg-white/10 !text-white !border !border-white/10 hover:!bg-white/20 !rounded-full !px-6 !py-3 !font-medium" />
                  </div>
                </div>
                
                <div className="mt-8 flex items-center gap-4 text-default-400 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span>Solana Mainnet Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <span>100% No Code</span>
                  </div>
                </div>
              </div>
              
              {/* Image marquee */}
              <div className="relative mx-auto h-[595px] w-full overflow-hidden rounded-2xl border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-default-950/80 z-10"></div>
                <div className="marquee grid grid-cols-2 gap-6 h-full">
                  <div className="relative m-auto flex flex-col gap-6 overflow-hidden">
                    <div className="marquee-hero flex min-h-full flex-shrink-0 flex-col items-center justify-around gap-6">
                      {["img-9", "img-21", "img-14", "img-22", "img-10"].map((images, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={`/assets/images/ai/${images}.jpg`}
                            alt=""
                            className="aspect-1 h-full w-60 rounded-xl object-cover transform transition-all duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                        </div>
                      ))}
                    </div>
                    <div
                      aria-hidden="true"
                      className="marquee-hero flex min-h-full flex-shrink-0 flex-col items-center justify-around gap-6"
                    >
                      {["img-9", "img-21", "img-14", "img-22", "img-10"].map((images, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={`/assets/images/ai/${images}.jpg`}
                            alt=""
                            className="aspect-1 h-full w-60 rounded-xl object-cover transform transition-all duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="marquee-reverse m-auto flex flex-col gap-6 overflow-hidden">
                    <div className="marquee-hero flex min-h-full flex-shrink-0 flex-col items-center justify-around gap-6">
                      {["img-6", "img-10", "img-11", "img-12", "img-13"].map((images, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={`/assets/images/ai/${images}.jpg`}
                            alt=""
                            className="aspect-1 h-full w-60 rounded-xl object-cover transform transition-all duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                        </div>
                      ))}
                    </div>
                    <div
                      aria-hidden="true"
                      className="marquee-hero flex min-h-full flex-shrink-0 flex-col items-center justify-around gap-6"
                    >
                      {["img-9", "img-21", "img-14", "img-22", "img-10"].map((images, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={`/assets/images/ai/${images}.jpg`}
                            alt=""
                            className="aspect-1 h-full w-60 rounded-xl object-cover transform transition-all duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};