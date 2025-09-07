import React from "react";
import "../styles/Topbar.css";

export default function Topbar({ onMenuClick }) {
  return (
    <div className="topbar">
      <button className="menu-btn" onClick={onMenuClick}>
        ☰
      </button>
      <h1>My Music App</h1>
    </div>
  );
}
