import React from 'react';

export default (props) => (
  <div id='screen'>
    <div id='main-screen'>
      {props.isOn && props.mainDisplay}
    </div>
    <div id='display'>
      {props.isOn && props.subDisplay}
    </div>
  </div>
);