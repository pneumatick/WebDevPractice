import React from 'react';

class Timer extends React.Component {
    render() {
        let time = this.props.writeTime;
        return (
            <div>
                <p>{time} Second{time !== 1 ? "s" : ""}</p>
                <button onClick={this.props.onClick}>
                    {this.props.started ? "Finish" : "Start"}
                </button>
            </div>
        );
    }
}

export default Timer;