// import React, {FC} from 'react';
// import {LuArrowRightFromLine} from 'react-icons/lu';
// import {MdGeneratingTokens, MdToken} from 'react-icons/md';
// import {RiTokenSwapFill} from 'react-icons/ri';
// import {RxTokens} from 'react-icons/rx';

// type FeatureViewProps = {
//   setOpenAirdrop: (open: boolean) => void;
//   setOpenContact: (open: boolean) => void;
//   setOpenCreateModal: (open: boolean) => void;
//   setOpenSendTransaction: (open: boolean) => void;
//   setOpenTokenMetaData: (open: boolean) => void;
// };

// export const FeatureView: FC<FeatureViewProps> = ({
//   setOpenAirdrop,
//   setOpenContact,
//   setOpenCreateModal,
//   setOpenSendTransaction,
//   setOpenTokenMetaData,
// }) => {

//   const features =[
//     {
//     name: "Token Generator",
//     icon: <MdGeneratingTokens/>,
//     description:
//      "Start working with solana token lunchpad, It allow you to create solana token by creating, deploying, airdrop, transfering and updating token",
//     function: setOpenCreateModal,
//     },
//     {
//     name: "Get AirDrop",
//     icon: <MdToken/>,
//     description: "AirDrop yourself some devnet sol",
//     function: setOpenAirdrop ,
//     },
//     {
//     name: "Transfer Sol",
//     icon: <RiTokenSwapFill/>,
//     description: "Transfer some sol",
//     function: "",
//     },
//     {
//     name: "Token Metadata",
//     icon: <RxTokens/>,
//     description: "",
//     function: "",
//     },
//   ]
//   return <section className='py-20'>
//     <div className='cointainer'>
//       <div className='mb-10 flex item-end
//       justify-between'>
//         <div className='mx-auto max-w-2xl text-center'>
//           <h2 className='mb-4 text-3xl font-medium capitalize text-white'>
//             Choose Solana Token Generator <br/>
//           </h2>
//           <p className='text-default-200 text-sm
//           font-medium'>
//             Now You can cerete tokens on Solana network <br/>
//             instanlty <br/>
//             no code needed
//           </p>
//         </div>
//       </div>
//       <div className='bg-default-950/40 flex-wrap 
//       items-center rounded-3xl
//       backdrop-blur-3xl'>
//         {
//           features.map((list, index) => (
//             <div
//               key={index}
//               className={`w-auto grow border-b border-white/10 md:w-12 ${
//                 index === 0 
//                 ? "md:border-e"
//                 : index==1 
//                 ?"" 
//                 : index==2
//                 ? "md:border-e md:border-b-0"
//                 : ""
//               }`}
//             >
//               <div className='p-8 sm:p-10'>
//                 <div className='bg-primary/10
//                 text-primary mb-10 inline-flex h-16
//                 w-16 items-center justify-center
//                 rounded-xl'>
//                   <i data-lucide="fremer">{list.icon}</i>
//                 </div>
//                 <h2 className='mb-4 text-2xl
//                 font-medium text-white'>
//                   {list.name}
//                 </h2>
//                 <p className='text-default-200 mb-6 text-base'>
//                   {list.description}
//                   </p>
//                   <a
//                     onClick={() => {
//                       if (typeof list.function === 'function') {
//                         list.function(true);
//                       }
//                     }}
//                     className='hover:bg-primary 
//                     inline-flex intems-center
//                     justidy-cneter gap-2 rounded-full
//                     border border-white/10 px-6 py-2
//                     text-white transition-all
//                     duration-300'>
//                       Use Tools
//                       <i>
//                         <LuArrowRightFromLine/>
//                       </i>
//                     </a>
//               </div>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   </section>
// }

import React, { FC } from 'react';
import { LuArrowRightFromLine } from 'react-icons/lu';
import { MdGeneratingTokens, MdToken } from 'react-icons/md';
import { RiTokenSwapFill } from 'react-icons/ri';
import { RxTokens } from 'react-icons/rx';

type FeatureViewProps = {
  setOpenAirdrop: (open: boolean) => void;
  setOpenContact: (open: boolean) => void;
  setOpenCreateModal: (open: boolean) => void;
  setOpenSendTransaction: (open: boolean) => void;
  setOpenTokenMetaData: (open: boolean) => void;
};

export const FeatureView: FC<FeatureViewProps> = ({
  setOpenAirdrop,
  setOpenContact,
  setOpenCreateModal,
  setOpenSendTransaction,
  setOpenTokenMetaData,
}) => {
  const features = [
    {
      name: "Token Generator",
      icon: <MdGeneratingTokens className="text-2xl" />,
      description: "Launch your own Solana token in minutes with our easy-to-use generator. No coding required.",
      function: setOpenCreateModal,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      name: "Get AirDrop",
      icon: <MdToken className="text-2xl" />,
      description: "Need test tokens? Get instant airdrops of SOL and SPL tokens on devnet for testing.",
      function: setOpenAirdrop,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      name: "Transfer Tokens",
      icon: <RiTokenSwapFill className="text-2xl" />,
      description: "Seamlessly transfer SOL and SPL tokens between wallets with our simple transaction tool.",
      function: setOpenSendTransaction,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      name: "Token Metadata",
      icon: <RxTokens className="text-2xl" />,
      description: "View and update your token metadata to customize your token's appearance and information.",
      function: setOpenTokenMetaData,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-default-900 to-default-950">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Powerful Solana Token Tools
          </h2>
          <p className="text-default-300 mx-auto max-w-2xl text-lg">
            Create and manage Solana tokens instantly with our no-code platform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`group rounded-xl border border-white/10 bg-default-950/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 ${feature.bgColor}`}
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor} ${feature.color} transition-all`}>
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{feature.name}</h3>
              <p className="mb-5 text-default-300 text-sm">{feature.description}</p>
              <button
                onClick={() => {
                  if (typeof feature.function === 'function') {
                    feature.function(true);
                  }
                }}
                className="inline-flex items-center gap-1 text-sm font-medium text-white transition-all hover:text-primary"
              >
                Use Tool
                <LuArrowRightFromLine className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};