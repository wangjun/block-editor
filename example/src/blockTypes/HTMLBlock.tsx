import React, { useState } from 'react';
import { IBlock } from '@pinpt/block-editor/dist/interfaces';
import { useBlockEditor, Block } from '@pinpt/block-editor';

// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-react';
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-inline';

import { DragHandle } from '../components/ui';

interface HTMLBlockProps extends IBlock {
	data: string;
	index: number;
}
export default (props: HTMLBlockProps) => {
	const { setEditBlock, saveBlock } = useBlockEditor();
	const [value, setValue] = useState(props.data);

	// Handle editing
	const setEditing = () => {
		setEditBlock(props.id, true);
	};

	const onCancel = () => {
		setEditBlock(props.id, false);
	};

	const onChange = (_event: any, editor: any) => {
		setValue(editor.getData());
	};

	const onSave = () => {
		saveBlock(props.id, value);
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
					<div>
							<CKEditor
								editor={ClassicEditor}
								data={props.data}
								onChange={onChange}
							/>

							<div className="flex">
								<button
									className="text-gray-700 rounded px-3 bg-gray-200 border border-gray-500 shadow mr-5"
									onClick={onCancel}
								>
									Cancel
								</button>
								<button
									className="text-blue-100 rounded px-3 bg-blue-500 border border-blue-700 shadow"
									onClick={onSave}
								>
									Save
									</button>
							</div>
						</div>
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
