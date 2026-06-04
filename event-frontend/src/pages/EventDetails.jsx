import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/events/${id}/`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleRegister = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setMessage("Please login first.");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/events/${id}/register/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(
          error.response.data.error ||
          error.response.data.message ||
          "Registration failed"
        );
      } else {
        setMessage("Server error");
      }
    }
  };

  if (!event) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>{event.title}</h1>

      <p>
        <strong>Description:</strong> {event.description}
      </p>

      <p>
        <strong>Location:</strong> {event.location}
      </p>

      <p>
        <strong>Event Date:</strong> {event.event_date}
      </p>

      <p>
        <strong>Capacity:</strong> {event.capacity}
      </p>

      <p>
        <strong>Organizer:</strong> {event.created_by}
      </p>

      <p>
        <strong>Registered:</strong> {event.registered_count}
      </p>

      <button onClick={handleRegister}>
        Register
      </button>

      {message && (
        <p>
          <strong>{message}</strong>
        </p>
      )}
    </div>
  );
}

export default EventDetails;