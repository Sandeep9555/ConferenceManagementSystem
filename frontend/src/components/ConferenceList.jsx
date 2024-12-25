import React, { useEffect, useState } from "react";
import api from "../api/api";
const ConferenceList = () => {
  const [conferences, setConferences] = useState([]);

  useEffect(() => {
    // Fetch conferences
    const fetchConferences = async () => {
      try {
        const response = await api.get("/users/conferencelist");
        setConferences(response.data);
      } catch (error) {
        console.error("Error fetching conferences:", error);
      }
    };
    fetchConferences();
  }, []);

  return (
    <div>
      <h2>Available Conferences</h2>
      {
        <ul>
          {conferences.map((conf) => (
            <li key={conf._id}>
              {conf.title} - {conf.date} - {conf.location}
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default ConferenceList;
