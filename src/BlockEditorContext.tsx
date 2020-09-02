import React, { useState } from 'react';
import update from 'immutability-helper';

import { IBlock } from './interfaces';
import * as util from './util';

export interface IBlockEditorContext {
	blocks?: IBlock[];
	reorder: (startIndex: number, endIndex: number) => void;
	setEditBlock: (id: string) => void;
}

export const BlockEditorContext = React.createContext<any>({});

export interface BlockEditorProviderProps {
	children: React.ReactNode;
	blocks?: IBlock[];
	onReorder?: (blocks: IBlock[], startIndex: number, endIndex: number) => void;
	onEditBlock?: (block: IBlock, index: number) => void;
}
export const BlockEditorProvider = (props: BlockEditorProviderProps) => {
	const [blocks, setBlocks] = useState(props.blocks || []);

	// Handles reordering the blocks (drag-n-dropped)
	const reorder = (startIndex: number, endIndex: number) => {
		const orderedBlocks = util.reorder(blocks, startIndex, endIndex);
		setBlocks(orderedBlocks);

		props.onReorder && props.onReorder(orderedBlocks, startIndex, endIndex);
	};

	const findBlock = (id: string) => {
		const block = blocks.filter((b) => `${b.id}` === id)[0];

		return {
			block,
			index: blocks.indexOf(block),
		};
	};

	const setEditBlock = (id: string) => {
		const { block, index } = findBlock(id);
		block.editing = true;

		setBlocks(
			update(blocks, {
				$splice: [
					[index, 1, block],
				],
			}),
		);

		if (props.onEditBlock) props.onEditBlock(block, index);
	};

	return (
		<BlockEditorContext.Provider value={{
			blocks,
			reorder,
			setEditBlock
		}}>
			{props.children}
		</BlockEditorContext.Provider>
	);
};
