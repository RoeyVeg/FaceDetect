import React from 'react';


// no state management is needed, so I can creae a pure function

const Rank = ({name, enteries}) => {

	return (
		<div>
			<div className='white f3'>
				{`${name} your current enteries count is :`}
			</div>
			<div className='white f1'>
				{enteries}
			</div>
		</div>
		)
}

export default Rank;