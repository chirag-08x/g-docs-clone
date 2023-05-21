import { HiSearch } from "react-icons/hi";
import { FaBars } from "react-icons/fa";
import { TbGridDots } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";

const Navbar = () => {
  const [hidebtn, setHideBtn] = useState(false);
  const { user, logout } = useAuth0();

  return (
    <nav className="py-2 shadow-md">
      <section className="grid grid-cols-2 md:grid-cols-[auto_1fr_auto] mx-auto justify-between w-[90vw] md:w-auto md:px-6  gap-x-48 items-center">
        <div className="flex items-center gap-x-2">
          <button className="text-xl">
            <FaBars />
          </button>
          <Link to={"/"} className="flex items-center">
            <img src="/images/Home/logo.png" className="w-14" alt="" />
            <h4 className="text-[1.35rem] font-light text-gray-primary">
              Docs
            </h4>
          </Link>
        </div>

        <form action="" className="hidden md:flex">
          <button
            type="button"
            className="text-xl pl-2 rounded-md rounded-r-none bg-white md:bg-gray-primary2 justify-self-end"
          >
            <HiSearch className="h-full" />
          </button>
          <input
            type="text"
            placeholder="Search"
            className="w-full h-10 rounded-md rounded-l-none px-4 bg-gray-primary2"
          />
        </form>

        <div className="flex items-center gap-x-4 justify-end">
          <button className="text-2xl text-gray-primary">
            <TbGridDots />
          </button>

          <button>
            <div onClick={() => setHideBtn(!hidebtn)}>
              <img src={user.picture} alt="" className="w-9 h-9 rounded-3xl" />
            </div>

            {hidebtn && (
              <div className="w-40 absolute z-10 p-2 right-0 shadow-gray-950">
                <button
                  onClick={() => {
                    logout();
                    localStorage.clear();
                  }}
                  className="bg-white w-full shadow-xl rounded-e-lg flex items-center justify-center gap-x-3"
                >
                  <VscSignOut /> Sign Out
                </button>
              </div>
            )}
          </button>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
