import "./App.css";
import React, { useEffect, useState } from "react";
import api from "./components/api";
import "bootswatch/dist/lux/bootstrap.min.css";
import EventsList from "./components/EventsList";
import EventDetails from "./components/EventDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateEvent from "./pages/CreateEvent";

function App() {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("get-all-events");
        setEventsData(response.data);
        //console.log(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  if (!eventsData) {
    return <div>Loading...</div>;
  }

  if (eventsData.length === 0) {
    return <div>No events found.</div>;
  }

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<EventsList />} />
          <Route path="/event-details/:id" element={<EventDetails />} />
          <Route path="/create-event" element={<CreateEvent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
