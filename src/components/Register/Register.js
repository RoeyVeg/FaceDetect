import React from 'react';

// no state management is needed, so I can creae a pure function


class Register extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			mail: '',
			password: '',
			name: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({mail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}

	onSubmissionSignIn = () => {
		fetch('http://localhost:3000/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.mail,
				password: this.state.password,
				name: this.state.name
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user) {
				this.props.loadUser(user); // update the user profile
				this.props.onRouteChange('home');
			}
		})
	}

	render () {
	return (
		<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f2 fw6 ph0 mh0">Register</legend>
			      <div className="mt3 ma4">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        		onChange={this.onNameChange}
			        		type="text" 
			        		name="name"  
			        		id="name"/>
			      </div>
			      <div className="mt3 ma4">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        		onChange={this.onEmailChange}
			        		type="email" 
			        		name="email-address"  
			        		id="email-address"/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        		onChange={this.onPasswordChange}
			        		type="password" 
			        		name="password"  
			        		id="password"/>
			      </div>
			      
			    </fieldset>
			    <div className="">
			      <input 
			      	onClick = {this.onSubmissionSignIn}
			      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      	type="submit" 
			      	value="register"/>
			    </div>
			  </div>
			</main>
		</article>

		)
	}
}

export default Register;