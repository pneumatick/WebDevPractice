import React from 'react';
import TimerHeader from './TimerHeader';
import Timer from './Timer';

const DEFAULT_TIME = 300;   // Unit: seconds

class TimerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            time: DEFAULT_TIME,
            active: false,
            interval: null
         };
    }

    componentDidUpdate() {
        if (!this.props.disabled && !this.state.active) {
            let interval = setInterval(() => {
                this.setState({ time: this.state.time - 1 });
            }, 1000);
            this.setState({ 
                active: true, 
                interval: interval 
            });
        }
        else if ((this.props.disabled && this.state.active) || this.state.time <= 0) {
            clearInterval(this.state.interval);
            this.setState({ 
                time: DEFAULT_TIME, 
                active: false 
            });
            this.props.toggleWriting();
            this.props.presentOutcome();
        }
    }

    render() {
        return (
            <div>
                <TimerHeader writeTime={this.state.time} />
                <Timer onClick={this.props.toggleWriting} />
            </div>
        );
    }
}

export default TimerContainer;