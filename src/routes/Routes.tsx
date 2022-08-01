import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutMe from '../pages/AboutMe';
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import Skill from '../pages/Skill';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/aboutme" element={<AboutMe />} />
      <Route path="/skills" element={<Skill />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
    </Switch>
  );
}
