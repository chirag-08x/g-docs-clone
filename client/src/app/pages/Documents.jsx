import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navbar, NewDoc, RecentDoc, Modal } from "../components";
import axios from "axios";

const Home = () => {
  const { user } = useAuth0();

  const addNewUserToDB = async () => {
    const URL = `${process.env.REACT_APP_BASE_URL}/api/v1/users`;
    try {
      await axios.post(URL, {
        firstName: user.given_name,
        lastName: user.family_name,
        email: user.email,
      });
      localStorage.setItem("user", JSON.stringify({ isLoggedIn: true }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("user"));
    if (isLoggedIn && isLoggedIn["isLoggedIn"]) return;

    addNewUserToDB();
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <NewDoc />
      <RecentDoc />
    </div>
  );
};

export default Home;
