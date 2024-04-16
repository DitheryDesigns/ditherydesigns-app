import React from 'react';
import './Tooltip.css';

const Tooltip = ({ text, children, style }) => {
  return (
    // The outer wrapper for the tooltip component. Any additional styles passed via 'style' prop are applied here.
    <div style={style} className="tooltip">

      {/* The tooltip text to be displayed */}
      <span className="tooltip-text">{text}</span>

      {/* The content over which the tooltip will appear */}
      {children}
    </div>
  );
};

export default Tooltip;
