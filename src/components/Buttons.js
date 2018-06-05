import React from 'react';
import Button from './Button';

export default (props) => (
  <div id='buttons'>
    <Button click={props.handlePowerButtonPress}
      buttonColour={'black-button'}
      buttonValue={'ON/OFF'}
      buttonID={'on-off-button-text'}
    />
    <Button click={props.handleClearAll}
      buttonColour={'red-button'}
      buttonValue={'AC'}
      buttonID={'all-clear'}
    />
    <Button click={props.handleClear}
      buttonColour={'red-button'}
      buttonValue={'CE'}
      buttonID={'clear'}
    />
    <Button click={props.handleButtonPress}
      buttonColour={'grey-button'}
      buttonValue={'<'}
      buttonID={'back'}
    />
    <Button click={props.handleButtonPress}
      buttonColour={'grey-button'}
      buttonValue={'7'}
      buttonID={'seven'}
    />
    <Button click={props.handleButtonPress}
      buttonColour={'grey-button'}
      buttonValue={'8'}
      buttonID={'eight'}
    />
    <Button click={props.handleButtonPress}
      buttonColour={'grey-button'}
      buttonValue={'9'}
      buttonID={'nine'}
    />
    <Button click={props.handleButtonPress}
      buttonColour={'grey-button'}
      buttonValue={'+'}
      buttonID={'add'}
    />
    <Button click={props.handleButtonPress}
      buttonColour={'grey-button'}
      buttonValue={'4'}
      buttonID={'four'}
    />
    <Button click={props.handleButtonPress}
      buttonColour={'grey-button'}
      buttonValue={'5'}
      buttonID={'five'}
    />
    <Button click={props.handleButtonPress}
      buttonColour={'grey-button'}
      buttonValue={'6'}
      buttonID={'six'}
    />
    <Button click={props.handleButtonPress}
      buttonColour={'grey-button'}
      buttonValue={'-'}
      buttonID={'subtract'}
    />
    <Button click={props.handleButtonPress}
      buttonColour={'grey-button'}
      buttonValue={'1'}
      buttonID={'one'}
    />
    <Button click={props.handleButtonPress}
      buttonColour={'grey-button'}
      buttonValue={'2'}
      buttonID={'two'}
    />
    <Button click={props.handleButtonPress}
      buttonColour={'grey-button'}
      buttonValue={'3'}
      buttonID={'three'}
    />
    <Button click={props.handleButtonPress}
      buttonColour={'grey-button'}
      buttonValue={'x'}
      buttonID={'multiply'}
    />
    <Button click={props.handleButtonPress}
      buttonColour={'grey-button'}
      buttonValue={'0'}
      buttonID={'zero'}
    />
    <Button click={props.handleButtonPress}
      buttonColour={'grey-button'}
      buttonValue={'.'}
      buttonID={'decimal'}
    />
    <Button click={props.handleButtonPress}
      buttonColour={'grey-button'}
      buttonValue={'='}
      buttonID={'equals'}
    />
    <Button click={props.handleButtonPress}
      buttonColour={'grey-button'}
      buttonValue={'/'}
      buttonID={'divide'}
    />
  </div>
);