import React from 'react';

import { IBlock } from './interfaces';

export interface IBlockEditorContext {
	blocks?: IBlock[];
}

export const BlockEditorContext = React.createContext<IBlockEditorContext>({});

export interface BlockEditorProviderProps {
	value: IBlockEditorContext;
	children: React.ReactNode;
}
export const BlockEditorProvider = (props: BlockEditorProviderProps) => {
	return (
		<BlockEditorContext.Provider value={{
			blocks: props.value.blocks
		}}>
			{props.children}
		</BlockEditorContext.Provider>
	);
};
