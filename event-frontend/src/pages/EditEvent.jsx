import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    event_date: "",
    registration_deadline: "",
    capacity: "",
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/events/${id}/`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

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
      await axios.put(
        `http://127.0.0.1:8000/api/events/${id}/update/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/my-events");
    } catch (error) {
      console.error(error);
      alert("Failed to update event");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Edit Event</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <textarea
          className="form-control mb-3"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <input
          className="form-control mb-3"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
        />

        <input
          className="form-control mb-3"
          type="datetime-local"
          name="event_date"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          type="datetime-local"
          name="registration_deadline"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          placeholder="Capacity"
        />

        <button
          className="btn btn-primary"
          type="submit"
        >
          Update Event
        </button>
      </form>
    </div>
  );
}

export default EditEvent;