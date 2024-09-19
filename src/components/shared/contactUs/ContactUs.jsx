import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className='about-us-parent'>
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out to us for any queries or support.</p>
      </div>

      <div className="about-us-content">
        <section className="about-us-mission">
          <h2>Our Contact Information</h2>
          <p>
            <strong>Library Name:</strong> Page Palace<br />
            <strong>Address:</strong> Brilliant Platina, Scheme 74c, Vijay Nagar, Indore<br />
            <strong>Email:</strong> aditya.agrawal2325@gmail.com<br />
            <strong>Phone:</strong> +91 8770602325<br />
            <strong>Working Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM
          </p>
        </section>
      </div>
    </div>
    </div>
  );
};

export default ContactUs;
