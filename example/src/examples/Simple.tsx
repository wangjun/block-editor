import React, { useState } from 'react';
import BlockEditor, {
	useBlockEditor, BlockEditorWrapper,
} from '@pinpt/block-editor';
import { IBlock } from '@pinpt/block-editor/dist/interfaces';

import SimpleBlock from '../blockTypes/SimpleBlock';
import HTMLBlock from '../blockTypes/HTMLBlock';
import ImageUpload from '../blockTypes/ImageUpload';
import { Trash, Plus } from '../components/ui';

export const SimpleExample = () => {
	// Data from somewhere...
	const [data, setData] = useState<IBlock[]>([
		{
			id: 'abc',
			data: 'Hello world!',
			type: 'text'
		},
		{
			id: 'ghi',
			data: '<p>👋 Hi! This is a <strong>test</strong> message</p>',
			type: 'html'
		},
		{
			id: 'def',
			data: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus velit error voluptatum obcaecati accusantium incidunt consequatur debitis aliquid quae, corporis iusto voluptatem, suscipit voluptatibus distinctio asperiores, magni blanditiis facilis. Explicabo.</p>',
			type: 'html'
		},
		{
			id: 'zhgf',
			data: 'https://images.unsplash.com/photo-1583174180572-aa521fbefccb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1494&q=80',
			type: 'image'
		},
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
				onDeleteBlock={(blocks, block, index) => {
					console.log('onDeleteBlock', block, index);
					setData(blocks);
				}}
				onAddBlock={(blocks, block, index) => {
					console.log('onAddBlock', block, index);
					setData(blocks);
				}}
				requestCreateBlock={async (index: number) => {
					console.log(`adding block at ${index + 1}`);

					return {
						id: `abc-${Math.random()}`,
						data: '',
						type: 'text'
					};
				}}
			>
				<Presentation />
			</BlockEditor.Provider>
		</>
	);
};

const Presentation = () => {
	const { blocks, reorder, deleteBlock, addBlock } = useBlockEditor();

	// So you can handle drag end event separately, before committing it to reorder
	const dragEnd = (source: number, destination?: number) => {
		if (destination !== undefined) {
			reorder(source, destination);
		}
	};

	// Block action items
	const onDelete = (id: string) => {
		deleteBlock(id);
	};

	const createBlock = (id: string, atIndex: number) => {
		addBlock(id, atIndex);
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
						case 'image':
							Component = ImageUpload;
							break;
						default:
							Component = SimpleBlock;
					}

					return (
						<div className="block-wrapper relative w-full" key={block.id}>
							<Component index={index} {...block} />

							{/* Example action items */}
							<div className="action-items ml-8">
								<button
									onClick={() => onDelete(block.id)}
									className="text-gray-700 rounded p-1 bg-gray-200 border border-gray-400 shadow mr-2"
								>
									<Trash />
								</button>
								<button
									onClick={() => createBlock(block.id, index)}
									className="text-blue-100 rounded p-1 bg-blue-500 border border-blue-600 shadow"
								>
									<Plus />
								</button>
							</div>
						</div>
					);
				})}
			</BlockEditorWrapper>
		</div>
	);
};
