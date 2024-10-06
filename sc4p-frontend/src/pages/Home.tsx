import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Home: React.FC = () => {
  const [fact, setFact] = useState<string>("");
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchFact = async () => {
      console.log("called");
      try {
        const token = await currentUser?.getIdToken();

        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        // below, the /api is replaced with the server url defined in vite.config.ts
        // so, if the server is defined as "localhost:3001" in that file,
        // the fetch url will be "localhost:3001/example"
        const res = await fetch("/api/example", payloadHeader);
        setFact(await res.text());
      } catch (err) {
        console.log(err);
      }
    };

    void fetchFact();
  }, [currentUser]);

  return (
    <div>
      <h2>Home Page</h2>
      <h3>Testing branch 3/</h3>
    </div>
  );
};

export default Home;
