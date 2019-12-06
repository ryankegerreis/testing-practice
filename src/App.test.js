import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

// Factory function to create shallow wrapper for the app component
// @function setup
// @param {object} props - Component props specific to this setup
// @param {any} state - Initial state for setup
// @returns {ShallowWrapper}
const setup = (props = {}, state = null) => {
	const wrapper = shallow(<App {...props} />);
	if (state) wrapper.setState(state);
	return wrapper;
};

/*
Return ShallowWrapper containing nodes with given data test value
@param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
@param {string} val - Value of data test attribute for search
@returns {ShallowWrapper}
*/

const findByTestAttr = (wrapper, val) => {
	return wrapper.find(`[data-test="${val}"]`);
};

test('renders without an error', () => {
	const wrapper = setup();
	const appComponent = findByTestAttr(wrapper, 'component-app');
	expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
	const wrapper = setup();
	const button = findByTestAttr(wrapper, 'increment-button');
	expect(button.length).toBe(1);
});

test('renders the display of the counter', () => {
	const wrapper = setup();
	const counterDisplay = findByTestAttr(wrapper, 'counter-display');
	expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
	const wrapper = setup();
	const initialCounterState = wrapper.state('counter');
	expect(initialCounterState).toBe(0);
});

test('clicking button increments the counter on display', () => {
	const counter = 7;
	const wrapper = setup(null, { counter });

	//Find button and click
	const button = findByTestAttr(wrapper, 'increment-button');
	button.simulate('click');

	//Find display and test value
	const counterDisplay = findByTestAttr(wrapper, 'counter-display');
	expect(counterDisplay.text()).toContain(counter + 1);
});

test('clicking button reduces the counter on display', () => {
	const counter = 0;
	const wrapper = setup(null, { counter });

	//Find button and click
	const button = findByTestAttr(wrapper, 'decrement-button');
	button.simulate('click');

	//Find display and test value
	const counterDisplay = findByTestAttr(wrapper, 'counter-display');
	if (counter === 0) {
		expect(counterDisplay.text()).toContain(0);
	} else {
		expect(counterDisplay.text()).toContain(counter - 1);
	}
});

test('clicking the button when at 0 will display an error message', () => {
	const counter = 0;
	const wrapper = setup(null, { counter });

	const button = findByTestAttr(wrapper, 'decrement-button');
	button.simulate('click');

	//Find button and click
	const counterWarningMessage = findByTestAttr(
		wrapper,
		'counter-warning-message'
	);

	if (counter === 0) {
		expect(counterWarningMessage.text()).toBe('Cannot go below 0');
	} else {
		expect(counterWarningMessage.exists()).toBeFalsy();
	}
});

test('clicking increment button after decrement button when counter is 0 will remove the warning message', () => {
	const counter = 0;
	const wrapper = setup(null, { counter });

	//Click decrement button
	const decrementButton = findByTestAttr(wrapper, 'decrement-button');
	decrementButton.simulate('click');

	//Click increment button
	const incrementButton = findByTestAttr(wrapper, 'increment-button');
	incrementButton.simulate('click');

	const counterWarningMessage = findByTestAttr(
		wrapper,
		'counter-warning-message'
	);

	expect(counterWarningMessage.exists()).toBeFalsy();
});
