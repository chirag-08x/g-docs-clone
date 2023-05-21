import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { FaRegStar, FaRegFolder } from "react-icons/fa";
import { IoCloudDoneOutline } from "react-icons/io5";
import { navOptions } from "../../utils/helper";
import { useAuth0 } from "@auth0/auth0-react";
import { VscSignOut } from "react-icons/vsc";
import { Link } from "react-router-dom";
import axios from "axios";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["image", "blockquote", "code-block"][({ color: [] }, { background: [] })], // dropdown with defaults from theme
  [{ font: [] }],
  [
    { align: "" },
    { align: "center" },
    { align: "right" },
    { align: "justify" },
  ],
  ["clean"],
];

const Editor = () => {
  const containerRef = useRef(null);
  const { user, logout } = useAuth0();
  const [hidebtn, setHideBtn] = useState(false);
  const [doc, setDoc] = useState({});
  const [quill, setQuill] = useState(null);
  const id = new URL(window.location.href).pathname.split("/").pop();

  const getDoc = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/v1/docs/${user.email}/${id}`;
    try {
      const { data } = await axios.get(url);
      setDoc({ ...data.doc.docs[0] });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoc();
  }, []);

  useEffect(() => {
    if (!quill) {
      const newQuill = new Quill("#container", {
        theme: "snow",
        modules: { toolbar: toolbarOptions },
      });
      setQuill(newQuill);
    }
  }, [quill]);

  useEffect(() => {
    if (quill && Object.keys(doc).length !== 0) {
      if (doc.content) {
        quill.setContents(JSON.parse(doc.content));
      }
    }
  }, [quill, doc]);

  useEffect(() => {
    if (!quill) return;

    const handler = async () => {
      try {
        const delta = quill.getContents();
        await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/v1/docs`, {
          email: user.email,
          id,
          content: JSON.stringify(delta),
        });
      } catch (error) {
        console.log(error);
      }
    };

    quill.on("text-change", handler);

    return () => quill.off("text-change", handler);
  }, [quill]);

  return (
    <section>
      <nav className="flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link to={"/document"}>
            <img src="/images/Home/logo.png" className="w-16" alt="" />
          </Link>
          <div>
            <div className="flex items-center gap-x-2">
              <input
                type="text"
                value={doc.name}
                className="min-w-[5rem] px-1 capitalize"
              />
              <FaRegStar />
              <FaRegFolder />
              <IoCloudDoneOutline />
            </div>
            <ul className="flex gap-x-3 capitalize text-sm">
              {navOptions.map(({ id, name }) => {
                return (
                  <li key={id} className="cursor-pointer">
                    {name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="relative">
          <button onClick={() => setHideBtn(!hidebtn)}>
            <img src={user.picture} className="w-9 rounded-3xl" alt="" />
          </button>
          {hidebtn && (
            <div className="w-40 absolute z-10 bottom-[-1.7rem] p-2 right-0 shadow-gray-950">
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
        </div>
      </nav>
      <div id="container" ref={containerRef}></div>
    </section>
  );
};

export default Editor;

// useEffect(() => {
//   if (!containerRef) return;

//   if (!editorExists) {
//     new Quill("#container", {
//       theme: "snow",
//       modules: { toolbar: toolbarOptions },
//     });
//     setEditorExists(true);
//   }
// }, [containerRef]);
