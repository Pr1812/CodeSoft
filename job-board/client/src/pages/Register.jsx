// import { useState } from "react";
// // import {useNavigate} from "react-router-dom"

// export const Register = () => {
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert("Registration successful!");
//         setUser({
//           username: "",
//           email: "",
//           phone: "",
//           password: "",
//         });
//       } else {
//         alert(`Error: ${data.message}`);
//       }
//     } catch (error) {
//       alert(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <>
//       <section>
//         <main>
//           <div className="section-registration">
//             <div className="container grid grid-two-cols">
//               <div className="registration-image reg-img">
//                 <img
//                   src="/images/register.png"
//                   alt="a nurse with a cute look"
//                   width="400"
//                   height="500"
//                 />
//               </div>

//               {/* our main registration code  */}
//               <div className="registration-form">
//                 <h1 className="main-heading mb-3">Registration form</h1>
//                 <br />
//                 <form onSubmit={handleSubmit}>
//                   <div>
//                     <label htmlFor="username">Username</label>
//                     <input
//                       type="text"
//                       name="username"
//                       value={user.username}
//                       onChange={handleInput}
//                       id="username"
//                       placeholder="Username"
//                       required
//                       autoComplete="off"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email">Email</label>
//                     <input
//                       type="text"
//                       name="email"
//                       value={user.email}
//                       onChange={handleInput}
//                       placeholder="Email"
//                       required
//                       autoComplete="off"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="phone">Phone</label>
//                     <input
//                       type="number"
//                       name="phone"
//                       value={user.phone}
//                       onChange={handleInput}
//                       placeholder="Phone"
//                       required
//                       autoComplete="off"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="password">Password</label>
//                     <input
//                       type="password"
//                       name="password"
//                       value={user.password}
//                       onChange={handleInput}
//                       placeholder="Password"
//                       required
//                       autoComplete="off"
//                     />
//                   </div>
//                   <br />
//                   <button type="submit" className="btn btn-submit">
//                     Register Now
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </main>
//       </section>
//     </>
//   );
// };


import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.ok) {
        // alert("Registration successful!");
        alert(`Welcome, ${data.user.username}! Registration successful!`);
        register(data.user, data.token);
        navigate("/"); // Redirect to home or dashboard after registration
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* Our main registration code */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="Phone"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="Password"
                      required
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
