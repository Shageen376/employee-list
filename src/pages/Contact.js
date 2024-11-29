import React from 'react';

function ContactUs() {
  return (
    <div className="container py-5 text-center bg-dark text-white">
      <div className="row mb-4">
        <div className="col">
          <img 
            src="https://via.placeholder.com/100" 
            alt="Contact Person" 
            className="rounded-circle mb-3" 
          />
          <h2>Contact Us</h2>
          <p className="lead">
            Use our contact form for all information requests, or connect with us
            directly using the contact information below.
          </p>
          <small className="text-light">Image from Unsplash</small>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="p-4 bg-light text-dark rounded">
            <div className="mb-3 display-4">🏃</div>
            <h5>ABOUT CLUB</h5>
            <p>Running Guide Workouts</p>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="p-4 bg-light text-dark rounded">
            <div className="mb-3 display-4">📞</div>
            <h5>PHONE (LANDLINE)</h5>
            <p>+1 012 345 6789<br />+1 012 352 8289</p>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="p-4 bg-light text-dark rounded">
            <div className="mb-3 display-4">📍</div>
            <h5>OUR OFFICE LOCATION</h5>
            <p>The Winner Design Studio Company<br />The Courtyard, A1 Space, Colorado, USA</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
