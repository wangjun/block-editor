import React, { useState } from 'react';
import BlockEditor, {
	useBlockEditor, BlockEditorWrapper,
} from '@pinpt/block-editor';
import { IBlock } from '@pinpt/block-editor/dist/interfaces';

import SimpleBlock from '../blockTypes/SimpleBlock';
import HTMLBlock from '../blockTypes/HTMLBlock';

export const SimpleExample = () => {
	// Data from somewhere...
	const [data, setData] = useState<IBlock[]>([
		{
			id: 'abc',
			data: 'Hello world!',
			type: 'text'
		},
		{
			id: 'def',
			data: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus velit error voluptatum obcaecati accusantium incidunt consequatur debitis aliquid quae, corporis iusto voluptatem, suscipit voluptatibus distinctio asperiores, magni blanditiis facilis. Explicabo.</p>',
			type: 'html'
		},
		{
			id: 'ghi',
			data: '<p>👋 Hi! This is a <strong>test</strong> message</p>',
			type: 'html'
		}
	]);

	return (
		<>
			<BlockEditor.Provider
				blocks={data}
				onReorder={(blocks, start, end) => {
					console.log('onReorder', blocks, start, end);
					setData(blocks);
				}}
				onSaveBlock={(blocks, block, index, data) => {
					console.log('onSaveBlock', block, index, data);
					setData(blocks);
				}}
				onEditingBlock={(blocks, block, index) => {
					console.log('onEditingBlock', block, index);
					setData(blocks);
				}}
			>
				<Presentation />
			</BlockEditor.Provider>
		</>
	);
};

const Presentation = () => {
	const { blocks, reorder } = useBlockEditor();

	// So you can handle drag end event separately, before committing it to reorder
	const dragEnd = (source: number, destination?: number) => {
		if (destination !== undefined) {
			reorder(source, destination);
		}
	};

	return (
		<div>
			<h2 className="mb-5 border-b border-gray-200 text-2xl font-semibold">Simple Example</h2>

			<BlockEditorWrapper onDragEnd={dragEnd}>
				{blocks?.map((block, index) => {
					let Component;

					switch (block.type) {
						case 'html':
							Component = HTMLBlock;
							break;
						case 'text':
							Component = SimpleBlock;
							break;
						default:
							Component = SimpleBlock;
					}

					return (
						<Component index={index} key={block.id} {...block} />
					);
				})}
			</BlockEditorWrapper>
		</div>
	);
};
