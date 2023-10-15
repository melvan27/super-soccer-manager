import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateCoach from "../components/CreateCoach";
import Dashboard from "../components/Dashboard";

const Home = () => {
  // check if the user has a coach. If they do, show the normal home page (set hasCoach to true). If they don't, show the create coach page (set hasCoach to false)
  const [hasCoach, setHasCoach] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:8000/api/user/numberOfCoaches", {withCredentials: true})
      .then((res) => {
        console.log(res.data);
        if (res.data > 0) {
          setHasCoach(true);
        } else {
          setHasCoach(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {hasCoach ? <Dashboard /> : <CreateCoach />}
    </>
  );
};

export default Home;
