import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './hello'
import World from './world'

import ThemeContext from './context'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: 'red'
        }

        console.log('[App] constructor')
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[App] getDerivedStateFromProps state:');
        console.log(state);

        return state;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[App] shouldComponentUpdate nextState:')
        console.log(nextState);
        return true
    }

    render() {
        console.log('[App] render')
        return (
            <div>
                <ThemeContext.Provider value="dark">
                    <Hello color={this.state.color} />
                    <World />
                </ThemeContext.Provider>
            </div>
        )
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[App] getSnapshotBeforeUpdate prevState:')
        console.log(prevState);
        return null
    }

    componentDidMount() {
        console.log('[App] componentDidMount')
        setTimeout(() => {
            console.log('[App] timeout')

            this.setState({
                color: 'blue'
            })
        }, 1000)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[App] componentDidUpdate prevState:')
        console.log(prevState);
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("main")
)