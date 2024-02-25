import "./App.css";
import React, { useEffect, useState } from "react";
import api from "./api";
import "bootswatch/dist/lux/bootstrap.min.css";
import EventsList from "./pages/EventsList";
import EventDetails from "./pages/EventDetails";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import DeleteEvent from "./pages/DeleteEvent";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<EventsList />} />
          {/*authenticated routes */}
          <Route path="/event-details/:id" element={<EventDetails />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/delete-event/:id" element={<DeleteEvent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
