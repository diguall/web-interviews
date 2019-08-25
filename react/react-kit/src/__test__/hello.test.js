import React from 'react';
import renderer from 'react-test-renderer';
import HelloComponent from '../hello'

test('hello', () => {
    const component = renderer.create(
        <HelloComponent></HelloComponent>
    )
    let tree = component.toJSON();

    expect(typeof tree.props.onClick).toBe('function');
});