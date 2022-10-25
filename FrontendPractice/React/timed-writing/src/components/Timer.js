import React from 'react';

class Timer extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.onClick}>
                    {this.props.started ? "Finish" : "Start"}
                </button>
            </div>
        );
    }
}

export default Timer;