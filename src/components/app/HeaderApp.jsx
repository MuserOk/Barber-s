import { use } from "react";
import BtnLogIn from "../header/BtnLogIn"
import Menu from "../header/Menu"
import { Link, useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Inicio", path: "/" },
  { label: "Sobre Nosotros", path: "/about" },
  { label: "Contáctos", scrollToId: "footer" },
];

export default function Header() {
  const navigate = useNavigate();


  return (
    <div className="bg-gray-950 text-white h-15 flex items-center justify-between px-4 py-2 min-w-[300px] lg:h-40 w-full m-auto">
      <div className="flex w-full md:order-1 md:justify-center  m-auto">
        < Menu />
        <div className="hidden md:flex gap-4 ">
          <ul className="flex space-x-4 text-white font-semibold ">
            {menuItems.map((item) => (
              <li className="hover:animate-pulse lg:text-xl" key={item.label}>
                {item.path ? (
                  <Link
                    to={item.path}
                    className=" text-white text-xs dark:text-white lg:text-2xl hover:bg-gray-600 transition duration-200 px-1 rounded"
                  >
                    {item.label}
                  </Link>
                ) : item.scrollToId ? (
                  <button
                    onClick={() => {
                      const el = document.getElementById(item.scrollToId);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-gray-900 dark:text-white text-xs lg:text-2xl hover:bg-gray-600 transition duration-200 px-1 rounded">
                    {item.label}
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full flex justify-center md:justify-start">
        <img className="inline-block md:order-0 w-12 h-12 lg:w-32 lg:h-32 rounded-full" src="https://static.vecteezy.com/system/resources/previews/022/782/342/non_2x/barber-shop-hair-style-silhouette-template-vector.jpg" alt="logo" />
      </div>
      <div className="cursor-pointer w-full text-white text-center flex justify-end md:order-2">
        <BtnLogIn />
      </div>
    </div>
  )
}
