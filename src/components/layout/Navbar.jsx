import React from "react";
import { useTranslation } from 'react-i18next';
import LogoIcon from '../../assets/Icons/LogoAzul.svg';
import WeglonIcon from '../../assets/Icons/LetraWeglon2.svg';

const Navbar = () => {
  const { t } = useTranslation();
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
    <nav className="bg-white shadow-md ">
      <div className="mx-auto max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">
        <a href="/" className="text-xl font-bold homeLabel flex items-center align-items-center"><img className="w-md h-6 mr-2" src={LogoIcon} alt="Weglon Logo"/> <img className="w-16 mt-1" src={WeglonIcon} alt="Weglon Logo"/></a>
        <ul className="flex space-x-6">
          {menuItems.map((item, idx) =>
            item.submenu ? (
              <li key={idx} className="group relative">
                <a href={item.link} className="text-gray-700 font-medium hover:text-blue-600">
                  {item.label}
                </a>
                <ul className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg z-10">
                  {item.submenu.map((subItem, subIdx) => (
                    <li key={subIdx}>
                      <a
                        href={item.submenuLink[subIdx]}
                        target={item.label.includes("Anglolinguist") ? "_blank" : "_self"}
                        className="block px-4 py-2 whitespace-nowrap hover:bg-blue-100 text-gray-700  rounded-lg z-10"
                      >
                        {subItem}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={idx}>
                <a
                  href={item.link}
                  className="text-gray-700 font-medium hover:text-blue-600"
                >
                  {item.label}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;