import React from "react";
import FacebookIcon from '../../assets/Icons/Facebook.svg';
import InstagramIcon from '../../assets/Icons/Instagram.svg';
import UbicacionIcon from '../../assets/Icons/Ubicacion.svg';
import WhatsappIcon from '../../assets/Icons/Whatsapp.svg';
import YoutubeIcon from '../../assets/Icons/Youtube.svg';
import i18n from '../../i18n';


const Footer = () => {
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };
  return (
    <footer className="bg-gray-100 ">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-[50%,25%,25%] gap-8">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">Sobre <span className="font-extrabold">WEGLON</span></h2>
          <p className="text-sm text-gray-700">
            En WEGLON contamos con un equipo profesional y capacitado para hacer de tu viaje y de tu proceso de certificación una experiencia inolvidable.
            <br />
            Contamos con un equipo de asesores expertos en educación internacional. Estamos comprometidos con la formación de líderes a nivel mundial para el desarrollo de nuestro país, introduciendo la cultura de otros países, fomentando el liderazgo y el trabajo en equipo mediante una perspectiva global.
          </p>
        </div>

        <div className="p-4 ml-4">
          <h2 className="text-lg font-bold mb-2">Sitios</h2>
          <ul className="space-y-1 text-sm text-gray-700">
            <li><a href="#" className="hover:underline">Programas</a></li>
            <li><a href="#" className="hover:underline">Certificaciones</a></li>
            <li><a href="#" className="hover:underline">Plataformas</a></li>
            <li><a href="#" className="hover:underline">Aviso de privacidad</a></li>
            <li className="group relative">
              <a href="#" key="idioma" className="text-gray-700 font-medium hover:text-blue-600">
                Idioma
              </a>
              <ul className="absolute bottom-full left-0 hidden group-hover:block bg-white shadow-lg rounded-lg z-10">
                <li>
                  <a
                    className="block px-4 py-2 whitespace-nowrap hover:bg-blue-100 text-gray-700 rounded-lg z-10"
                    onClick={() => changeLanguage('es')}
                  >
                    ES
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-2 whitespace-nowrap hover:bg-blue-100 text-gray-700 rounded-lg z-10"
                    onClick={() => changeLanguage('en')}
                  >
                    EN
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-2 whitespace-nowrap hover:bg-blue-100 text-gray-700 rounded-lg z-10"
                    onClick={() => changeLanguage('fr')}
                  >
                    FR
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>


        <div className="p-4  ml-4">
          <h2 className="text-lg font-bold mb-2">Contáctanos</h2>
          <p className="text-sm text-gray-700 mb-2">
            (777) 323 3890<br />
            <a href="mailto:wegn2013@gmail.com" className="underline hover:text-blue-500">wegn2013@gmail.com</a>
          </p>

          <div className="flex space-x-3 mt-8 bottom-0 align-items-end">
            <img className="w-8 h-8" src={WhatsappIcon} alt="Whatsapp"/>
            <img className="w-8 h-8" src={InstagramIcon} alt="Instagram"/>
            <img className="w-8 h-8" src={FacebookIcon} alt="Facebook"/>
            {/* <img className="w-8 h-8" src={UbicacionIcon} alt="Ubicacion"/> */}
            <img className="w-8 h-8" src={YoutubeIcon} alt="Youtube"/>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
