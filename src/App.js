import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 0,
			displayWarning: 0
		};
		this.decrement = this.decrement.bind(this);
		this.increment = this.increment.bind(this);
	}

	decrement = () => {
		if (this.state.counter === 0) {
			this.setState({
				displayWarning: 1
			});
		} else {
			this.setState({
				counter: this.state.counter - 1
			});
		}
	};

	increment = () => {
		if (this.state.counter === 0) {
			this.setState({
				displayWarning: 0,
				counter: this.state.counter + 1
			});
		} else {
			this.setState({
				...this.state,
				counter: this.state.counter + 1
			});
		}
	};

	render() {
		return (
			<div data-test='component-app'>
				<h1 data-test='counter-display'>
					The counter is: {this.state.counter}
				</h1>
				<button
					onClick={this.increment}
					// onClick={() => this.setState({ counter: this.state.counter + 1 })}
					data-test='increment-button'>
					Add to counter
				</button>
				<button data-test='decrement-button' onClick={this.decrement}>
					Decrement
				</button>
				{this.state.displayWarning === 1 ? (
					<h1 data-test='counter-warning-message'>Cannot go below 0</h1>
				) : null}
			</div>
		);
	}
}

export default App;
