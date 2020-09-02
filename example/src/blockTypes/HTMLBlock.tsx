import React from 'react';
import { IBlock } from '@pinpt/block-editor/dist/interfaces';
import { useBlockEditor, Block } from '@pinpt/block-editor';

import { DragHandle } from '../components/ui';

interface HTMLBlockProps extends IBlock {
	data: string;
	index: number;
}
export default (props: HTMLBlockProps) => {
	const { setEditBlock } = useBlockEditor();

	// Handle editing
	const onEditBlock = (block: IBlock) => {
		setEditBlock(block.id);
	};

	return (
		<Block
			className="flex items-center p-2 rounded border border-transparent hover:border-gray-300"
			dragHandle={(<DragHandle />)}
			key={props.id}
			block={props}
			index={props.index}
			onEdit={onEditBlock}
		>
			<>
				{/* Show the editor interface for this block */}
				{props.editing && (
					<>Editor goes here!</>
				)}

				{/* Read mode */}
				{!props.editing && (
					<div
						dangerouslySetInnerHTML={{
							__html: props.data
						}}
					/>
				)}
			</>
		</Block>
	);
};
