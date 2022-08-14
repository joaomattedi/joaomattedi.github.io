/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Flask, FolderOpen, House, PaperPlaneTilt, UserCircle,
} from 'phosphor-react';
import React from 'react';
import { Link, useHref } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  const Skills = useHref('/skills');
  const AboutMe = useHref('/aboutme');
  const Home = useHref('/');
  const Projects = useHref('/projects');
  const Contact = useHref('/contact');
  return (
    <div className="nav-container">
      <nav className="NavBar">
        <Link to={Skills}>
          <Flask size={40} weight="light" className="icons" />
        </Link>
        <Link to={AboutMe}>
          <UserCircle size={40} weight="light" className="icons" />
        </Link>
        <Link to={Home}>
          <House size={40} weight="light" className="icons" />
        </Link>
        <Link to={Projects}>
          <FolderOpen size={40} weight="light" className="icons" />
        </Link>
        <Link to={Contact}>
          <PaperPlaneTilt size={40} weight="light" className="icons" />
        </Link>
      </nav>
    </div>
  );
}
