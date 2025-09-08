import React from "react";
import "../styles/Sidebar.css";

export default function Sidebar({ isOpen, onLogout }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo">My Music</div>
      <ul className="nav-list">
        <li className="nav-item">Home</li>
        <li className="nav-item">Search</li>
        <li className="nav-item">Your Library</li>
        <li className="nav-item">Playlists</li>
      </ul>
      <div className="logout-container">
        <button className="btn-secondary" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}
