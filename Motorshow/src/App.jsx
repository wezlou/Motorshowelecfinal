import React, { useState } from 'react';
import './App.css';

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-left">
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/motorshow">Motorshow</a></li>
            <li><a href="/about-us">About Us</a></li>
          </ul>
        </div>
        <div className="auth-buttons">
          <Button className="login-btn">Login</Button>
          <Button className="register-btn">Register</Button>
        </div>
      </nav>
    </header>
  );
}

function Card({ children }) {
  return <div className="card">{children}</div>;
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
    <button onClick={onClick} className={`button ${className}`}>
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
    { src: '/images/thai1.jpg', label: 'Raider 150 FI' },
    { src: '/images/thai2.jpg', label: 'Sniper 150' },
    { src: '/images/thai3.jpg', label: 'Click 125' },
    { src: '/images/thai4.jpg', label: 'Wave 125' },
    { src: '/images/thai5.jpg', label: 'Smash' },
  ],
  malaysian: [
    { src: '/images/malaysian1.jpg', label: 'Raider Fi' },
    { src: '/images/malaysian2.jpg', label: 'Sniper' },
    { src: '/images/malaysian3.jpg', label: 'Click 125' },
    { src: '/images/malaysian4.jpg', label: 'Wave' },
    { src: '/images/malaysian5.jpg', label: 'Smash' },
  ],
  bigbike: [
    { src: '/images/bigbike1.jpg', label: 'Raider 150 Fi' },
    { src: '/images/bigbike2.jpg', label: 'Sniper' },
    { src: '/images/bigbike3.jpg', label: 'Click 125' },
    { src: '/images/bigbike4.jpg', label: 'Wave' },
    { src: '/images/bigbike5.jpg', label: 'Smash' },
  ],
  vanz: [
    { src: '/images/vanz1.jpg', label: 'Raider 150 Fi' },
    { src: '/images/vanz2.jpg', label: 'Sniper 155' },
    { src: '/images/vanz3.jpg', label: 'Click' },
    { src: '/images/vanz4.jpg', label: 'Wave' },
    { src: '/images/vanz5.jpg', label: 'Smash' },
  ],
};

const suggestedPartsImages = {
  thai: [
    { src: '/images/parts/sample2.jpg', label: 'Sample1' },
    { src: '/images/parts/thai2.jpg', label: 'Suggested Part 2' },
    { src: '/images/parts/thai3.jpg', label: 'Suggested Part 3' },
    { src: '/images/parts/thai4.jpg', label: 'Suggested Part 4' },
    { src: '/images/parts/thai5.jpg', label: 'Suggested Part 5' },
  ],
  malaysian: [
    { src: '/images/parts/malaysian1.jpg', label: 'Suggested Part 1' },
    { src: '/images/parts/malaysian2.jpg', label: 'Suggested Part 2' },
    { src: '/images/parts/malaysian3.jpg', label: 'Suggested Part 3' },
    { src: '/images/parts/malaysian4.jpg', label: 'Suggested Part 4' },
    { src: '/images/parts/malaysian5.jpg', label: 'Suggested Part 5' },
  ],
  bigbike: [
    { src: '/images/parts/bigbike1.jpg', label: 'Suggested Part 1' },
    { src: '/images/parts/bigbike2.jpg', label: 'Suggested Part 2' },
    { src: '/images/parts/bigbike3.jpg', label: 'Suggested Part 3' },
    { src: '/images/parts/bigbike4.jpg', label: 'Suggested Part 4' },
    { src: '/images/parts/bigbike5.jpg', label: 'Suggested Part 5' },
  ],
  vanz: [
    { src: '/images/parts/vanz1.jpg', label: 'Suggested Part 1' },
    { src: '/images/parts/vanz2.jpg', label: 'Suggested Part 2' },
    { src: '/images/parts/vanz3.jpg', label: 'Suggested Part 3' },
    { src: '/images/parts/vanz4.jpg', label: 'Suggested Part 4' },
    { src: '/images/parts/vanz5.jpg', label: 'Suggested Part 5' },
  ],
};

export default function MotorshowApp() {
  const [comments, setComments] = useState({});
  const [inputs, setInputs] = useState({});
  const [modalImage, setModalImage] = useState(null);
  const [viewComments, setViewComments] = useState(null);
  const [showSuggestedParts, setShowSuggestedParts] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

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

  const openModal = (image) => setModalImage(image);
  const closeModal = () => setModalImage(null);

  const openCommentsModal = (image) => setViewComments(image);
  const closeCommentsModal = () => setViewComments(null);

  const openSuggestedPartsModal = (sectionKey) => {
    setShowSuggestedParts(sectionKey);
  };

  const closeSuggestedPartsModal = () => {
    setShowSuggestedParts(null);
  };

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="title">Motorshow Gallery</h1>
        {sections.map((section) => (
          <div key={section.key} className="section">
            <div className="section-header">
              <h2 className="section-title">{section.name}</h2>
              <Button onClick={() => openSuggestedPartsModal(section.key)} className="suggested-parts-btn">
                Suggested Parts
              </Button>
            </div>
            <div className="horizontal-scroll">
              {sampleImages[section.key].map((image, index) => (
                <Card key={index}>
                  <CardContent>
                    <div className="image-container">
                      <img
                        src={image.src}
                        alt={image.label}
                        className="image"
                        onClick={() => openModal(image.src)}
                      />
                      <h2 className="image-label">{image.label}</h2>
                    </div>
                    <div className="comments">
                      <Input
                        placeholder="Add a comment..."
                        value={inputs[image.src] || ''}
                        onChange={(e) => handleCommentChange(image.src, e.target.value)}
                      />
                      <Button onClick={() => submitComment(image.src)}>Submit</Button>
                      <Button onClick={() => openCommentsModal(image.label)} className="view-comments-button">
                        View Comments
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Modal for suggested parts */}
        {showSuggestedParts && (
          <div className="suggested-parts-modal">
            <div className="suggested-parts-modal-content">
              <h2>Suggested Parts for {showSuggestedParts} Concept</h2>
              {/* Removed file upload functionality */}
              <div className="suggested-parts-images horizontal-scroll">
                {[...suggestedPartsImages[showSuggestedParts], ...uploadedImages].map((part, index) => (
                  <div key={index} className="suggested-part">
                    <img
                      src={part.src || part} // check if it's an object or a string (uploaded image)
                      alt={`Suggested part ${index + 1}`}
                      className="suggested-part-image"
                    />
                    <p className="part-label">{part.label || 'Uploaded Image'}</p>
                  </div>
                ))}
              </div>
              <Button onClick={closeSuggestedPartsModal}>Close</Button>
            </div>
          </div>
        )}

        {modalImage && (
          <div className="modal" onClick={closeModal}>
            <img src={modalImage} alt="Full" className="modal-image" />
          </div>
        )}

        {viewComments && (
          <div className="comments-modal">
            <div className="comments-modal-content">
              <h2>Comments for {viewComments}</h2>
              <div className="comments-list">
                {comments[viewComments]?.map((comment, index) => (
                  <p key={index}>{comment}</p>
                ))}
              </div>
              <Button onClick={closeCommentsModal}>Close</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
