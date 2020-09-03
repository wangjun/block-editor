import React from 'react';
import { IBlock } from '@pinpt/block-editor/dist/interfaces';
import { useBlockEditor, Block } from '@pinpt/block-editor';
// @ts-ignore
import ReactFilestack from 'filestack-react';

import { DragHandle } from '../components/ui';

const filestackApiKey = 'AP3pfeG3Qyq5XW1GItRYjz'; // Will need to generate your own

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

	const onSave = (result: any) => {
		if (result.filesUploaded && result.filesUploaded.length > 0) {
			saveBlock(props.id, result.filesUploaded[0].url);
		}
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
					<ReactFilestack
						apikey={filestackApiKey}
						onSuccess={onSave}
						componentDisplayMode={{
							type: 'button',
							customText: 'Click here to open choose an image',
							customClass: 'some-custom-class'
						}}
						customRender={(options: any) => (
							<div>
								<img src={props.data} alt="" />
								<button className="text-sm mr-10" onClick={options.onPick}><strong>Choose an image</strong></button>
								<button
									className="text-sm text-gray-700 rounded px-2 bg-gray-200 border border-gray-500 shadow"
									onClick={onCancel}
								>
									Cancel
								</button>
							</div>
						)}
						source={props.data}
					/>
				)}

				{/* Read mode */}
				{!props.editing && (
					<img className="w-full h-auto rounded shadow-lg" src={props.data} alt="" />
				)}
			</>
		</Block>
	);
};
