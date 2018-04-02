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
                    subDisplay = button;
                } else {
                    subDisplay = subDisplay + button;
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
                            result = eval(this.state.subDisplay);
                        } else {
                            result = 'Error';
                        }
                        this.setState(() => ({
                            subDisplay: result + button,
                            mainDisplay: result
                        }));
                    }

                    catch(e) {
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
                    this.setState((prevState) => ({
                        evaluateOperation: false,
                        subDisplay: -eval(prevState.subDisplay)
                    }));
                }
    
                catch(e) {
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
            const result = eval(this.state.subDisplay);
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
                                onClick={()=> {this.handleOnOff()}}>
                                ON/OFF
                            </div>
                            <div className='red-button button'
                                onClick={() => {this.state.isOn && this.handleClear('all')}}>
                                AC
                            </div>
                            <div className='red-button button'
                                onClick={() => {this.state.isOn && this.handleClear()}}>
                                CE
                            </div>
                            <div className='grey-button button'
                                onClick={() => {this.state.isOn && this.handleOperationPress('+')}}>
                                &#43;{/* &plus; not working? */}
                            </div>
                        </div>
                        <div className='button-row'>
                            <div className='grey-button button'
                                onClick={() => {this.state.isOn && this.handleNumberPress('7')}}>
                                7
                            </div>
                            <div className='grey-button button'
                                onClick={() => {this.state.isOn && this.handleNumberPress('8')}}>
                                8
                            </div>
                            <div className='grey-button button'
                                onClick={() => {this.state.isOn && this.handleNumberPress('9')}}>
                                9
                            </div>
                            <div className='grey-button button'
                                onClick={() => {this.state.isOn && this.handleOperationPress('-')}}>
                                &minus;
                            </div>
                        </div>
                        <div className='button-row'>
                            <div className='grey-button button'
                                onClick={() => {this.state.isOn && this.handleNumberPress('4')}}>
                                4
                            </div>
                            <div className='grey-button button'
                                onClick={() => {this.state.isOn && this.handleNumberPress('5')}}>
                                5
                            </div>
                            <div className='grey-button button'
                                onClick={() => {this.state.isOn && this.handleNumberPress('6')}}>
                                6
                            </div>
                            <div className='grey-button button'
                                onClick={() => {this.state.isOn && this.handleOperationPress('*')}}>
                                &times;
                            </div>
                        </div>
                        <div className='button-row'>
                            <div className='grey-button button'
                                onClick={() => {this.state.isOn && this.handleNumberPress('1')}}>
                                1
                            </div>
                            <div className='grey-button button'
                                onClick={() => {this.state.isOn && this.handleNumberPress('2')}}>
                                2
                            </div>
                            <div className='grey-button button'
                                onClick={() => {this.state.isOn && this.handleNumberPress('3')}}>
                                3
                            </div>
                            <div className='grey-button button'
                                onClick={() => {this.state.isOn && this.handleOperationPress('/')}}>
                                &divide;
                            </div>
                        </div>
                        <div className='button-row'>
                            <div className='grey-button button'
                                onClick={() => {this.state.isOn && this.handleNumberPress('0')}}>
                                0
                            </div>
                            <div className='grey-button button'
                                onClick={() => {this.state.isOn && this.handleNumberPress('.')}}>
                                .
                            </div>
                            <div className='grey-button button'
                                onClick={() => {this.state.isOn && this.handleEqualsPress('=')}}>
                                =
                            </div>
                            <div className='grey-button button'
                                onClick={() => {this.state.isOn && this.handlePlusMinus('pm')}}>
                                &plusmn;
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}