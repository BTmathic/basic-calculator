import React from 'react';

export default class Calculator extends React.Component {
  state = {
    isOn: false,
    mainDisplay: 0,
    subDisplay: 0,
    // we want to evaluate operations as soon as possible to reduce
    // the chance of digit overflow being input
    evaluateOperation: false,
    // we also re-render the subDisplay on any keypress after
    // completing an evaluation
    evaluationComplete: false
  }

  handleOnOff = () => {
    this.setState((prevState) => ({
      isOn: !prevState.isOn,
      mainDisplay: 0,
      subDisplay: 0,
      evaluateOperation: false
    }));
  }

  handleNumberPress = (button) => {
    if (this.state.mainDisplay !== 'Error') {
      // If the user just completed a computation then pressing a number
      // should ignore the previous calculation and start from scratch
      if (this.state.evaluationComplete) {
        this.setState(() => ({
          subDisplay: button,
          evaluationComplete: false
        }));
      } else {
        let subDisplay = this.state.subDisplay;
        if (subDisplay === 0) {
          if (button !== '0') {
            subDisplay = button;
          }
        } else {
          subDisplay = (subDisplay + button).slice(0, 21);
        }
        this.setState(() => ({ subDisplay }));
      }
    }
  }

  handleOperationPress = (button) => {
    if (this.state.mainDisplay !== 'Error') {
      // If the user presses an operation button after doing a computation
      // the operator is acting upon the previous result
      if (this.state.evaluationComplete) {
        this.setState((prevState) => ({
          evaluationComplete: false,
          subDisplay: prevState.mainDisplay + button
        }));
      } else {
        if (this.state.evaluateOperation) {
          try {
            let result = undefined;
            // we get an error for almost all incorrect sequences of
            // button presses, but ** in javascript is exponent and
            // // will comment out everything thereafter, so we must
            // manually force an error in these cases
            if (this.state.subDisplay.indexOf('**') === -1 && this.state.subDisplay.indexOf('//') === -1) {
              result = eval(this.state.subDisplay).toString().slice(0, 9);
              result = this.testOverflow(result);

            } else {
              result = 'Error';
            }
            this.setState(() => ({
              subDisplay: result + button,
              mainDisplay: result
            }));
          }

          catch (e) {
            this.setState((prevState) => ({
              mainDisplay: 'Error',
              subDisplay: prevState.subDisplay + button
            }));
          }
        } else {
          this.setState((prevState) => ({
            subDisplay: prevState.subDisplay + button,
            evaluateOperation: true
          }));
        }
      }
    }
  }

  handlePlusMinus = () => {
    if (this.state.mainDisplay !== 'Error') {
      if (this.state.evaluationComplete) {
        this.setState((prevState) => ({
          subDisplay: -prevState.mainDisplay,
          evaluationComplete: false
        }));
      } else if (this.state.subDisplay !== 0) {
        try {
          const currentOp = this.state.subDisplay;
          if (currentOp[currentOp.length - 1] !== '.' &&
            currentOp[currentOp.length - 1] !== '+' &&
            currentOp[currentOp.length - 1] !== '-' &&
            currentOp[currentOp.length - 1] !== '*' &&
            currentOp[currentOp.length - 1] !== '/') {

            this.setState((prevState) => ({
              evaluateOperation: false,
              subDisplay: -eval(prevState.subDisplay)
            }));
          }
        }

        catch (e) {
          this.setState(() => ({
            mainDisplay: 'Error',
            subDisplay: 0
          }));
        }
      }
    }
  }

  handleEqualsPress = () => {
    try {
      let inputReduced = false;
      let subDisplay = this.state.subDisplay;
      const regex1 = RegExp('-0', 'g')
      while (!inputReduced) {
        if (regex1.test(subDisplay)) {
          console.log('dur');
          subDisplay = subDisplay.replace(/-0/, '-');
          //console.log(subDisplay.replace(/-0/, '-'));
        } else {
          inputReduced = true;
        }
      }
      let result = eval(subDisplay).toString().slice(0, 9);
      result = this.testOverflow(result);
      this.setState(() => ({
        mainDisplay: result,
        evaluateOperation: false,
        evaluationComplete: true
      }));
    }

    catch (e) {
      this.setState(() => ({
        mainDisplay: 'Error',
        evaluateOperation: false,
        evaluationComplete: true
      }));
    }
  }

