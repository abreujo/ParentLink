// ModalWithVideo.jsx
import React from "react";
import "../styles/ModalWithVideo.css";

function ModalWithVideo({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button2" onClick={onClose}>
          ✖
        </button>
        <div className="video-container">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/Q4YSpLZyJFc"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ModalWithVideo;
