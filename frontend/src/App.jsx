import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // Service states
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Auth states
  const [page, setPage] = useState("login"); // "login" or "register"
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Login/Register fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // for register

  const API_URL = "http://localhost:5000/api/services";
  const AUTH_URL = "http://localhost:5000/api/auth";

  // Fetch services
  const fetchServices = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (role) fetchServices();
  }, [role, token]);

  // -----------------------------
  // AUTH FUNCTIONS
  // -----------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${AUTH_URL}/login`, {
        email,
        password,
      });
      const { role: userRole, token: userToken } = res.data;

      // Store token & role in localStorage
      localStorage.setItem("token", userToken);
      localStorage.setItem("role", userRole);

      setRole(userRole);
      setToken(userToken);
      setPage("app");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${AUTH_URL}/register`, {
        name: fullName,
        email,
        password,
      });
      alert("Registration successful! Please login.");
      setPage("login");
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed!");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    setToken(null);
    setPage("login");
  };

  // -----------------------------
  // SERVICE FUNCTIONS (ADMIN ONLY)
  // -----------------------------
  const handleSubmitService = async (e) => {
    e.preventDefault();
    if (role !== "admin") return alert("Only admin can add/update!");

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/${editingId}`,
          { name, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditingId(null);
      } else {
        await axios.post(
          API_URL,
          { name, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setName("");
      setDescription("");
      fetchServices();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error saving service");
    }
  };

  const handleEditService = (service) => {
    if (role !== "admin") return alert("Only admin can edit!");
    setName(service.name);
    setDescription(service.description);
    setEditingId(service._id);
  };

  const handleDeleteService = async (id) => {
    if (role !== "admin") return alert("Only admin can delete!");
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error deleting service");
    }
  };

  // -----------------------------
  // RENDER
  // -----------------------------
  // Not logged in → Show login/register
  if (!role) {
    return page === "login" ? (
      <div style={{ padding: "20px" }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <button onClick={() => setPage("register")}>Register here</button>
        </p>
      </div>
    ) : (
      <div style={{ padding: "20px" }}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account?{" "}
          <button onClick={() => setPage("login")}>Login here</button>
        </p>
      </div>
    );
  }

  // Logged in → Show service manager
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Service Manager</h1>
      <p>
        Logged in as: <strong>{role}</strong>
      </p>
      <button onClick={handleLogout}>Logout</button>
      <hr />

      {/* FORM (admin only) */}
      {role === "admin" && (
        <form onSubmit={handleSubmitService}>
          <input
            type="text"
            placeholder="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <br />
          <br />
          <button type="submit">
            {editingId ? "Update Service" : "Add Service"}
          </button>
        </form>
      )}

      <hr />

      {/* Service List */}
      <h2>Services</h2>
      {services.length === 0 ? (
        <p>No services found</p>
      ) : (
        services.map((service) => (
          <div key={service._id} style={{ marginBottom: "10px" }}>
            <strong>{service.name}</strong> - {service.description}
            <br />
            {role === "admin" && (
              <>
                <button onClick={() => handleEditService(service)}>Edit</button>
                <button onClick={() => handleDeleteService(service._id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default App;