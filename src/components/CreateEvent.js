import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./api";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    jour: "",
    temps: "",
    lieu: "",
    categorie: "",
  });
  const [errors, setErrors] = useState({});

  const handleAddEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("create-event", formData);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        console.log("Error response from server:", error.response.data.errors);
      } else {
        console.error("Error creating event:", error);
      }
    }
  };

  // Event handler to update state as the user types
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleAddEvent}>
      <div className=" mt-4">
        <div className="row pb-2">
          <h2 className="tet-primary">Ajouter un nouvel événement</h2>
          <hr />
        </div>
      </div>
      {Object.keys(formData).map((field) => (
        <div className="form-group mb-3 row">
          <label className="control-label">{field}</label>
          <input
            id={field}
            type="text"
            value={formData[field]}
            onChange={handleInputChange}
            className={`form-control ${errors[field] ? "is-invalid" : ""}`}
          />
          {errors[field] && (
            <div className="invalid-feedback">
              <ul>
                {errors[field].map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      <div className="row">
        <div className="form-group col-6 col-md-3">
          <input
            type="submit"
            value="Ajouter"
            className="btn btn-primary form-control"
          />
        </div>
        <div className="col-6 col-md-3">
          <Link to={`/`} className="btn btn-outline-secondary form-control">
            Annuler
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CreateEvent;
