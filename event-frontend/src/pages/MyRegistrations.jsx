import { useEffect, useState } from "react";
import axios from "axios";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");

    axios
      .get("http://127.0.0.1:8000/api/my-registrations/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRegistrations(response.data);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Please login first");
      });
  }, []);

  const cancelRegistration = async (registrationId) => {
    const token = localStorage.getItem("access");

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/registrations/${registrationId}/cancel/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRegistrations(
        registrations.filter((r) => r.id !== registrationId)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to cancel registration");
    }
  };

  return (
    <div>
      <h1>My Registrations</h1>

      {message && <p>{message}</p>}

      {registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        registrations.map((registration) => (
          <div
            key={registration.id}
            style={{
              border: "1px solid gray",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h3>{registration.event}</h3>

            <p>
              Registered At: {registration.registered_at}
            </p>

            <button
              onClick={() =>
                cancelRegistration(registration.id)
              }
            >
              Cancel Registration
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyRegistrations;