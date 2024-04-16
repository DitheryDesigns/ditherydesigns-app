import React, { useState } from 'react';
import './AccordionPanel.css';

const AccordionPanel = ({ title, children, expanded, style }) => {
  // State to manage whether the panel is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(expanded ? expanded : false);

  // Function to toggle the panel's state between expanded and collapsed
  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="AccordionPanel-container" style={style}>
      <div className="AccordionPanel-header" onClick={togglePanel}>
        <h3>{title}</h3>
        <span>{isExpanded ? '-' : '+'}</span>
      </div>
      <div className={`AccordionPanel-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
        {children}
      </div>
    </div>
  );
};

export default AccordionPanel;
