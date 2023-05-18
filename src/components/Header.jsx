import MenuItem from "./MenuItem";
import { AiFillHome } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Link from "next/link";
// import { useLocatin } from "react-router-dom";

export default function Header() {
  // const location = useLocation();
  // console.log(location);
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="flex justify-between mx-2 max-w-6xl sm:mx-auto items-center py-6">
        <div className="">
          <Link href="/">
            <h2 className="text-2xl">
              <span className="font-bold bg-amber-500 py-1 px-2 rounded-lg mr-1">
                IMBd
              </span>
              <span className="text-xl hidden sm:inline">Clone</span>
            </h2>
          </Link>
        </div>
        <div className="flex">
          <MenuItem title="HOME" address="/" Icon={AiFillHome} />
          <MenuItem
            title="ABOUT"
            address="/about"
            Icon={BsFillInfoCircleFill}
          />
          <MenuItem
            title="SIGN IN"
            address="/signin"
            Icon={BsFillInfoCircleFill}
          />
        </div>
      </div>
    </div>
  );
}
