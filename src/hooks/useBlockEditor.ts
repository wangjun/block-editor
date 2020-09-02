import { useContext } from 'react';
import { IBlockEditorContext, BlockEditorContext } from '../BlockEditorContext';

export interface BlockEditorProps {}
export default () => {
	const context = useContext(BlockEditorContext);

	if (BlockEditorContext === undefined) {
		throw new Error('useBlockEditor must be used within a BlockEditor.Provider');
	}

	return context as IBlockEditorContext;
};
