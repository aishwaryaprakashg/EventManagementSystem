import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");

    axios
      .get("http://127.0.0.1:8000/api/my-events/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEvents(response.data);
      })
      .catch(() => {
        setMessage("Please login first");
      });
  }, []);

  const deleteEvent = async (id) => {
    const token = localStorage.getItem("access");

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/events/${id}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEvents(
        events.filter((event) => event.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <h1>My Events</h1>

      {message && <p>{message}</p>}

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div
            className="card p-3 mb-3"
            key={event.id}
          >
            <h3>{event.title}</h3>

            <p>
              <strong>Location:</strong>{" "}
              {event.location}
            </p>

            <p>
              <strong>Capacity:</strong>{" "}
              {event.capacity}
            </p>

            <p>
              <strong>Registered Users:</strong>{" "}
              {event.registered_count}
            </p>

            <div>
              <button
                className="btn btn-warning me-2"
                onClick={() =>
                  navigate(`/events/${event.id}/edit`)
                }
              >
                Edit
              </button>

              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteEvent(event.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyEvents;