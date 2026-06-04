import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    event_date: "",
    registration_deadline: "",
    capacity: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/events/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage("Failed to create event");
    }
  };

  return (
    <div>
      <h1>Create Event</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="datetime-local"
          name="event_date"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="datetime-local"
          name="registration_deadline"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">
          Create Event
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateEvent;