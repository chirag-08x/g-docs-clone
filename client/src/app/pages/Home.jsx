import { FcGoogle } from "react-icons/fc";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loginWithRedirect, isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/document");
    }
  }, [isLoading]);

  return (
    <main className="">
      <section className="section-center grid gap-y-3 place-content-center h-screen">
        <img
          src="/images/home/logo.png"
          className="w-24 justify-self-center"
          alt=""
        />
        <button
          className="flex items-center bg-[#4285F1] text-white px-2 py-1 rounded-md gap-x-6"
          onClick={loginWithRedirect}
        >
          <div className="bg-white rounded-sm">
            <FcGoogle className="text-4xl" />
          </div>
          Login with Google
        </button>
      </section>
    </main>
  );
};

export default Home;
