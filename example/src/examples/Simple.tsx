import React from 'react';
import BlockEditor, {
	useBlockEditor, BlockEditorWrapper, Block
} from '@pinpt/block-editor';
import { IBlock } from '@pinpt/block-editor/dist/interfaces';

import SimpleBlock from '../blockTypes/SimpleBlock';
import HTMLBlock from '../blockTypes/HTMLBlock';
import { DragHandle } from '../components/ui';

// Data from somewhere...
const dataPayload: IBlock[] = [
	{
		id: 'abc',
		data: 'Hello world!',
		type: 'text',
	},
	{
		id: 'def',
		data: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus velit error voluptatum obcaecati accusantium incidunt consequatur debitis aliquid quae, corporis iusto voluptatem, suscipit voluptatibus distinctio asperiores, magni blanditiis facilis. Explicabo.</p>',
		type: 'html',
	},
	{
		id: 'ghi',
		data: '<p>👋 Hi! This is a <strong>test</strong> message</p>',
		type: 'html'
	}
];

export const SimpleExample = () => {
	return (
		<>
			<BlockEditor.Provider
				blocks={dataPayload}
				onReorder={(blocks, start, end) => console.log('onReorder', blocks, start, end)}
			>
				<Presentation />
			</BlockEditor.Provider>
		</>
	);
};

const Presentation = () => {
	const { blocks, reorder } = useBlockEditor();

	const dragEnd = (source: number, destination?: number) => {
		if (destination !== undefined) {
			reorder(source, destination);
		}
	};

	return (
		<div>
			<h2 className="mb-5 border-b border-gray-200 text-2xl font-semibold">Simple Example</h2>

			<BlockEditorWrapper onDragEnd={dragEnd}>
				{blocks?.map((block, index) => (
					<Block
						className="editor-block flex items-center p-2 rounded border border-transparent hover:border-gray-300"
						dragHandle={(<DragHandle />)}
						key={block.id}
						block={block}
						index={index}
					>
						{block.type === 'html' ? (
							<HTMLBlock {...block} />
						) : (
							<SimpleBlock {...block} />
						)}
					</Block>
				))}
			</BlockEditorWrapper>
		</div>
	);
};
