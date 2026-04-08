// import { useState } from "react";
// import axios from "axios";

// function Login({ switchToRegister }) {
//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         form
//       );

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       console.log("Login response:", res.data);

//       localStorage.getItem("role");  // should return "admin"
//       localStorage.getItem("token"); // should return your JWT token

//       alert("Login successful!");

//       // 🔥 Role-based redirect
//       if (res.data.role === "admin") {
//         alert("Welcome Admin!");
//       } else {
//         alert("Welcome Customer!");
//       }

//     } catch (err) {
//       alert("Invalid login");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Login</h2>

//       <form onSubmit={handleSubmit} style={styles.form}>
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

//         <button type="submit">Login</button>
//       </form>

//       <p>
//         Don’t have an account?{" "}
//         <button onClick={switchToRegister}>Register</button>
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

// export default Login;