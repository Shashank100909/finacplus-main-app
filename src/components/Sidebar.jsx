import React from "react";
import "../styles/Sidebar.css";
import Swal from "sweetalert2";

export default function Sidebar({ onLogout }) {
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout();
      }
    });
  };

  return (
    <div className="sidebar">
      <h2 className="logo">My Music</h2>
      <ul className="nav-list">
        <li className="nav-item">Home</li>
        <li className="nav-item">Search</li>
        <li className="nav-item">Your Library</li>
        <li className="nav-item">Playlists</li>
      </ul>
      <div className="logout-container">
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
