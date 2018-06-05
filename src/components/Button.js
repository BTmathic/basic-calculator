import React from 'react';

export default (props) => (
  <div className={`button ${props.buttonColour}`} id={props.buttonID} onClick={(e) => {props.click(props.buttonID, e)}}>
    {props.buttonValue}
  </div>
)