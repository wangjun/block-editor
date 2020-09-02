import React from 'react';
import { IBlock } from '@pinpt/block-editor/dist/interfaces';

interface SimpleBlockProps extends IBlock {
	data: string;
}
export default (props: SimpleBlockProps) => {
	return (
		<div>
			{props.data}
		</div>
	);
};
