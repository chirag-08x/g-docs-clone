import { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import DocList from "./DocList";

const RecentDoc = () => {
  const [recentDocs, setRecentDocs] = useState([]);
  const { user } = useAuth0();

  const getAllDocuments = async () => {
    const URL = `${process.env.REACT_APP_BASE_URL}/api/v1/docs/${user.email}`;
    try {
      const { data } = await axios.get(URL);
      setRecentDocs(data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDocuments();
  }, []);

  return (
    <section className="py-4">
      <section className="section-center">
        <div>
          <h3 className="text-base font-medium">Recent documents</h3>
        </div>
        <div className="mt-6">
          {recentDocs.length > 0 ? (
            <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
              {recentDocs.map((info) => {
                // return (
                //   <Link
                //     to={`/document/${_id}`}
                //     key={_id}
                //     className="border-gray-secondary2 border-[1.5px] rounded-md hover:border-blue-primary hover:border-[1px]"
                //   >
                //     <div className="h-52 md:h-40 xl:h-64 grid place-items-center">
                //       <img
                //         src="/images/Home/logo.png"
                //         className="w-28 md:w-32"
                //         alt=""
                //       />
                //     </div>
                //     <div className="flex justify-between px-3 py-4 border-gray-primary2 border-t-[1.5px] relative">
                //       <div className="flex items-center gap-x-2">
                //         <img
                //           src="/images/doc-logo.png"
                //           className="w-5 h-5"
                //           alt=""
                //         />
                //         <p className="text-sm">{name}</p>
                //       </div>
                //       <button onClick={handleClick}>
                //         <HiOutlineDotsVertical />
                //       </button>
                //       <div className="absolute bottom-[-100%] z-10 left-[50%] bg-white shadow-xl rounded-md grid gap-y-4 content-center w-full p-4">
                //         <button className="flex items-center gap-x-3 text-lg">
                //           <FaEdit /> Rename
                //         </button>
                //         <button className="flex items-center gap-x-3 text-lg">
                //           <FaTrashAlt />
                //           Remove
                //         </button>
                //       </div>
                //     </div>
                //   </Link>
                // );
                return <DocList key={info._id} {...info} />;
              })}
            </div>
          ) : (
            <p className="text-center">No recent Documents</p>
          )}
        </div>
      </section>
    </section>
  );
};

export default RecentDoc;
