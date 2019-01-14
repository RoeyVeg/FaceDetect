import React from 'react';

// no state management is needed, so I can creae a pure function

const Navigation = ({onRouteChange, isSignedIn}) => {

	if (isSignedIn) {
		return (
			<nav style={{display: 'flex' , justifyContent: 'flex-end'}}>
				<p 
				onClick = {() => onRouteChange('signIn')}
				className='f3 link dim black underline pa3 pointer' >Sign Out</p>
			</nav>
		);
	} else {
		return (
			<nav style={{display: 'flex' , justifyContent: 'flex-end'}}>
				<p 
				onClick = {() => onRouteChange('signIn')}
				className='f3 link dim black underline pa3 pointer' >Sign In</p>
				<p 
				onClick = {() => onRouteChange('register')}
				className='f3 link dim black underline pa3 pointer' >Register</p>
			</nav>
		);
	}
	
}

export default Navigation;
