import React from "react";

const Navbar = () => {
  const menuItems = [
    {
      label: "Programas",
      submenu: ["Nasa", "Canadá", "Tokio"],
    },
    {
      label: "Certificaciones",
      submenu: ["Certificación inglés online", "Conviértete en centro certificador"],
    },
    {
      label: "Plataformas",
      submenu: ["Anglolinguist", "Cursos"],
    },
    {
      label: "Contáctanos",
      link: "#contacto",
    },
  ];

  return (
    <nav className="bg-white shadow-md ">
      <div className="mx-auto max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">🌎 Weglon</div>
        <ul className="flex space-x-6">
          {menuItems.map((item, idx) =>
            item.submenu ? (
              <li key={idx} className="group relative">
                <button className="text-gray-700 font-medium hover:text-blue-600">
                  {item.label}
                </button>
                <ul className="absolute hidden group-hover:block bg-white shadow-lg mt-2 rounded-lg z-10">
                  {item.submenu.map((subItem, subIdx) => (
                    <li key={subIdx}>
                      <a
                        href="#"
                        className="block px-4 py-2 whitespace-nowrap hover:bg-blue-100 text-gray-700"
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