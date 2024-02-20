import React, { useEffect, useState } from "react";
import api from "../api";
import EventItem from "../components/EventItem";
import { BsPlusCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const EventsList = () => {
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
    <div>
      {" "}
      <div className="row pt-4 pb-3">
        <div className="col-6">
          <h2 className="text-primary">Liste des Événements</h2>
        </div>
        <div className="col-6 text-end">
          <Link to={"/create-event"} className="btn btn-primary">
            <BsPlusCircle /> Ajouter Un Événement
          </Link>
        </div>
      </div>
      <div className="w-full d-flex flex-wrap flex-row gap-3 justify-content-center">
        {eventsData.map((event) => (
          <EventItem
            key={event.eventId}
            eventId={event.eventId}
            nom={event.nom}
            jour={event.jour}
            temps={event.temps}
            categorie={event.categorie}
            description={event.description}
            lieu={event.lieu}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsList;
