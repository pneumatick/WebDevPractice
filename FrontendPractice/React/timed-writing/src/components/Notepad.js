import React from 'react';

class Notepad extends React.Component {
    render() {
        return (
            <textarea disabled={this.props.disabled} placeholder="Start writing..." onChange={this.props.onChange} />
        );
    }
}

export default Notepad;