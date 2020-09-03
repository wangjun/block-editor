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
	const { setEditBlock, saveBlock } = useBlockEditor();

	// Handle editing
	const setEditing = () => {
		setEditBlock(props.id, true);
	};

	const onSave = (value: string) => {
		saveBlock(props.id, value);
	};

	const onCancel = () => {
		setEditBlock(props.id, false);
	};

	return (
		<Block
			className="flex items-center p-2 rounded border border-transparent hover:border-gray-300"
			dragHandle={(<DragHandle />)}
			key={props.id}
			block={props}
			index={props.index}
			setEditing={setEditing}
		>
			<>
				{/* Show the editor interface for this block */}
				{props.editing && (
					<EdiText
						type='text'
						value={props.data}
						onSave={onSave}
						onCancel={onCancel}
						editing
						cancelOnEscape
						cancelOnUnfocus
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
