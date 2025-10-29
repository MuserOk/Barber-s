import BtnLogIn from "../header/BtnLogIn"
import Menu from "../header/menu"


export default function Header() {
  return (
    <div className="bg-gray-950 text-white h-15 flex items-center justify-between px-4 py-2 min-w-[300px] lg:h-25 w-full max-w-200 m-auto">
      < Menu />
      <div className="w-full">
        <img className="w-12 h-12 rounded-full" src="https://static.vecteezy.com/system/resources/previews/022/782/342/non_2x/barber-shop-hair-style-silhouette-template-vector.jpg" alt="logo" />
      </div>
      <BtnLogIn />
    </div>
  )
}
