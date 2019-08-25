import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './hello'

class App extends React.Component {
    constructor(props) {
        super(props)
        console.log('app constructor')
    }

    render() {
        console.log('app render')
        return (
            <div>
                <Hello />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("main")
)