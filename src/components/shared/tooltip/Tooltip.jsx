import React, { useState } from 'react';
import './Tooltip.css';

const Tooltip = ({ children, tooltipText }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="tooltip-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && <div className="tooltip-text">{tooltipText}</div>}
    </div>
  );
};

export default Tooltip;
