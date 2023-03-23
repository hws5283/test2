import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';
//academind
//utilizing portal concept here
//expecting onclick prop for this component
const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
