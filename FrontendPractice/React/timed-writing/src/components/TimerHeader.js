import React from 'react';

class TimerHeader extends React.Component {
    render() {
        return (
            <div>
                <h1>Timed Writing</h1>
                <p>{this.props.writeTime} Seconds</p>
            </div>
        );
    }
}

export default TimerHeader;