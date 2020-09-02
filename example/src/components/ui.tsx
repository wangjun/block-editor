import React from 'react';

// Misc. UI things for the demo site

export const DragHandle = () => {
	return (
		<div className="block-handle cursor-move w-3 h-3 mr-3 flex-none">
			<svg className="text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
				<path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
			</svg>
		</div>
	);
};
