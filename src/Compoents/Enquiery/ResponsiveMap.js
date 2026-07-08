"use client";

import React from "react";

const ResponsiveMap = () => {
  return (
    <div className="map-responsive mt-4 mb-4">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.138346587349!2d77.53378049999999!3d12.962997899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d813fccfe91%3A0xb20b527293b0fd25!2sNewgen%20Softech!5e0!3m2!1sen!2sin!4v1783501270894!5m2!1sen!2sin"
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      
      ></iframe>
    </div>
  );
};

export default ResponsiveMap;