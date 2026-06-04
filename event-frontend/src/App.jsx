import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import MyRegistrations from "./pages/MyRegistrations";
import MyEvents from "./pages/MyEvents";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route
          path="/my-registrations"
          element={<MyRegistrations />}
        />
        <Route
          path="/events/:id"
          element={<EventDetails />}
        />
        <Route
          path="/events/:id/edit"
          element={<EditEvent />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;