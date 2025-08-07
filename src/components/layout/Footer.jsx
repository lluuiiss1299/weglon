import React from "react";
import { useTranslation } from 'react-i18next';
import FacebookIcon from '../../assets/Icons/Facebook.svg';
import InstagramIcon from '../../assets/Icons/Instagram.svg';
import UbicacionIcon from '../../assets/Icons/Ubicacion.svg';
import WhatsappIcon from '../../assets/Icons/Whatsapp.svg';
import YoutubeIcon from '../../assets/Icons/Youtube.svg';
import i18n from '../../i18n';


const Footer = () => {
  const { t } = useTranslation();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };
  return (
    <footer className="bg-gray-100 ">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-[50%,25%,25%] gap-8">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">{t('footer.aboutTitle')} <span className="font-extrabold">WEGLON</span></h2>
          <p className="text-sm text-gray-700">
            {t('footer.aboutText1')}
            <br />
            {t('footer.aboutText2')}
          </p>
        </div>

        <div className="p-4 ml-4">
          <h2 className="text-lg font-bold mb-2">{t('footer.sitesTitle')}</h2>
          <ul className="space-y-1 text-sm text-gray-700">
            <li><a href="/programas" className="hover:underline">{t('navbar.programs')}</a></li>
            <li><a href="/certificaciones/ingles-online" className="hover:underline">{t('navbar.certifications')}</a></li>
            <li><a href="/plataformas/cursos" className="hover:underline">{t('navbar.platforms')}</a></li>
            <li><a href="/privacidad" className="hover:underline">{t('footer.privacy')}</a></li>
            <li className="group relative">
              <a href="#" key="idioma" className="text-gray-700 font-medium hover:text-blue-600">
                {t('footer.language')}
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
          <h2 className="text-lg font-bold mb-2">{t('footer.contactTitle')}</h2>
          <p className="text-sm text-gray-700 mb-2">
            {t('footer.phone')}<br />
            <a href="mailto:wegn2013@gmail.com" className="underline hover:text-blue-500">wegn2013@gmail.com</a>
          </p>

          <div className="flex space-x-3 mt-8 bottom-0 align-items-end">
            <a href="https://wa.me/5217773701746" target="_blank" rel="noopener noreferrer"><img className="w-8 h-8" src={WhatsappIcon} alt="Whatsapp"/></a>  
            <a href="https://www.instagram.com/weglon.experience?igsh=MWJyN3E3Y3pubWd6eg==" target="_blank" rel="noopener noreferrer"> <img className="w-8 h-8" src={InstagramIcon} alt="Instagram"/></a>
            <a href="https://www.facebook.com/share/1HuH7hsfrr/" target="_blank" rel="noopener noreferrer"><img className="w-8 h-8" src={FacebookIcon} alt="Facebook"/></a>
            {/* <img className="w-8 h-8" src={UbicacionIcon} alt="Ubicacion"/> */}
            <a href="https://youtube.com/@weglon.experience?si=2qtbKUEC-8zSAO4T" target="_blank" rel="noopener noreferrer"><img className="w-8 h-8" src={YoutubeIcon} alt="Youtube"/></a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
