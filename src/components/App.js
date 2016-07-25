import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class App extends React.Component {
    render() {
        return (
            <div className="homePage">
                <h1>Ombud Technical Test</h1>
                <div>{this.props.children}</div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;