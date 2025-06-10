// import React, {FC} from 'react'



// export const OfferView: FC = ({}) => {
//   return (
//     <section id="features" className='py-20'>
//       <div className='=container'>
//         <div className='mb-10 flex items-end 
//         justify-between'>
//           <div className='mx-auto max-w-2xl text-center'>
//             <h2 className='mb-4 text-3xl font-medium capilalize 
//             text-white'>
//               Solana Token Popularity
//             </h2>
//             <p className='text-default-200 text-sm fount-medium'>
//               loremipsum
//                </ p>
//           </div>
//         </div>
//         {/* 1st section */}
//         <div className='grid gap-6 lg:grid-cols-3'>
//           <div className='space-y-6'>
//             <div className='bg-default-950/40
//             hover:-translate-y-2 border primary
//             border-s-2 rounded-xl backdrop-blur-3xl
//             transition-all duration-500'>
//               <div className='p-10'>
//                 <i className='text-primary h-10 w-10'></i>
//                 <h3 className='mb-4 mt-8 text-2xl font-medium
//                 text-white'>
//                   Token Lunchpad
//                 </h3>
//                 <p className='text-default-100 mb-4 text-sm font-medium'>
//                   {/* add some description */}
//                 </p>
//                 <a href="#"
//                 className='text-primary group relative inline-flex item center
//                 gap-2'>
//                   <span className='bg-primary/80
//                   absolute -bottom-0 h-px w-7/12
//                   rounded transition-all
//                   duration-500 group-hover:w-full '>
//                     Read More <i className='h-4 w-4'></i>
//                   </span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* 2nd */}
//                 <div className='grid gap-6 lg:grid-cols-3'>
//           <div className='space-y-6'>
//             <div className='bg-default-950/40
//             hover:-translate-y-2 border primary
//             border-s-2 rounded-xl backdrop-blur-3xl
//             transition-all duration-500'>
//               <div className='p-10'>
//                 <i className='text-primary h-10 w-10'></i>
//                 <h3 className='mb-4 mt-8 text-2xl font-medium
//                 text-white'>
//                   Token Lunchpad
//                 </h3>
//                 <p className='text-default-100 mb-4 text-sm font-medium'>
//                   {/* add some description */}
//                 </p>
//                 <a href="#"
//                 className='text-primary group relative inline-flex item center
//                 gap-2'>
//                   <span className='bg-primary/80
//                   absolute -bottom-0 h-px w-7/12
//                   rounded transition-all
//                   duration-500 group-hover:w-full '>
//                     Read More <i className='h-4 w-4'></i>
//                   </span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* 3rd */}
//                 <div className='grid gap-6 lg:grid-cols-3'>
//           <div className='space-y-6'>
//             <div className='bg-default-950/40
//             hover:-translate-y-2 border primary
//             border-s-2 rounded-xl backdrop-blur-3xl
//             transition-all duration-500'>
//               <div className='p-10'>
//                 <i className='text-primary h-10 w-10'></i>
//                 <h3 className='mb-4 mt-8 text-2xl font-medium
//                 text-white'>
//                   Token Lunchpad
//                 </h3>
//                 <p className='text-default-100 mb-4 text-sm font-medium'>
//                   {/* add some description */}
//                 </p>
//                 <a href="#"
//                 className='text-primary group relative inline-flex item center
//                 gap-2'>
//                   <span className='bg-primary/80
//                   absolute -bottom-0 h-px w-7/12
//                   rounded transition-all
//                   duration-500 group-hover:w-full '>
//                     Read More <i className='h-4 w-4'></i>
//                   </span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     </section>
//   )
// }


import React, { FC } from 'react';
import { FaRocket, FaChartLine, FaUsers } from 'react-icons/fa';

export const OfferView: FC = () => {
  const features = [
    {
      title: "Token Launchpad",
      icon: <FaRocket className="text-3xl" />,
      description: "Launch your Solana token with our easy-to-use platform. No coding required - just configure and deploy.",
      borderColor: "border-purple-500",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-500"
    },
    {
      title: "Token Analytics",
      icon: <FaChartLine className="text-3xl" />,
      description: "Track your token's performance with real-time analytics and market insights.",
      borderColor: "border-blue-500",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500"
    },
    {
      title: "Community Building",
      icon: <FaUsers className="text-3xl" />,
      description: "Grow your token community with built-in marketing tools and social features.",
      borderColor: "border-green-500",
      bgColor: "bg-green-500/10",
      textColor: "text-green-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-default-950 to-default-900">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Why Choose Solana Token Platform
          </h2>
          <p className="text-default-300 mx-auto max-w-2xl">
            Powerful tools to launch and grow your token on Solana's high-speed blockchain
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`group rounded-xl border-l-4 ${feature.borderColor} bg-default-950/40 p-8 backdrop-blur-sm transition-all hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10`}
            >
              <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg ${feature.bgColor} ${feature.textColor}`}>
                {feature.icon}
              </div>
              <h3 className="mb-4 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mb-6 text-default-300">{feature.description}</p>
              <a 
                href="#"
                className="inline-flex items-center text-sm font-medium text-white transition-all hover:text-primary"
              >
                Learn more
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};