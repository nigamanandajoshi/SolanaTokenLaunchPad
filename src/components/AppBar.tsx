// import {FC} from 'react'
// import {LuMenu} from "react-icons/lu";
// import NetworkSwitcher from './NetworkSwitcher';

// export const AppBar: FC = (props) => {
//   const menu = [
//     {
//       name: "Home",
//       link: "#home",
//     },
//     {
//       name: "Tools",
//       link: "#tools",
//     },
//     {
//       name: "Features",
//       link: "#features",
//     },
//     {
//       name: "Price",
//       link: "#price",
//     },
//     {
//       name: "Faq",
//       link: "#faq",
//     },
//   ];

//   return (
//     <div>
//       <header id="navbar-sticky" className='navbar'>
//         <div className="container">
//           <nav>
//             <a href="/" className="logo">
//               <img src="/assets/images/logo1.png" 
//               className='h-10 ' alt="Logo" />
//             </a>
//             <div className='ms-auto flex
//               items-center px-2.5 lg:hidden'>
//                 <button className="hs-collapsible-toggle 
//                 bg-default-100/5 inline-flex h-9 w-12
//                 items-center justify-center
//                 rounded-md border border-white/20"
//                 type="button"
//                 data-hs-collapse="#mobilemenu"
//                 data-hs-type="collapse">
//                   <i data-lucide="menu" 
//                   className="stroke-white">
//                     <LuMenu/>
//                   </i>
//                 </button>
//             </div>
//             <div className="hs-collapse mx-auto mt-2
//               hidden grow basis-full items-center
//               justify-center transition-all
//               duration-300 lg:mt-0 lg:flex lg:basis-auto"
//               id="mobilemenu">
//                 <ul id='navbar-navlist'
//                 className='navbar-nav'>{
//                   menu.map((list, index)=> (
//                     <li className='nav-item' key={index}>
//                       <a className='nav-link' href={list.link}>{list.name}</a>
//                     </li>
//                 ))}
//                 </ul>
//             </div>

//             <NetworkSwitcher />
//           </nav>
//           </div>
//       </header>
//       {props.children}
//     </div>
//   );
// };

// export default AppBar

//new one 

import { FC, useState, useEffect } from 'react';
import { LuMenu, LuX } from "react-icons/lu";
import NetworkSwitcher from './NetworkSwitcher';

export const AppBar: FC = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menu = [
    {
      name: "Home",
      link: "#home",
    },
    {
      name: "Tools",
      link: "#tools",
    },
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "FAQ",
      link: "#faq",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <header 
        id="navbar-sticky" 
        className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-default-950/95 backdrop-blur-md border-b border-white/10 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-3">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img 
                src="/assets/images/logo1.png" 
                className='h-20 transition-all duration-300 hover:scale-105' 
                alt="Logo" 
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <ul className='flex space-x-6'>
                {menu.map((list, index) => (
                  <li key={index}>
                    <a 
                      className={`nav-link relative text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                        isScrolled ? 'text-white hover:text-primary' : 'text-white/90 hover:text-white'
                      }`}
                      href={list.link}
                    >
                      {list.name}
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-300 -translate-x-1/2 group-hover:w-3/4"></span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="ml-6">
                <NetworkSwitcher />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className='lg:hidden flex items-center space-x-4'>
              <NetworkSwitcher />
              
              <button 
                className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <LuX className="h-6 w-6" />
                ) : (
                  <LuMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="container mx-auto px-4 pb-4">
            <ul className='flex flex-col space-y-2'>
              {menu.map((list, index) => (
                <li key={index}>
                  <a 
                    className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    href={list.link}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {list.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
      
      {/* Content */}
      <div className="pt-20">
        {props.children}
      </div>
    </div>
  );
};

export default AppBar;