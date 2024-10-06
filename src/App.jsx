import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import EventCreator from "./components/EventCreator/EventCreator.jsx";
import EventListing from "./components/EventList/EventListing.jsx";

function App() {
  // const [events, setEvents] = useState([]);

  // // Load events from localStorage when the app is first loaded
  // useEffect(() => {
  //   const storedEvents = localStorage.getItem("events");
  //   if (storedEvents) {
  //     setEvents(JSON.parse(storedEvents));
  //   }
  // }, []);

  // // Function to handle creating a new event
  // const handleCreateEvent = (event) => {
  //   const updatedEvents = [...events, event];

  //   setEvents(updatedEvents);
  //   // Store the updated event list in localStorage
  //   localStorage.setItem("events", JSON.stringify(updatedEvents));
  //   console.log(events)
  // };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/events" element={<EventListing  />} />
          <Route path="/" element={<EventCreator  />} />   
      
        </Routes>
      </Router>
      <Toaster />
    </>

  );
}

export default App;