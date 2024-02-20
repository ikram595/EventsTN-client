import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../components/api";

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
    //print client-side errors
    if (!validateInputs()) {
      return;
    }

    try {
      const response = await api.post("create-event", formData);
      console.log("API response:", response);
      navigate("/");
    } catch (error) {
      console.error("Error creating event:", error);
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        console.log("Error response from server:", error.response.data.errors);
      } else {
        console.error("Error creating event:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  //client-side inputs validation
  const validateInputs = () => {
    let newErrors = {};
    //nom validation
    if (formData.nom === "") {
      newErrors.nom = "Ce champ est obligatoire";
    }
    if (formData.nom.length < 3 || formData.nom.length > 100) {
      newErrors.nom = "Le nom doit être entre 3 et 100 caractères";
    }
    //description validation
    if (formData.description === "") {
      newErrors.description = "Ce champ est obligatoire";
    }
    if (formData.description.length < 10 || formData.description.length > 500) {
      newErrors.description =
        "Champ doit être de longueur comprise entre 10 et 500 caractères";
    }
    //date validation
    if (formData.jour === "") {
      newErrors.jour = "Ce champ est obligatoire";
    }
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(formData.jour)) {
      newErrors.jour =
        "Format de date non valide. Utilisez le format jj/mm/aaaa.";
    }
    //temps validation
    if (formData.temps === "") {
      newErrors.temps = "Ce champ est obligatoire";
    }
    const tempsRegex = /^\d{2}:\d{2}$/;
    if (!tempsRegex.test(formData.temps)) {
      newErrors.temps = "Format d'heure non valide. Utilisez le format HH:mm.";
    }
    //lieu validation
    if (formData.lieu === "") {
      newErrors.lieu = "Ce champ est obligatoire";
    }

    if (formData.lieu.length < 3 || formData.lieu.length > 100) {
      newErrors.lieu = "Lieu doit être entre 3 et 100 caractères";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
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
            <div>
              <ul>
                {Array.isArray(errors[field]) ? (
                  errors[field].map((error, index) => (
                    <li key={index}>{error}</li>
                  ))
                ) : (
                  <li className="text-danger">{errors[field]}</li>
                )}
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
