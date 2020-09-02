import React, { useState } from 'react';

import { IBlock } from './interfaces';
import * as util from './util';

export interface IBlockEditorContext {
	blocks?: IBlock[];
	reorder: (startIndex: number, endIndex: number) => void;
}

export const BlockEditorContext = React.createContext<any>({});

export interface BlockEditorProviderProps {
	children: React.ReactNode;
	blocks?: IBlock[];
	onReorder?: (blocks: IBlock[], startIndex: number, endIndex: number) => void;
}
export const BlockEditorProvider = (props: BlockEditorProviderProps) => {
	const [blocks, setBlocks] = useState(props.blocks || []);

	const reorder = (startIndex: number, endIndex: number) => {
		const orderedBlocks = util.reorder(blocks, startIndex, endIndex);
		setBlocks(orderedBlocks);

		props.onReorder && props.onReorder(orderedBlocks, startIndex, endIndex);
	};

	return (
		<BlockEditorContext.Provider value={{
			blocks: blocks,
			reorder
		}}>
			{props.children}
		</BlockEditorContext.Provider>
	);
};
