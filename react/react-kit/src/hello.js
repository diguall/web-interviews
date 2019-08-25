import React from 'react';

class Hello extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hname: "world",
            count: 0
        }
        this.handleClick = this.handleClick.bind(this);
        console.log('constructor')
    }

    handleClick() {
        console.log('click')
        const count = this.state.count
        this.setState({
            hname: count + 1 + "",
            count: count + 1
        })
    }

    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps state:');
        console.log(state);

        return state;
    }

    render() {
        console.log('render');

        return (<div onClick={this.handleClick}>GOGOGO {this.state.hname}</div>)
    }

    componentDidMount() {
        console.log('componentDidMount')
        setTimeout(() => {
            this.setState({
                hname: 'setTimeout'
            })
        }, 1000)
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate nextState:')
        console.log(nextState);
        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate prevState:')
        console.log(prevState);
        return null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate prevState:')
        console.log(prevState);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }
}

export default Hello;