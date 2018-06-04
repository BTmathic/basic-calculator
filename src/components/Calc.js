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

  testOverflow = (result) => {
    if (result > 99999999 || result < -9999999) {
      result = 'Overflow';
    } else if (String(result).indexOf('e') > -1) {
      result = 0;
    }

    return result;
  }

  fixRoundingErrors = (result) => {
    result = String(result);
    if (result.slice(9,15) === '000000') {
      let endOfZeroes;
      for (let i=15; i > 0; i--) {
        if (result[i] !== '0' && !endOfZeroes) {
          endOfZeroes = i;
        }
      }
      result = result.slice('0',endOfZeroes+1);
    } else if (result.slice(9,15) === '999999') {
      let endOfNines;
      for (let i=15; i > 0; i--) {
        if (result[i] !== '9' && !endOfNines) {
          endOfNines = i;
        }
      }
      result = Math.round(result*Math.pow(10, endOfNines))/Math.pow(10, endOfNines);
    } else {
      result = result.slice(0,9);
    }

    return result;
  };

  handleButtonPress = (id, e) => {
    const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const operations = ['add', 'subtract', 'multiply', 'divide'];
    const operationsUse = ['+', '-', '*', '/'];
    const currentState = this.state.subDisplay;
    // we need to prevent invalid expressions as per FCC test suite, we check with the following
    const lastElementClicked = currentState[currentState.length-1];
    const secondLastClicked = currentState[currentState.length-2];

    if (numbers.indexOf(id) > -1) {
      // The only time a number cannot be entered is if it is a 0 and precedes other numbers
      if (currentState === '0' || currentState.indexOf('=') !== -1) {
        this.setState(() => ({ subDisplay: String(numbers.indexOf(id))}));
      } else if (lastElementClicked === '0' && operationsUse.indexOf(secondLastClicked) !== -1) {
        this.setState((prevState) => ({
          subDisplay: currentState.slice(0, -1) + numbers.indexOf(id)
        }));
      } else {
        this.setState((prevState) => ({
          subDisplay: currentState + numbers.indexOf(id)
        }));
      }
    } else if (operations.indexOf(id) > -1) {
      if (currentState !== '0' && currentState.indexOf('=') === -1) {
        if (parseInt(lastElementClicked) > -1) {
          this.setState((prevState) => ({
            subDisplay: currentState + operationsUse[operations.indexOf(id)]
          }));
        } else if (operationsUse.indexOf(lastElementClicked) !== -1) {
          this.setState((prevState) => ({
            subDisplay: currentState.slice(0, -1) + operationsUse[operations.indexOf(id)]
          }));
        }
      } else if (currentState.indexOf('=') !== -1) {
        this.setState((prevState) => ({
          subDisplay: prevState.mainDisplay + operationsUse[operations.indexOf(id)]
        }));
      }
    } else if (id === 'back') {
      this.setState((prevState) => ({ subDisplay: prevState.subDisplay.slice(0,-1) }));
    } else if (id === 'decimal') {
      let lastNumberHasDecimal = true;
      for (let i=0; i < operationsUse.length; i++) {
        const numbers = currentState.split(operationsUse[i]);
        if (numbers[numbers.length-1].indexOf('.') === -1) {
          lastNumberHasDecimal = false;
        }
      }
      if (!lastNumberHasDecimal && currentState.indexOf('=') === -1) {
        this.setState((prevState) => ({ subDisplay: prevState.subDisplay + '.'}));
      } else if (currentState.indexOf('=') !== -1) {
        this.setState(() => ({ subDisplay: '.'}));
      }
    } else if (id === 'equals') {
      try { // mostly used while testing, but safe to leave just in case
        let result = eval(currentState);
        result = this.testOverflow(result);
        if (String(result).length > 9) {
          result = this.fixRoundingErrors(result);
        }
        this.setState((prevState) => ({
          mainDisplay: result,
          subDisplay: prevState.subDisplay + '=' + result,
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