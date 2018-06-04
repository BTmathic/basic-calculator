import React from 'react';

// need to handle resizing the screen in case the computation overflows
// probably easy to do here, check subDisplay length and if big enough
// do something? Mostly CSS? Hm...
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