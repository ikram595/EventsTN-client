import React from "react";
import {
  BsCalendarEvent,
  BsClock,
  BsBookmarks,
  BsGeoAlt,
  BsPencilSquare,
  BsEye,
  BsTrash3,
} from "react-icons/bs";
import { Link } from "react-router-dom";
const EventItem = ({
  eventId,
  name,
  description,
  limit,
  imgUrl,
  startDate,
  endDate,
  startTime,
  endTime,
  location,
  type,
  status,
  category,
  properties,
}) => {
  return (
    <div>
      <div key={eventId} className="card" style={{ width: "20rem" }}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary text-secondary">
            <BsCalendarEvent className="bi bi-calendar-event text-secondary" />
            {startDate}-{endDate}
          </h6>
          <h6 className="card-subtitle mb-2 text-body-secondary text-secondary">
            <BsClock className="bi bi-clock text-secondary" /> {startTime}
          </h6>
          <h6 className="card-subtitle mb-2 text-body-secondary text-secondary">
            <BsBookmarks className="bi bi-bookmarks" />
            {category}
          </h6>
          <p className="card-text description">{description}</p>
          <p className="card-text">
            <BsGeoAlt className="bi bi-geo-alt" /> {location}
          </p>
          <div className="m-2">tags</div>

          <Link to={`/edit-event/${eventId}`} className="btn btn-primary">
            <BsPencilSquare className="bi bi-pencil-square" />
          </Link>

          <Link to={`/event-details/${eventId}`} className="btn btn-dark">
            <BsEye className="bi bi-eye" />
          </Link>
          <Link to={`/delete-event/${eventId}`} className="btn btn-danger">
            <BsTrash3 className="bi bi-trash" />
          </Link>

          <button type="button" className="btn btn-success">
            Participer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
