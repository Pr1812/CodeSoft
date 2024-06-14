import { useState } from "react";
// import { useAuth } from "../store/auth";

// type UserAuth = boolean;
export const Contact = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Message sent successfully!");
        setForm({
          username: "",
          email: "",
          message: "",
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Subscribe to Thapa Technical Youtube to Support
  return (
    <>
      <section className="section-contact">
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="always ready to help you" />
          </div>

          <section className="section-form">
            <h1 className="main-heading">Contact us</h1>
            <br /> <br />
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  // {
                  //   user?? <> value = {} </>
                  // }
                  value={form.username}
                  onChange={handleInput}
                  autoComplete="off"
                  required
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  // {
                  //   user?? <> value = {} </>
                  // }
                  value={form.email}
                  onChange={handleInput}
                  autoComplete="off"
                  required
                />
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="5"
                  autoComplete="off"
                  required
                  value={form.message}
                  onChange={handleInput}
                ></textarea>
              </div>

              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};
