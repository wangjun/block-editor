import React from 'react';
import { IBlock } from '@pinpt/block-editor/dist/interfaces';

interface HTMLBlockProps extends IBlock {
	data: string;
}
export default (props: HTMLBlockProps) => {
	return (
		<div
			dangerouslySetInnerHTML={{
				__html: props.data
			}}
		/>
	);
};
