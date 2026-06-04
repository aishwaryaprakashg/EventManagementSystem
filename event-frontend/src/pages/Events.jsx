import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/events/")
      .then((response) => {
        setEvents(response.data);
      });
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1>All Events</h1>

      <input
        className="form-control mb-4"
        placeholder="Search Events..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {filteredEvents.map((event) => (
        <div
          className="card p-3 mb-3"
          key={event.id}
        >
          <h3>
            <Link to={`/events/${event.id}`}>
              {event.title}
            </Link>
          </h3>

          <p>{event.description}</p>

          <p>
            <strong>Location:</strong>{" "}
            {event.location}
          </p>

          <p>
            <strong>Capacity:</strong>{" "}
            {event.capacity}
          </p>

          <p>
            <strong>Organizer:</strong>{" "}
            {event.created_by}
          </p>

          <p>
            <strong>Registered:</strong>{" "}
            {event.registered_count}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Events;