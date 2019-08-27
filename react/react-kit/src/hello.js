import React from 'react';
import ThemeContext from './context'

class Hello extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hname: "world",
            count: 0
        }
        this.handleClick = this.handleClick.bind(this);
        console.log('[Hello] constructor')
    }

    handleClick() {
        console.log('[Hello] click')
        const count = this.state.count
        this.setState({
            hname: count + 1 + "",
            count: count + 1
        })
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[Hello] getDerivedStateFromProps state:');
        console.log(state);

        return state;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Hello] shouldComponentUpdate nextState:')
        console.log(nextState);
        return true
    }

    render() {
        console.log('[Hello] render');

        return (<div onClick={this.handleClick}>GOGOGO {this.state.hname} color:{this.props.color} theme:{this.context}</div>)
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Hello] getSnapshotBeforeUpdate prevState:')
        console.log(prevState);
        return null
    }

    componentDidMount() {
        console.log('[Hello] componentDidMount')
        // setTimeout(() => {
        //     console.log('[Hello] timeout')

        //     this.setState({
        //         hname: 'setTimeout'
        //     })
        // }, 1000)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Hello] componentDidUpdate prevState:')
        console.log(prevState);
    }

    componentWillUnmount() {
        console.log('[Hello] componentWillUnmount')
    }
}

Hello.contextType = ThemeContext;

export default Hello;