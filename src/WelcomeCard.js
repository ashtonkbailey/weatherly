import React, { Component } from 'react';

import cityList from './largest1000cities';

export default class WelcomeCard extends Component {
	constructor() {
		super();

		this.state = {
			recentSearches: [],
			value: ''
		}
		this.changeValue = this.changeValue.bind(this);
		this.enterValue = this.enterValue.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	changeValue(event) {
		console.log(event.target.value)
		event.preventDefault();
		this.setState( { value: event.target.value } )
		this.suggestCities(event.target.value)
	}

	enterValue(event) {
		event.preventDefault()
		this.setState( { value: event.target.value } )
		this.props.parseUserEntry(this.state.value);
	}

	suggestCities(event) {
		this.setState({recentSearches: this.props.newTrie.suggest(event)})
	}

	render() {
		const firstTenCities = cityList.cityList.slice(0, 10)

		return (
			<div className='welcome'>
				{
					localStorage.length === 0 && <h1 className='welcome-msg'>welcome, to the weather.</h1>
				}
				{
					localStorage.length >= 1 && <h1 className='welcome-msg2'>i know why you're here. you're looking for the weather.</h1>
				}
				<section className='user-tools'>
					<h2 className='welcome-title'>i know weather</h2>
					<form className='search-form' onSubmit={ this.handleSubmit }>
						<input 
							className='user-input'
							list='searches'
							type='text' 
							placeholder='enter a city/state or zip code'
							onKeyUp={ this.changeValue }
						/>
						<datalist id='searches'>
							{
								this.state.recentSearches.map( (search, i) => {
									return (
										<option
											onClick={ this.enterValue} 
											key={i} 
											value={search}
											>
												{search}
										</option> 
									)
								}).slice(0, 10)		
							}
						</datalist>
						<br />
						<button 
							className='submit-btn'
							onClick={ this.enterValue }>show me.
						</button>
					</form>
					<section>
						<button className='your-location-btn'>see your weather</button>
						<label 
							for="recents"
							className='recents-label'
						>recent places:</label>
						<select 
							className='welcome-recents'
							id='recents'
						>
							{
								firstTenCities.map( (city, i) => {
									return (
										<option value={city} key={i} >{city}</option>
									)
								})
							}
						</select>
					</section>
				</section>
			</div>
		);
	}
}

