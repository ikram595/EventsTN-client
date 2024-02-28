import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    limit: "",
    imgUrl: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    type: "",
    status: "Drafted",
    category: "",
    properties: "",
  });
  const [errors, setErrors] = useState({});

  const handleAddEvent = async (e) => {
    e.preventDefault();
    //render client-side errors
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
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  //client-side inputs validation
  const validateInputs = () => {
    let newErrors = {};
    //name validation

    if (
      formData.name === "" ||
      formData.name.length < 3 ||
      formData.name.length > 100
    ) {
      newErrors.name = "Ce champ est obligatoire";
      newErrors.name = "Le nom doit être entre 3 et 100 caractères";
    }
    //description validation
    if (
      formData.description === "" ||
      formData.description.length < 10 ||
      formData.description.length > 500
    ) {
      newErrors.description =
        "Champ doit être de longueur comprise entre 10 et 500 caractères";
    } //limit validation
    if (formData.limit > 10000) {
      newErrors.limit = "limit doit être <10000";
    }
    //imgurl validation
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
    if (formData.imgUrl === "" || !urlPattern.test(formData.imgUrl)) {
      newErrors.imgUrl = "Ce champ est obligatoire";
      newErrors.imgUrl = "URL non valide. Utilisez un autre URL";
    }
    //date validation
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (formData.startDate === "" || !dateRegex.test(formData.startDate)) {
      newErrors.startDate = "Ce champ est obligatoire";
      newErrors.startDate =
        "Format de date non valide. Utilisez le format jj/mm/aaaa.";
    }
    //temps validation
    const startTimeRegex = /^\d{2}:\d{2}$/;
    if (formData.startTime === "" || !startTimeRegex.test(formData.startTime)) {
      newErrors.startTime = "Ce champ est obligatoire";
      newErrors.startTime =
        "Format d'heure non valide. Utilisez le format HH:mm.";
    }
    //date validation
    const endDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (formData.endDate === "" || !endDateRegex.test(formData.endDate)) {
      newErrors.endDate = "Ce champ est obligatoire";
      newErrors.endDate =
        "Format de date non valide. Utilisez le format jj/mm/aaaa.";
    }
    //temps validation
    const endTimeRegex = /^\d{2}:\d{2}$/;
    if (formData.endTime === "" || !endTimeRegex.test(formData.endTime)) {
      newErrors.endTime = "Ce champ est obligatoire";
      newErrors.endTime =
        "Format d'heure non valide. Utilisez le format HH:mm.";
    }
    //location validation
    if (
      formData.location === "" ||
      formData.location.length < 3 ||
      formData.location.length > 100
    ) {
      newErrors.location = "location doit être entre 3 et 100 caractères";
    }
    // type validation
    if (!formData.type) {
      newErrors.type = "Choisissez un type d'événement.";
    }
    // category validation
    if (!formData.category) {
      newErrors.category = "Choisissez une catégorie d'événement.";
    }
    // status validation
    if (!formData.status) {
      newErrors.status = "Choisissez un statut d'événement.";
    }
    // properties validation
    if (!formData.properties) {
      newErrors.properties = "Choisissez  une propriété d'événement.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <form
      onSubmit={handleAddEvent}
      className="col-6 d-flex flex-column mx-auto"
    >
      <div className="row pt-4 pb-3">
        <h2 className="text-primary">Ajouter un nouvel événement</h2>
        <hr />
      </div>
      <div className="form-group ">
        <label className="form-label">name</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          className="form-control"
        />
        {errors.name && <p className="form-text text-danger">{errors.name}</p>}
      </div>
      <div className="form-group  ">
        <label className="form-label">description</label>
        <textarea
          name="description"
          type="text"
          value={formData.description}
          onChange={handleInputChange}
          className="form-control"
          rows="3"
          style={{ height: "93px" }}
        />
        {errors.description && (
          <p className="form-text text-danger">{errors.description}</p>
        )}
      </div>
      <div className="row">
        {" "}
        <div className="form-group col">
          <label className="form-label">startDate</label>
          <input
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleInputChange}
            className="form-control"
          />
          {errors.startDate && (
            <p className="form-text text-danger">{errors.startDate}</p>
          )}
        </div>
        <div className="form-group  col ">
          <label className="form-label">endDate</label>
          <input
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleInputChange}
            className="form-control"
          />
          {errors.endDate && (
            <p className="form-text text-danger">{errors.endDate}</p>
          )}
        </div>
      </div>
      <div className="row">
        {" "}
        <div className="form-group col ">
          <label className="form-label">startTime</label>
          <input
            name="startTime"
            type="time"
            value={formData.startTime}
            onChange={handleInputChange}
            className="form-control"
          />
          {errors.startTime && (
            <p className="form-text text-danger">{errors.startTime}</p>
          )}
        </div>
        <div className="form-group col ">
          <label className="form-label">endTime</label>
          <input
            name="endTime"
            type="time"
            value={formData.endTime}
            onChange={handleInputChange}
            className="form-control"
          />
          {errors.endTime && (
            <p className="form-text text-danger">{errors.endTime}</p>
          )}
        </div>
      </div>
      <div className="form-group  ">
        <label className="form-label">location</label>
        <input
          name="location"
          type="text"
          value={formData.location}
          onChange={handleInputChange}
          className="form-control"
        />
        {errors.location && (
          <p className="form-text text-danger">{errors.location}</p>
        )}
      </div>

      <div className="form-group mt-4">
        <label className="form-check">
          {" "}
          In Person
          <input
            name="inperson"
            type="radio"
            value="In Person"
            checked={formData.type === "InPerson"}
            onChange={handleInputChange}
            className="form-check-input"
          />
        </label>
        <label className="form-check">
          Online
          <input
            type="radio"
            name="online"
            value="Online"
            checked={formData.type === "Online"}
            onChange={handleInputChange}
            className="form-check-input"
          />
        </label>

        {errors.type && <p className="form-text text-danger">{errors.type}</p>}
      </div>
      <div className="form-group  ">
        <label className="form-label">limit</label>
        <input
          name="limit"
          type="text"
          value={formData.limit}
          onChange={handleInputChange}
          className="form-control"
        />
        {errors.limit && (
          <p className="form-text text-danger">{errors.limit}</p>
        )}
      </div>

      <div className="row">
        {" "}
        <div className="form-group col">
          <label className="form-label">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="Education">Education</option>
            <option value="SocialImpact">Social Impact</option>
            <option value="Tech">Tech</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <p className="form-text text-danger">{errors.category}</p>
          )}
        </div>
        <div className="form-group col">
          <label className="form-label">Properties:</label>
          <select
            name="properties"
            value={formData.properties}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="Training">Training</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Workshop">Workshop</option>
            <option value="Conference">Conference</option>
            <option value="Meetup">Meetup</option>
            <option value="Seminar">Seminar</option>
            <option value="Talk">Talk</option>
          </select>
          {errors.properties && (
            <p className="form-text text-danger">{errors.properties}</p>
          )}
        </div>
      </div>
      <div className="form-group  ">
        <label className="form-label">imgUrl</label>
        <input
          name="imgUrl"
          type="text"
          value={formData.imgUrl}
          onChange={handleInputChange}
          className="form-control"
        />
        {errors.imgUrl && (
          <p className="form-text text-danger">{errors.imgUrl}</p>
        )}
      </div>
      <div className="row mt-4">
        <div className="form-group col-6 col-md-3">
          <input
            type="submit"
            value="Ajouter"
            className="btn btn-primary form-control"
          />
        </div>
        <div className="form-group col-6 col-md-3">
          <Link to={`/`} className="btn btn-outline-secondary form-control">
            Annuler
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CreateEvent;
