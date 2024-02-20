import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";

const DeleteEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    jour: "",
    temps: "",
    lieu: "",
    categorie: "",
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`get-event-by-id/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleDeleteEvent = async (e) => {
    try {
      const response = await api.delete(`delete-event/${id}`);
      //console.log("API response:", response);
      navigate("/");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <h2>Delete Event</h2>
      {formData && (
        <div>
          <p>Are you sure you want to delete the event "{formData.nom}"?</p>
          <button onClick={handleDeleteEvent} className="btn btn-danger">
            Delete
          </button>
          <Link to="/" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      )}
    </div>
  );
};

export default DeleteEvent;
