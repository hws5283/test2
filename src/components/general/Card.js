//UI element for wrapping forms,
//source - Academind Max Shwarzmuller
import React from 'react';

import './Card.css';

const Card = props => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
