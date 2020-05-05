import React, { useState } from "react";
import axios from "axios";

export default function Form() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const { email, message } = formData;

  const updateForm = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmited = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, message });
    try {
      await axios.post("/api/test", body, config);
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        console.error(errors);
      }
    }
  };

  return (
    <section id="contact-form" className="py-3">
      <div className="container">
        <form onSubmit={(e) => onSubmited(e)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => updateForm(e)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              type="text"
              name="message"
              id="message"
              value={message}
              onChange={(e) => updateForm(e)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
