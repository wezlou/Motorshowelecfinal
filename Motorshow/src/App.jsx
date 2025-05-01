import React, { useState } from 'react';
import './App.css';


function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <ul>
          <li><a href="/">Homepage</a></li>
          <li><a href="/motorshow">Motorshow Gallery</a></li>
          <li><a href="/suggested-parts">Suggested Parts</a></li>
          <li><a href="/about-us">About Us</a></li>
        </ul>
        <div className="auth-buttons">
          <Button className="login-btn">Login</Button>
          <Button className="register-btn">Register</Button>
        </div>
      </nav>
    </header>
  );
}

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={`card-content ${className}`}>{children}</div>;
}

function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input"
    />
  );
}

function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`button ${className}`}
    >
      {children}
    </button>
  );
}

const sections = [
  { name: "Thai Concept", key: "thai" },
  { name: "Malaysian Concept", key: "malaysian" },
  { name: "BigBike Concept", key: "bigbike" },
  { name: "Vanz Concept", key: "vanz" },
];

const sampleImages = {
  thai: [
    { src: '/images/thai1.jpg', label: 'Thai Concept - Raider 150 FI 1' },
    { src: '/images/thai2.jpg', label: 'Thai Concept - Raider 150 FI 2' },
    { src: '/images/thai3.jpg', label: 'Thai Concept - Raider 150 FI 3' },
    { src: '/images/thai4.jpg', label: 'Thai Concept - Raider 150 FI 4' },
    { src: '/images/thai5.jpg', label: 'Thai Concept - Raider 150 FI 5' },
  ],
  malaysian: [
    { src: '/images/malaysian1.jpg', label: 'Malaysian Concept - Raider 150 FI 1' },
    { src: '/images/malaysian2.jpg', label: 'Malaysian Concept - Raider 150 FI 2' },
    { src: '/images/malaysian3.jpg', label: 'Malaysian Concept - Raider 150 FI 3' },
    { src: '/images/malaysian4.jpg', label: 'Malaysian Concept - Raider 150 FI 4' },
    { src: '/images/malaysian5.jpg', label: 'Malaysian Concept - Raider 150 FI 5' },
  ],
  bigbike: [
    { src: '/images/bigbike1.jpg', label: 'BigBike Concept - Raider 150 FI 1' },
    { src: '/images/bigbike2.jpg', label: 'BigBike Concept - Raider 150 FI 2' },
    { src: '/images/bigbike3.jpg', label: 'BigBike Concept - Raider 150 FI 3' },
    { src: '/images/bigbike4.jpg', label: 'BigBike Concept - Raider 150 FI 4' },
    { src: '/images/bigbike5.jpg', label: 'BigBike Concept - Raider 150 FI 5' },
  ],
  vanz: [
    { src: '/images/vanz1.jpg', label: 'Vanz Concept - Raider 150 FI 1' },
    { src: '/images/vanz2.jpg', label: 'Vanz Concept - Raider 150 FI 2' },
    { src: '/images/vanz3.jpg', label: 'Vanz Concept - Raider 150 FI 3' },
    { src: '/images/vanz4.jpg', label: 'Vanz Concept - Raider 150 FI 4' },
    { src: '/images/vanz5.jpg', label: 'Vanz Concept - Raider 150 FI 5' },
  ],
};

export default function MotorshowApp() {
  const [comments, setComments] = useState({});
  const [inputs, setInputs] = useState({});
  const [modalImage, setModalImage] = useState(null); // For showing clicked image in a modal
  const [viewComments, setViewComments] = useState(null); // To view comments modal for specific image

  const handleCommentChange = (image, value) => {
    setInputs({ ...inputs, [image]: value });
  };

  const submitComment = (image) => {
    const newComment = inputs[image]?.trim();
    if (newComment) {
      setComments({
        ...comments,
        [image]: [...(comments[image] || []), newComment],
      });
      setInputs({ ...inputs, [image]: "" });
    }
  };

  const openModal = (image) => {
    setModalImage(image); // Open the modal and show the clicked image
  };

  const closeModal = () => {
    setModalImage(null); // Close the modal
  };

  const openCommentsModal = (image) => {
    setViewComments(image); // Open the comments modal for this image
  };

  const closeCommentsModal = () => {
    setViewComments(null); // Close the comments modal
  };

  return (
    <div className="container">
      <h1 className="title">Motorshow Gallery</h1>
      {sections.map((section) => (
        <div key={section.key} className="section">
          <h2 className="section-title">{section.name}</h2>
          <div className="horizontal-scroll">
            {sampleImages[section.key].map((image, index) => (
              <Card key={index}>
                <CardContent>
                  <div className="image-container">
                    <img
                      src={image.src}
                      alt={image.label}
                      className="image"
                      onClick={() => openModal(image.src)} // Open image in modal when clicked
                    />
                    <h2 className="image-label">{image.label}</h2>
                  </div>
                  <div className="comments">
                    <Input
                      placeholder="Add a comment..."
                      value={inputs[image.src] || ''}
                      onChange={(e) => handleCommentChange(image.src, e.target.value)}
                    />
                    <Button onClick={() => submitComment(image.src)}>
                      Submit
                    </Button>
                    <Button onClick={() => openCommentsModal(image.src)} className="view-comments-button">
                      View Comments
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Modal for displaying full image */}
      {modalImage && (
        <div className="modal" onClick={closeModal}>
          <img src={modalImage} alt="Full image" className="modal-image" />
        </div>
      )}

      {/* Comments Modal */}
      {viewComments && (
        <div className="comments-modal">
          <div className="comments-modal-content">
            <h2>Comments for {viewComments}</h2>
            {(comments[viewComments] || []).map((comment, i) => (
              <div key={i} className="comment-box">
                {comment}
              </div>
            ))}
            <Button onClick={closeCommentsModal}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
