import React from 'react';

/**
 * A simple wrapper for the block editor blocks
 */
interface BlockEditorWrapperProps {
	children?: JSX.Element[];
	className?: string;
}
export const BlockEditorWrapper = (props: BlockEditorWrapperProps) => (
	<div
		className={['block-editor-wrapper', props.className].join(' ')}
	>
		{props.children}
	</div>
);

/**
 * A block wrapper
 */
interface BlockProps {
	children?: JSX.Element;
	className?: string;
	dragHandle?: () => JSX.Element;
}
export const Block = (props: BlockProps) => {
	return (
		<div
			className={['block-editor-block', props.className].join(' ')}
		>
			{props.dragHandle && (
				<props.dragHandle />
			)}
			{props.children}
		</div>
	);
};
