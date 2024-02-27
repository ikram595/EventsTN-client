import "./App.css";
import React from "react";
import "bootswatch/dist/lux/bootstrap.min.css";
import EventsList from "./pages/EventsList";
import EventDetails from "./pages/EventDetails";
import { Route, Routes } from "react-router-dom";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import DeleteEvent from "./pages/DeleteEvent";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="container">
      <Navbar />
      <Toaster position="buttom-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<EventsList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/*authenticated routes */}
        <Route path="/event-details/:id" element={<EventDetails />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
        <Route path="/delete-event/:id" element={<DeleteEvent />} />
      </Routes>
      /
    </div>
  );
}

export default App;
