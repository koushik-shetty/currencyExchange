import React, { Component } from 'react';
import ReactDOM from 'react-dom';

console.log("ehllo woeksldfj")
let Elet = (props) => <div>This is good {props.one} enough</div>
class Rdr extends Component {
    render() {
        return (
            <div>
                this is awesone: {this.props.one}
            </div>
        );
    }
}

ReactDOM.render(<Rdr one="yay!!" />, document.getElementById('root'));