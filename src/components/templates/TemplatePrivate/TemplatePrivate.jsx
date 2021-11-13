import React from 'react';
import PropTypes from 'prop-types';

import './TemplatePrivate.css';

const TemplatePrivate = ({ children }) => (
  <div>
    <nav className="template-private-navbar">
      <div>
        <a
          href="/my-projects"
          className="template-private-iron-projects-logo"
        >
          Iron Projects
        </a>
      </div>
      <div className="template-private-nav-links">
        <a href="/my-projects">My Projects</a>
        <a href="/my-projects/new">Create new Project</a>
        <a href="/logout">Logout</a>
      </div>
    </nav>
    <div className="template-private-content">
      {children}
    </div>
  </div>
);

TemplatePrivate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TemplatePrivate;
