import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";

const EditEvent = () => {
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

  const handleEditEvent = async (e) => {
    e.preventDefault();
    //render client-side errors
    if (!validateInputs()) {
      return;
    }
    try {
      const response = await api.put(`edit-event/${id}`, formData);
      //console.log("API response:", response);
      navigate("/");
    } catch (error) {
      console.error("Error editing event:", error);
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        console.log("Error response from server:", error.response.data.errors);
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
    <form onSubmit={handleEditEvent} className="card border-0 mt-4 mb-4">
      <div className=" mt-4">
        <div className="row pb-2">
          <h2 className="text-primary">Modifier un événement</h2>
          <hr />
        </div>
      </div>
      {Object.keys(formData)
        .filter((field) => field !== "eventId") //exclude 'eventId'
        .map((field) => (
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
            value="Sauvgarder"
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

export default EditEvent;
