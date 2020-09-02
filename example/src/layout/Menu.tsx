import React from 'react';
import { Link } from "react-router-dom";

export default () => {
	return (
		<>
			<h3 className="text-gray-500 font-bold text-sm">Demos</h3>
			<ul className="text-gray-700 text-base">
				<li>
					<Link to="/examples/simple">Simple Example</Link>
				</li>
			</ul>
		</>
	);
};
