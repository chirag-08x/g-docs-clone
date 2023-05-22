import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { GrFormClose } from "react-icons/gr";

const DocList = ({ name, _id }) => {
  const [bubble, setBubble] = useState(false);

  return (
    <>
      <Link
        to={`/document/${_id}`}
        className="border-gray-secondary2 border-[1.5px] rounded-md hover:border-blue-primary hover:border-[1px]"
      >
        <div className="h-52 md:h-40 xl:h-64 grid place-items-center">
          <img src="/images/Home/logo.png" className="w-28 md:w-32" alt="" />
        </div>
        <div className="flex justify-between px-3 py-4 border-gray-primary2 border-t-[1.5px] relative">
          <div className="flex items-center gap-x-2">
            <img src="/images/doc-logo.png" className="w-5 h-5" alt="" />
            <p className="text-sm">{name}</p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setBubble(!bubble);
            }}
          >
            <HiOutlineDotsVertical />
          </button>
          {bubble && (
            <div
              className="absolute bottom-[-100%] z-10 left-[50%] bg-white shadow-2xl rounded-md grid gap-y-4 content-center w-full p-4"
              onClick={(e) => e.preventDefault()}
            >
              <button
                className="flex items-center gap-x-3 text-lg"
                onClick={() => {
                  setBubble(false);
                }}
              >
                <FaEdit /> Rename
              </button>
              <button
                className="flex items-center gap-x-3 text-lg"
                onClick={() => {
                  setBubble(false);
                }}
              >
                <FaTrashAlt />
                Remove
              </button>
              <button
                className="absolute right-1 top-1 bg-gray-secondary2 text-xl rounded-2xl"
                onClick={(e) => {
                  setBubble(false);
                }}
              >
                <GrFormClose />
              </button>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default DocList;
