import React, { useMemo } from 'react';
import update from 'immutability-helper';

import { IBlock } from './interfaces';
import * as util from './util';

export interface IBlockEditorContext {
	blocks?: IBlock[];
	reorder: (startIndex: number, endIndex: number) => void;
	setEditBlock: (id: string, editing: boolean) => void;
	saveBlock: (id: string, data: any) => void;
	deleteBlock: (id: string) => void;
	addBlock: (id: string, atIndex: number) => Promise<IBlock>;
}

export const BlockEditorContext = React.createContext<any>({});

export interface BlockEditorProviderProps {
	children: React.ReactNode;
	blocks: IBlock[];
	requestCreateBlock?: (index: number) => Promise<IBlock>;
	onReorder?: (blocks: IBlock[], startIndex: number, endIndex: number) => void;
	onSaveBlock?: (updatedBloacks: IBlock[], savedBlock: IBlock, index: number, data: any) => void;
	onEditingBlock?: (updatedBlocks: IBlock[], block: IBlock, index: number) => void;
	onDeleteBlock?: (updatedBlocks: IBlock[], block: IBlock, index: number) => void;
	onAddBlock?: (updatedBlocks: IBlock[], block: IBlock, index: number) => void;
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
		const block = blocks.find((b) => `${b.id}` === id);

		return {
			block: block && { ...block }, // make sure it's a copy in case someone set's it in React
			index: block && blocks.indexOf(block),
		};
	};

	// Set the block to edit
	const setEditBlock = (id: string, editing: boolean) => {
		const { block, index } = findBlock(id);
		if (!block || index === undefined) return;

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
		if (!block || index === undefined) return;

		block.data = data;
		block.editing = false;

		const updatedBlocks = update(blocks, {
			[index]: {
				$set: block
			}
		});

		if (props.onSaveBlock) props.onSaveBlock(updatedBlocks, block, index, data);
	};

	// Handle deleting a block
	const deleteBlock = (id: string) => {
		const { block, index } = findBlock(id);
		if (!block || index === undefined) return;

		const updatedBlocks = update(blocks, {
			$splice: [
				[index, 1],
			],
		});

		if (props.onDeleteBlock) props.onDeleteBlock(updatedBlocks, block, index);
	};

	// Handle adding a block
	const addBlock = async (id: string, atIndex: number) => {
		try {
			const { index } = findBlock(id);
			if (index === undefined) return;

			const block = await props.requestCreateBlock?.(index);
			if (block) {
				block.editing = true;

				const updatedBlocks = update(blocks, {
					$splice: [
						[index + 1, 0],
						[atIndex + 1, 0, block],
					],
				});

				if (props.onAddBlock) props.onAddBlock(updatedBlocks, block, index);
			}
		} catch (err) {
			throw new Error(err);
		}
	};

	return (
		<BlockEditorContext.Provider value={{
			blocks,
			reorder,
			setEditBlock,
			saveBlock,
			deleteBlock,
			addBlock
		}}>
			{props.children}
		</BlockEditorContext.Provider>
	);
};