  testOverflow = (result) => {
    if (result > 99999999 || result < -9999999) {
      result = 'Overflow';
    } else if (result.indexOf('e') > -1) {
      result = 0;
    }

    return result;
  }

  handleClear = (type) => {
    this.setState(() => ({
      subDisplay: 0,
      evaluateOperation: false
    }));
    if (type === 'all' || this.state.mainDisplay === 'Error') {
      this.setState(() => ({ mainDisplay: 0 }));
    }
  }

  render() {
    return (
      <div>
        <div id='calculator'>
          <div id='logo'>
            Basic Calculator
                    </div>
          <div id='screen'>
            <div id='main-screen'>
              {this.state.isOn && this.state.mainDisplay}
            </div>
            <div id='sub-screen'>
              {this.state.isOn && this.state.subDisplay}
            </div>
          </div>
          <div id='buttons'>
            <div className='button-row'>
              <div className='black-button button'
                onClick={() => { this.handleOnOff() }}>
                <div id='on-off-button-text'>ON/OFF</div>
              </div>
              <div className='red-button button'
                onClick={() => { this.state.isOn && this.handleClear('all') }}>
                <div className='clear-button-text'>AC</div>
              </div>
              <div className='red-button button'
                onClick={() => { this.state.isOn && this.handleClear() }}>
                <div className='clear-button-text'>CE</div>
              </div>
              <div className='grey-button button'
                onClick={() => { this.state.isOn && this.handleOperationPress('+') }}>
                &#43;
              </div>
            </div>
            <div className='button-row'>
              <div className='grey-button button'
                onClick={() => { this.state.isOn && this.handleNumberPress('7') }}>
                7
                            </div>
              <div className='grey-button button'
                onClick={() => { this.state.isOn && this.handleNumberPress('8') }}>
                8
                            </div>
              <div className='grey-button button'
                onClick={() => { this.state.isOn && this.handleNumberPress('9') }}>
                9
                            </div>
              <div className='grey-button button'
                onClick={() => { this.state.isOn && this.handleOperationPress('-') }}>
                &minus;
                            </div>
            </div>
            <div className='button-row'>
              <div className='grey-button button'
                onClick={() => { this.state.isOn && this.handleNumberPress('4') }}>
                4
                            </div>
              <div className='grey-button button'
                onClick={() => { this.state.isOn && this.handleNumberPress('5') }}>
                5
                            </div>
              <div className='grey-button button'
                onClick={() => { this.state.isOn && this.handleNumberPress('6') }}>
                6
                            </div>
              <div className='grey-button button'
                onClick={() => { this.state.isOn && this.handleOperationPress('*') }}>
                &times;
                            </div>
            </div>
            <div className='button-row'>
              <div className='grey-button button'
                onClick={() => { this.state.isOn && this.handleNumberPress('1') }}>
                1
                            </div>
              <div className='grey-button button'
                onClick={() => { this.state.isOn && this.handleNumberPress('2') }}>
                2
                            </div>
              <div className='grey-button button'
                onClick={() => { this.state.isOn && this.handleNumberPress('3') }}>
                3
                            </div>
              <div className='grey-button button'
                onClick={() => { this.state.isOn && this.handleOperationPress('/') }}>
                &divide;
                            </div>
            </div>
            <div className='button-row'>
              <div className='grey-button button'
                onClick={() => { this.state.isOn && this.handleNumberPress('0') }}>
                0
                            </div>
              <div className='grey-button button'
                onClick={() => { this.state.isOn && this.handleNumberPress('.') }}>
                .
                            </div>
              <div className='grey-button button'
                onClick={() => { this.state.isOn && this.handleEqualsPress('=') }}>
                =
                            </div>
              <div className='grey-button button'
                onClick={() => { this.state.isOn && this.handlePlusMinus('pm') }}>
                &plusmn;
                            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}