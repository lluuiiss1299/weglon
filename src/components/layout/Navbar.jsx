import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import LogoIcon from '../../assets/Icons/LogoAzul.svg';
import WeglonIcon from '../../assets/Icons/LetraWeglon2.svg';

const Navbar = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileIndex, setOpenMobileIndex] = useState(null);

  const toggleMobileSubmenu = (index) => {
    setOpenMobileIndex((prev) => (prev === index ? null : index));
  };

  const menuItems = [
    {
      label: t('navbar.programs'),
      submenu: [
        t('navbar.submenu.nasa'),
        t('navbar.submenu.canada'),
        t('navbar.submenu.tokyo')
      ],
      link: "/Programas",
      submenuLink: ["/Programas/Nasa", "/Programas/Canada", "/Programas/Tokio"],
    },
    {
      label: t('navbar.certifications'),
      submenu: [
        t('navbar.submenu.english_cert'),
        t('navbar.submenu.become_center')
      ],
      link: "",
      submenuLink: ["/certificaciones/ingles-online", "/certificaciones/centro-certificador"],
    },
    {
      label: t('navbar.platforms'),
      submenu: [
        t('navbar.submenu.anglolinguist'),
        t('navbar.submenu.courses')
      ],
      link: "",
      submenuLink: ["https://anglolinguist.com/", "/plataformas/cursos"],
    },
    {
      label: t('navbar.contact'),
      link: "/contacto",
    },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 py-2">
        {/* Top bar: logo centered on mobile, hamburger on the right; horizontal menu on desktop */}
        <div className="grid grid-cols-3 items-center sm:flex sm:justify-between">
          {/* Centered logo on mobile, left-aligned on desktop */}
          <a
            href="/"
            className="col-start-2 justify-self-center sm:col-auto sm:justify-self-start text-xl font-bold homeLabel flex items-center"
          >
            <img className="h-6 mr-2" src={LogoIcon} alt="Weglon Logo" />
            <img className="w-20 mt-1" src={WeglonIcon} alt="Weglon Logo" />
          </a>

          {/* Hamburger button (mobile only) */}
          <button
            type="button"
            aria-label="Toggle menu"
            className="justify-self-end sm:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">Open main menu</span>
            <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
          </button>

          {/* Desktop menu */}
          <ul className="hidden sm:flex space-x-6 ml-auto">
            {menuItems.map((item, idx) =>
              item.submenu ? (
                <li key={idx} className="group relative">
                  <a href={item.link} className="text-gray-700 font-medium hover:text-blue-600">
                    {item.label}
                  </a>
                  <ul className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg z-10 pt-2">
                    {item.submenu.map((subItem, subIdx) => (
                      <li key={subIdx}>
                        <a
                          href={item.submenuLink[subIdx]}
                          target={item.submenuLink[subIdx]?.startsWith('http') ? "_blank" : "_self"}
                          rel={item.submenuLink[subIdx]?.startsWith('http') ? "noopener noreferrer" : undefined}
                          className="block px-4 py-2 whitespace-nowrap hover:bg-blue-100 text-gray-700 rounded-lg z-10"
                        >
                          {subItem}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={idx}>
                  <a href={item.link} className="text-gray-700 font-medium hover:text-blue-600">
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Mobile dropdown menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden mt-3 border-t border-gray-200 pt-3`}>
          {menuItems.map((item, idx) =>
            item.submenu ? (
              <div key={idx} className="mb-2">
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu(idx)}
                  className="w-full flex items-center justify-between py-2 text-left text-gray-700 font-medium hover:text-blue-600"
                >
                  <span>{item.label}</span>
                  <span className={`transform transition-transform ${openMobileIndex === idx ? 'rotate-90' : ''}`}>›</span>
                </button>
                <div className={`${openMobileIndex === idx ? 'block' : 'hidden'} pl-4`}>
                  {item.submenu.map((subItem, subIdx) => (
                    <a
                      key={subIdx}
                      href={item.submenuLink[subIdx]}
                      target={item.submenuLink[subIdx]?.startsWith('http') ? "_blank" : "_self"}
                      rel={item.submenuLink[subIdx]?.startsWith('http') ? "noopener noreferrer" : undefined}
                      className="block py-2 text-gray-700 hover:text-blue-600"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={idx} href={item.link} className="block py-2 text-gray-700 font-medium hover:text-blue-600">
                {item.label}
              </a>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;