import {
  Flask, FolderOpen, House, PaperPlaneTilt, UserCircle,
} from 'phosphor-react';
import React from 'react';
import './NavBar.css';

export default function NavBar() {
  return (
    <div className="nav-container">
      <nav className="NavBar">
        <Flask size={40} weight="light" className="icons" />
        <UserCircle size={40} weight="light" className="icons" />
        <House size={40} weight="light" className="icons" />
        <FolderOpen size={40} weight="light" className="icons" />
        <PaperPlaneTilt size={40} weight="light" className="icons" />
      </nav>
    </div>
  );
}
