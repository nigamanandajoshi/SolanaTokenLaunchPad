// import React, {FC} from 'react';
// import {useForm} from "@formspree/react";
// import {TiSocialFacebook,
//   TiSocialTwitter,
//   TiSocialLinkedin,
//   TiSocialYoutube} from 'react-icons/ti';


// export const Footer: FC = () => {
//    const [state, handleSubmit] = useForm("xjvljqeg"); //use your Formspree form ID here
    
//    if (state.succeeded) {
//       return (
//         <h1 className="md:text-5xl/tight my-4
//         max-2-lg text-4xl font-medium text-white"> 
//         Thanks for sending message!
//         </h1>
//       );
//     }

//     const menuOne = [
//       "Support Center",
//       "Customer Service",
//       "Contact Us",
//       "About Us",
//     ];

//     const menuTwo = [
//       "Inquiries",
//       "Social Media Support",
//       "Twitter",
//     ];


//     return  <footer className="bg-default-950/40 
//     backdrop-blur-3xl">
//       <div className='container py-20 lg:px-20'>
//         <div className='grid grid-cols-2 gap-10
//         lg:grid-cols-12 lg:gap-16'>
//           <div className='col-span-2 sm:col-span-1 
//           lg:col-span-3'>
//             <ul className='flex flex-col gap-3'>
//               <h5 className='text-default-200
//               font-medium lg:text-lg xl:text-xl'>
//                 About Us
//               </h5>
//               {
//                 menuOne.map((item, index) => (
//                   <li key={index}>
//                     <a href="#" className='text-default-300
//                     text-base transition-all
//                     hover:text-white'>
//                       <i data-lucide="gauge-circle"
//                       className='me-2 inline-block h-4'></i>
//                       {item}
//                     </a>
//                   </li>
//                 ))
//               }
//             </ul>
//           </div>
//           <div className='col-span-2 sm:col-span-1
//           lg:col-span-3'>
//             <ul className='flex flex-col gap-3'>
//               <h5 className='text-default-200
//               font-medium lg:text-lg xl:text-xl'>
//                 Support
//               </h5>
//               {
//                 menuTwo.map((item, index) => (
//                   <li key={index}>
//                     <a href="#" className='text-default-300
//                     text-base transition-all
//                     hover:text-white'>
//                       <i data-lucide="gauge-circle"
//                       className='me-2 inline-block h-4'></i>
//                       {item}
//                     </a>
//                   </li>
//                 ))
//               }
//             </ul>
//           </div>
//            <div className='col-span-2 sm:col-span-6'>
//             <div className='p-10'>
//               <h6 className= "mb-4 text-xltext-white">NewsLetter</h6>
//               <p className='text-default-200 mb-6
//               text-base font-medium'>
//                 Subscribe to our newsletter to get the latest updates.
//               </p>
//               <form onSubmit={handleSubmit}
//               className='mb-6 space-y-2'>
//               <label htmlFor="email" 
//                 className='text-base text-white'>
//                 Email 
//               </label>
//                 <div className='relative'>
//                   <input type="email" id="email"
//                   name='email' className='bg-default-950/60
//                   pe-40 ps-4 h-12 w-full
//                   rounded-lg border-white/10
//                   py-4 text-white
//                   backdrop-blur-3xl
//                   focus:border-white/10
//                   focus:rings-0 '/>
//                   <button type="submit" disabled={state.submitting}
//                     className='hover:bg-primary-hover
//                     hover:border-primary-hover
//                     border-primary bg-primary end-[6px] absolute top-[6px]
//                     inline-flex h-9 items-center
//                     justify-center gap-2 rounded-md
//                     px-6 text-white transition-all'
//                   >
//                     Subscribe
//                   </button>
//                   </div>
//               </form >

//               <div>
//                 <h6 className='mb-4 text-base
//                 text-white'> Follow Us</h6>
//                 <ul className='flex flex-wrap
//                   items-center gap-1'>
//                     {[<TiSocialFacebook/>,
//                     <TiSocialTwitter/>,
//                     <TiSocialLinkedin/>,
//                     <TiSocialYoutube/>].map((social, index) => (
//                       <li key={index}>
//                         <a href="#" className='hover:bg-primary group 
//                         inline-flex h-10 w-10 items-center
//                         justify-center rounded-lg
//                         border border-white/10
//                         transition-all 
//                         duration-500'>
//                           <i data-lucide="facebook"
//                           className='text-default-300
//                           group-hover:text-white'
//                         >
//                           {social}

//                           </i>
//                         </a>
//                         </li>
//                         ))} 

//                 </ul>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//       {/* // copyright section */}
//       <div className='border-t border-white/10
//       py-6'>
//         <div className='md:text-start container
//         flex h-full flex-wrap items-center
//         md:justify-between lg:px-20'>
//           <p className='text-default-400 text-base
//           font-medium'>
//             © SolBuilders 2025. All rights reserved.
//             <a href='#'>
//               Design & Created {" "}
//               by Nigamananda
//             </a>
//           </p>
//           <p className='text-default-400 text-base
//           font-medium '> Terms & policy</p>

