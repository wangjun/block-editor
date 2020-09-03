import React, { useMemo } from 'react';
import update from 'immutability-helper';

import { IBlock } from './interfaces';
import * as util from './util';

export interface IBlockEditorContext {
	blocks?: IBlock[];
	reorder: (startIndex: number, endIndex: number) => void;
	setEditBlock: (id: string, editing: boolean) => void;
	saveBlock: (id: string, data: any) => void;
}

export const BlockEditorContext = React.createContext<any>({});

export interface BlockEditorProviderProps {
	children: React.ReactNode;
	blocks?: IBlock[];
	onReorder?: (blocks: IBlock[], startIndex: number, endIndex: number) => void;
	onSaveBlock?: (updatedBloacks: IBlock[], savedBlock: IBlock, index: number, data: any) => void;
	onEditingBlock?: (updatedBlocks: IBlock[], block: IBlock, index: number) => void;
}
export const BlockEditorProvider = (props: BlockEditorProviderProps) => {
	const blocks = useMemo(() => {
		return props.blocks || [];
	}, [props.blocks]);

	// Handles reordering the blocks (drag-n-dropped)
	const reorder = (startIndex: number, endIndex: number) => {
		const orderedBlocks = util.reorder(blocks, startIndex, endIndex);
		props.onReorder && props.onReorder(orderedBlocks, startIndex, endIndex);
	};

	// Helper to find a block by ID
	const findBlock = (id: string) => {
		const block = blocks.filter((b) => `${b.id}` === id)[0];

		return {
			block: { ...block }, // make sure it's a copy in case someone set's it in React
			index: blocks.indexOf(block),
		};
	};

	// Set the block to edit
	const setEditBlock = (id: string, editing: boolean) => {
		const { block, index } = findBlock(id);
		block.editing = editing;

		const updatedBlocks = update(blocks, {
			$splice: [
				[index, 1, block],
			],
		});

		if (props.onEditingBlock) props.onEditingBlock(updatedBlocks, block, index);
	};

	// Save block
	const saveBlock = (id: string, data: any) => {
		const { block, index } = findBlock(id);
		block.data = data;
		block.editing = false;
		console.log(block);

		const updatedBlocks = update(blocks, {
			[index]: {
				$set: block
			}
		});

		if (props.onSaveBlock) props.onSaveBlock(updatedBlocks, block, index, data);
	};

	return (
		<BlockEditorContext.Provider value={{
			blocks,
			reorder,
			setEditBlock,
			saveBlock
		}}>
			{props.children}
		</BlockEditorContext.Provider>
	);
};
