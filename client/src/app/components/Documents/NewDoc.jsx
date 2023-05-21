import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const NewDoc = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();

  const createNewDocument = async () => {
    try {
      const URL = `${process.env.REACT_APP_BASE_URL}/api/v1/docs/new`;
      const { data } = await axios.post(URL, {
        email: user.email,
      });
      navigate(`/document/${data.doc[0]._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-gray-primary2 py-5">
      <section className="section-center">
        <div className="mb-4 font-light">
          <p>Start a new Document</p>
        </div>

        <div>
          <button onClick={createNewDocument}>
            <img src="/images/Home/newDoc.png" className="w-36" alt="" />
          </button>
          <p className="mt-3 text-md">Blank</p>
        </div>
      </section>
    </section>
  );
};

export default NewDoc;
