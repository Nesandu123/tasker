// import { useState } from "react";
// import axios from "axios";

// function Register({ switchToLogin }) {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:5000/api/auth/register", form);
//       alert("Registered successfully!");
//       switchToLogin(); // go to login page
//     } catch (err) {
//       alert("Error registering");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Register</h2>

//       <form onSubmit={handleSubmit} style={styles.form}>
//         <input
//           name="name"
//           placeholder="Name"
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">Register</button>
//       </form>

//       <p>
//         Already have an account?{" "}
//         <button onClick={switchToLogin}>Login</button>
//       </p>
//     </div>
//   );
// }

// const styles = {
//   container: { textAlign: "center", marginTop: "50px" },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     width: "250px",
//     margin: "auto"
//   }
// };

// export default Register;