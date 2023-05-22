import { useState } from "react";

const Modal = ({ type, name }) => {
  const [value, setValue] = useState(name);

  return (
    <div className="absolute top-0 right-0 h-full left-0 grid place-items-center bottom-0 bg-black/50">
      <aside className="bg-white w-[90vw] max-w-md p-6 rounded-lg">
        {type === "rename" ? (
          <>
            <p className="text-xl font-normal text-gray-600 mb-4">Rename</p>
            <p className="text-gray-primary mb-4">
              Please enter a new name for the item :
            </p>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border-gray-300 border-[1px] w-full rounded-md px-2 py-1 mb-8"
            />
            <div className="flex justify-end gap-x-4">
              <button className="border-[1px] border-gray-300 px-6 py-2 rounded-md">
                Cancel
              </button>
              <button className="border-[1px] border-gray-300 px-6 py-2 rounded-md text-white bg-blue-primary">
                OK
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-xl font-normal text-gray-600 mb-4">
              Move to Trash ?
            </p>
            <p className="text-gray-primary mb-4">
              "{name}" will be permanently deleted.
            </p>
            <div className="flex justify-end gap-x-4">
              <button className="border-[1px] border-gray-300 px-6 py-2 rounded-md">
                Cancel
              </button>
              <button className="border-[1px] border-gray-300 px-6 py-2 rounded-md text-white bg-blue-primary">
                MOVE TO TRASH
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default Modal;
