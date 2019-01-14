import React from 'react';
import './ImageLinkForm.css'


// no state management is needed, so I can creae a pure function

const ImageLinkForm = ({ onInputChange, onImageSubmit}) => {

	return (
		<div >
			<p className='f3'>{'Try the face recognition app, press the button below'}</p>
			<div className="center">
				<div className="form center pa4 br3 shadow-5">
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
					<button className='w-30 grow f4 link ph3 dib white bg-light-purple tc' onClick={onImageSubmit}>Detect</button>
				</div>
			</div>
		</div>
		)
}

export default ImageLinkForm;