//         </div>
//       </div>
//     </footer>
// };

import React, { FC } from 'react';
import { useForm } from "@formspree/react";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialLinkedin,
  TiSocialYoutube
} from 'react-icons/ti';

export const Footer: FC = () => {
  const [state, handleSubmit] = useForm("xjvljqeg");
    
  if (state.succeeded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"> 
            Message Sent Successfully!
          </h1>
          <p className="text-xl text-white/80">Thank you for reaching out. We'll get back to you soon!</p>
        </div>
      </div>
    );
  }

  const menuOne = [
    { name: "Support Center", icon: "🎯" },
    { name: "Customer Service", icon: "💬" },
    { name: "Contact Us", icon: "📞" },
    { name: "About Us", icon: "ℹ️" },
  ];

  const menuTwo = [
    { name: "Inquiries", icon: "❓" },
    { name: "Social Media Support", icon: "📱" },
    { name: "Community", icon: "👥" },
    { name: "Help Center", icon: "🆘" },
  ];

  const socialLinks = [
    { 
      icon: <TiSocialFacebook className="w-5 h-5" />, 
      name: 'Facebook',
      color: 'hover:bg-blue-600',
      href: '#'
    },
    { 
      icon: <TiSocialTwitter className="w-5 h-5" />, 
      name: 'Twitter',
      color: 'hover:bg-sky-500',
      href: '#'
    },
    { 
      icon: <TiSocialLinkedin className="w-5 h-5" />, 
      name: 'LinkedIn',
      color: 'hover:bg-blue-700',
      href: '#'
    },
    { 
      icon: <TiSocialYoutube className="w-5 h-5" />, 
      name: 'YouTube',
      color: 'hover:bg-red-600',
      href: '#'
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 backdrop-blur-sm">
        <div className='container mx-auto px-6 py-20 lg:px-20'>
          <div className='grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16'>
            
            {/* Brand Section */}
            <div className='lg:col-span-4 space-y-6'>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">S</span>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SolBuilders
                </h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                Building the future of decentralized applications with cutting-edge blockchain technology and innovative solutions.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`group relative p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 transition-all duration-300 transform hover:scale-110 ${social.color}`}
                    title={social.name}
                  >
                    <span className="text-white group-hover:text-white transition-colors duration-300">
                      {social.icon}
                    </span>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {social.name}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* About Us Menu */}
            <div className='lg:col-span-2 space-y-6'>
              <h5 className='text-2xl font-bold text-white mb-6 relative'>
                About Us
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </h5>
              <ul className='space-y-4'>
                {menuOne.map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className='group flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2'
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-base group-hover:text-purple-300 transition-colors duration-300">
                        {item.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Menu */}
            <div className='lg:col-span-2 space-y-6'>
              <h5 className='text-2xl font-bold text-white mb-6 relative'>
                Support
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              </h5>
              <ul className='space-y-4'>
                {menuTwo.map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className='group flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2'
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-base group-hover:text-cyan-300 transition-colors duration-300">
                        {item.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Newsletter Section */}
            <div className='lg:col-span-4'>
              <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300'>
                <div className="text-center mb-6">
                  <h6 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    🚀 Stay Updated
                  </h6>
                  <p className='text-gray-300 text-lg'>
                    Get the latest updates on blockchain innovations and exclusive insights!
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div className='space-y-2'>
                    <label htmlFor="email" className='text-sm font-semibold text-gray-200 uppercase tracking-wider'>
                      Email Address
                    </label>
                    <div className='relative group'>
                      <input 
                        type="email" 
                        id="email"
                        name='email'
                        placeholder="Enter your email..."
                        className='w-full h-14 px-6 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all duration-300'
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={state.submitting}
                    className='w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2'
                  >
                    {state.submitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe Now</span>
                        <span>🎯</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className='border-t border-white/20 bg-black/20 backdrop-blur-lg'>
          <div className='container mx-auto px-6 py-8 lg:px-20'>
            <div className='flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0'>
              <div className='flex items-center space-x-4'>
                <p className='text-gray-400 text-base'>
                  © 2025 SolBuilders. All rights reserved.
                </p>
                <div className="hidden md:block w-1 h-1 bg-gray-600 rounded-full"></div>
                <a 
                  href='#' 
                  className='text-gray-400 hover:text-purple-400 transition-colors duration-300 text-base'
                >
                  Crafted with ❤️ by Nigamananda
                </a>
              </div>
              
              <div className='flex items-center space-x-6'>
                <a 
                  href='#' 
                  className='text-gray-400 hover:text-white transition-colors duration-300 text-base'
                >
                  Privacy Policy
                </a>
                <a 
                  href='#' 
                  className='text-gray-400 hover:text-white transition-colors duration-300 text-base'
                >
                  Terms of Service
                </a>
                <a 
                  href='#' 
                  className='text-gray-400 hover:text-white transition-colors duration-300 text-base'
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};