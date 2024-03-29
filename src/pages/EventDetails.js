import React, { useState, useEffect } from "react";
import api from "../api";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginPage from "./LoginPage";
const EventDetails = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        console.log("token is empty=>user not authenticated");
        navigate("/login");
        return;
      }
      console.log("token is not empty=>get event by id");
      axios.defaults.headers.common["Authorization"] = token;

      try {
        setAuthenticated(true);
        const response = await api.get(`get-event-by-id/${id}`);
        setEventDetails(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setAuthenticated(false);
      }
    };

    fetchEventDetails();
  }, [id, navigate]);
  if (!authenticated) {
    return <LoginPage />;
  }
  if (!eventDetails) {
    return <div>Loading event details...</div>;
  }

  return (
    <div className="card shadow border-0 mt-4 mb-4">
      <div className="card-header bg-secondary bg-gradient  py-4">
        <div className="row">
          <div className="col-12 text-center">
            <h3 className=" text-uppercase">{eventDetails.name}</h3>
          </div>
        </div>
      </div>
      <div className="card-body ">
        <div className="py-3 d-flex flex-column align-items-center">
          <p className="text-dark text-left">{eventDetails.description}</p>
          <table className="table table-hover" style={{ maxWidth: " 40rem" }}>
            <thead>
              <tr>
                <th scope="col">startDate</th>
                <th scope="col">startTime</th>
                <th scope="col">Lieu</th>
                <th scope="col">Categorie</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-danger fw-bold">
                  {eventDetails.startDate}
                </td>
                <td className="text-danger fw-bold">
                  {eventDetails.startTime}
                </td>
                <td className="text-danger fw-bold">{eventDetails.location}</td>
                <td className="text-danger fw-bold">{eventDetails.category}</td>
              </tr>
            </tbody>
          </table>

          <div className="list-group">
            <ul>
              <li className="list-group-item list-group-item-action active">
                Liste des participants
              </li>

              <li className="list-group-item list-group-item-action">
                participants
              </li>

              <li className="list-group-item list-group-item-action">
                Aucun participant pour l'instant
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col-6 pb-1">
              <Link to={`/`} className="btn btn-outline-primary">
                Retour
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
