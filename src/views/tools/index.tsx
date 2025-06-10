// import React,{FC} from "react";
// import { MdGeneratingTokens} from "react-icons/md";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import {LuArrowRightFromLine} from "react-icons/lu";

// interface ToolViewProps {
//   setOpenAirdrop: React.Dispatch<React.SetStateAction<boolean>>;
//   setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
//   setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
//   setOpenSendTransaction: React.Dispatch<React.SetStateAction<boolean>>;
//   setOpenTokenMetaData: React.Dispatch<React.SetStateAction<boolean>>;
// }



// export const ToolView: FC<ToolViewProps> = ({
//   setOpenAirdrop,
//   setOpenContact,
//   setOpenCreateModal,
//   setOpenSendTransaction,
//   setOpenTokenMetaData,
// }) => {
//   const tools = [
//     {
//       name: "Create Token",
//       icon: <MdGeneratingTokens />,
//       function: setOpenCreateModal,
//     },
//     {
//       name: "Token Metadata",
//       icon: <MdGeneratingTokens />,
//       function: setOpenTokenMetaData,
//     },
//     {
//       name: "Contact us",
//       icon: <MdGeneratingTokens />,
//       function: setOpenContact,
//     },
//     {
//       name: "Airdrop",
//       icon: <MdGeneratingTokens />,
//       function: setOpenAirdrop,
//     },
//     {
//       name: "Send Transaction",
//       icon: <MdGeneratingTokens />,
//       function: setOpenSendTransaction,
//     },
//     {
//       name: "Buddy Token",
//       icon: <MdGeneratingTokens />,
//       function: setOpenSendTransaction,
//     },
//     {
//       name: "Top Token",
//       icon: <MdGeneratingTokens />,
//       function: setOpenSendTransaction,
//     },
//     {
//       name: "Solana Explorer",
//       icon: <MdGeneratingTokens />,
//       function: setOpenSendTransaction,
//     },
//   ];
//   return <section id="tools" className="py-20">
//     <div className="container">
//       <div className="mb-10 flex items-end 
//       justify-between">
//         <div className="mx-auto max-w-2xl
//         text-center">
//           <h2 className="mb-4 text-3xl
//           font-medium capitalize text-white ">
//            Solana Powerful Tools 
//           </h2>
//           <p className="text-default-200 text-sm
//           front-medium">
//             Lorem ipsum
//           </p>
//         </div>
//       </div> 
//       <div className="grid gap-6 sm:grid-cols-4">
//         {
//           tools.map((tool,index)=>(
//             <div className="bg-default-950/40
//             rounded-xl backdrop-blur-3xl"
//             onClick={()=> tool.function(true)}
//             >
//               <div className="p-6">
//                 <div className="mb-4 flex 
//                 items-center gap-4">
//                   <div className={`inline-flex h-10 w-10
//                     items-center justify-center
//                     rounded-lg bg-red-500/20 ${index == 0 ? "text-red-500" :
//                       index==1 ? "text-sky-500" : index == 2 ? 
//                       "text-indigo-500" : index ==3 ? "text-yellow-500":
//                       "text-teal-500" 
//                     }`}>
//                       <i data-lucide="dribble"
//                       className="">
//                       {tool.icon}
//                       </i>
//                     </div>
//                     <h3 className="text-default-200
//                     text-xl font-medium">
//                       {tool.name}
//                     </h3>
//                 </div>
//                 <a className="text-primary group
//                 relative inline-flex tiems-center
//                 gap-2">
//                   <span className="bg-primary/80
//                   absolute -bottom-0 h-px w-7/12
//                   rounded trasition-all
//                   duration-500
//                   group-hover:w-full"></span>
//                   Select & try
//                   <i data-lucide={"move-right"}>
//                     <LuArrowRightFromLine/>
//                   </i>
//                 </a>
//               </div>
//             </div>
//           ))
//         }
//       </div>
//       <div className="mt=10 flex justify-cneter">
//         <a className="hover:big-primary-hover
//         bg-primary infline-flex item-center
//         justify-center gap-2 rounded-full px-6
//         py-2 text-2hite transition-all
//         duration-500">
//           More Tools
//           <i>
//             <IoIosArrowRoundForward/>
//           </i>
//         </a>
//       </div>
//     </div>
//   </section>

// };

import React, { FC } from "react";
import { MdGeneratingTokens } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LuArrowRightFromLine } from "react-icons/lu";

interface ToolViewProps {
  setOpenAirdrop: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSendTransaction: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenTokenMetaData: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ToolView: FC<ToolViewProps> = ({
  setOpenAirdrop,
  setOpenContact,
  setOpenCreateModal,
  setOpenSendTransaction,
  setOpenTokenMetaData,
}) => {
  const tools = [
    {
      name: "Create Token",
      icon: <MdGeneratingTokens size={20} />,
      function: setOpenCreateModal,
    },
    {
      name: "Token Metadata",
      icon: <MdGeneratingTokens size={20} />,
      function: setOpenTokenMetaData,
    },
    {
      name: "Contact us",
      icon: <MdGeneratingTokens size={20} />,
      function: setOpenContact,
    },
    {
      name: "Airdrop",
      icon: <MdGeneratingTokens size={20} />,
      function: setOpenAirdrop,
    },
    {
      name: "Send Transaction",
      icon: <MdGeneratingTokens size={20} />,
      function: setOpenSendTransaction,
    },
    {
      name: "Buddy Token",
      icon: <MdGeneratingTokens size={20} />,
      function: setOpenSendTransaction,
    },
    {
      name: "Top Token",
      icon: <MdGeneratingTokens size={20} />,
      function: setOpenSendTransaction,
    },
    {
      name: "Solana Explorer",
      icon: <MdGeneratingTokens size={20} />,
      function: setOpenSendTransaction,
    },
  ];

  return (
    <section id="tools" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-medium capitalize text-white">
              Solana Powerful Tools
            </h2>
            <p className="text-default-200 text-sm font-medium">
              Explore our suite of tools to enhance your Solana experience
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <div 
              key={index}
              className="bg-default-950/40 hover:bg-default-950/60 rounded-xl backdrop-blur-3xl border border-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
              onClick={() => tool.function(true)}
            >
              <div className="p-6">
                <div className="mb-4 flex items-center gap-4">
                  <div
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${
                      index === 0
                        ? "bg-red-500/20 text-red-500"
                        : index === 1
                        ? "bg-sky-500/20 text-sky-500"
                        : index === 2
                        ? "bg-indigo-500/20 text-indigo-500"
                        : index === 3
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-teal-500/20 text-teal-500"
                    }`}
                  >
                    {tool.icon}
                  </div>
                  <h3 className="text-default-200 text-xl font-medium">
                    {tool.name}
                  </h3>
                </div>
                <div className="text-primary group relative inline-flex items-center gap-2">
                  <span className="bg-primary/80 absolute -bottom-0 h-px w-7/12 rounded transition-all duration-500 group-hover:w-full"></span>
                  Select & try
                  <LuArrowRightFromLine className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button className="hover:bg-primary/90 bg-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-white transition-all duration-500">
            More Tools
            <IoIosArrowRoundForward className="text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
};


