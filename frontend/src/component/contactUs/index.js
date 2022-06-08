import "./style.css";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_fvfr5sn",
        "template_9txb3go",
        form.current,
        "nQqCCfeNSMesYnqNm"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div class="container">
      <div class="contact-form">
        <form ref={form} onSubmit={sendEmail}>
          <h3 class="title">Contact us</h3>
          <div class="input-container">
            <input type="text" name="name" class="input" />
            <label for="">Username</label>
            <span>Username</span>
          </div>

          <div class="input-container">
            <input type="tel" name="phone" class="input" />
            <label for="">Phone</label>
            <span>Phone</span>
          </div>
          <div class="input-container textarea">
            <textarea name="message" class="input"></textarea>

            <span>Message</span>
          </div>
          <input type="submit" value="Send" class="btn" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
