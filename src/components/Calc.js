import React from 'react';
import Screen from './Screen';
import Buttons from './Buttons';

export default class Calculator extends React.Component {
  state = {
    isOn: true,
    mainDisplay: '0',
    subDisplay: '0'
  }

  handlePowerButtonPress = () => {
    this.setState((prevState) => ({ isOn: !prevState.isOn }));
  }

  handleClearAll = () => {
    this.setState(() => ({
      mainDisplay: '0',
      subDisplay: '0'
    }));
  }

  handleClear = () => {
    this.setState(() => ({ subDisplay: '0' }));
  }

  handleButtonPress = (id, e) => {
    const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const operations = ['add', 'subtract', 'multiply', 'divide'];
    const operationsUse = ['+', '-', '*', '/'];
    const currentState = this.state.subDisplay;
    // need to prevent invalid expressions as per FCC test suite, we check with the following
    const lastElementClicked = currentState[currentState.length-1];
    const secondLastClicked = currentState[currentState.length-2];

    console.log(id);

    if (numbers.indexOf(id) > -1) {
      // The only time a number cannot be entered is if it is a 0 and precedes other numbers
      if (currentState === '0') {
        this.setState(() => ({ subDisplay: String(numbers.indexOf(id))}));
      } else if (lastElementClicked === '0' && operations.indexOf(secondLastClicked) !== -1) {
        this.setState((prevState) => ({
          subDisplay: currentState.slice(0, -1) + numbers.indexOf(id)
        }));
      } else {
        this.setState((prevState) => ({
          subDisplay: currentState + numbers.indexOf(id)
        }));
      }
    } else if (operations.indexOf(id) > -1) {
      if (currentState !== '0') {
        if (parseInt(lastElementClicked) > -1) {
          this.setState((prevState) => ({
            subDisplay: currentState + operationsUse[operations.indexOf(id)]
          }));
        } else if (operationsUse.indexOf(lastElementClicked) !== -1) {
          this.setState((prevState) => ({
            subDisplay: currentState.slice(0, -1) + operationsUse[operations.indexOf(id)]
          }));
        }
      }
    } else if (id === 'plusminus') {
      this.setState((prevState) => ({ subDisplay: String(-prevState.subDisplay) }));
    } else if (id === 'decimal') {
      if (lastElementClicked !== '.') {
        this.setState((prevState) => ({ subDisplay: prevState.subDisplay + '.'}));
      }
    } else if (id === 'equals') {
      try {
        let result = String(eval(currentState)).slice(0, 9);
        //result = this.testOverflow(result);
        this.setState(() => ({
          mainDisplay: result,
          evaluateOperation: false,
          evaluationComplete: true
        }));
      }

      catch(e) {
        this.setState(() => ({
          mainDisplay: 'Error',
          evaluateOperation: false,
          evaluationComplete: true
        }));
      }
    }
  }

  render() {
    return (
      <div id='calculator'>
        <div id='logo'>
          Basic Calculator
        </div>
        <Screen
          isOn={this.state.isOn}
          mainDisplay={this.state.mainDisplay}
          subDisplay={this.state.subDisplay}
        />
        <Buttons handlePowerButtonPress={this.handlePowerButtonPress}
          handleClearAll={this.handleClearAll}
          handleClear={this.handleClear}
          handleButtonPress={this.handleButtonPress}
        />
      </div>
    );
  }
}