import React from 'react';
import { IBlock } from '@pinpt/block-editor/dist/interfaces';
import { useBlockEditor, Block } from '@pinpt/block-editor';
import EdiText from 'react-editext';

import { DragHandle } from '../components/ui';

interface SimpleBlockProps extends IBlock {
	data: string;
	index: number;
}
export default (props: SimpleBlockProps) => {
	const { setEditBlock } = useBlockEditor();

	// Handle editing
	const onEditBlock = (block: IBlock) => {
		setEditBlock(block.id);
	};

	const onSave = (value: string) => {
		console.log(value);
	};

	const onCancel = (value: string) => {
		console.log(value);
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
					<EdiText
						type='text'
						value={props.data}
						onSave={onSave}
						onCancel={onCancel}
						editOnViewClick
						editing
					/>
				)}

				{/* Read mode */}
				{!props.editing && (
					<>
						{props.data}
					</>
				)}
			</>
		</Block>
	);
};
