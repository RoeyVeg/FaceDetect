import React from 'react';
import './FaceRecognition.css'

// no state management is needed, so I can creae a pure function

const FaceRecognition = ({ box, imageUrl }) => {

	return (
		<div className = 'center ma'>
			<div className = 'absolute mt2'>
				<img id={'inputImage'} alt={'image'} src={imageUrl} width="500px" height="auto"/>
				<div className='bounding-box' style={{top: box.top, right: box.right, bottom: box.bottom, left: box.right}}></div>
			</div>
		</div>
		)
}

export default FaceRecognition;
