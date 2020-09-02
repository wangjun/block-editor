import React from 'react';
import { DragDropContext, DropResult, Draggable, Droppable } from 'react-beautiful-dnd';
import { IBlock } from '../interfaces';

/**
 * A simple wrapper for the block editor blocks
 */
interface BlockEditorWrapperProps {
	children?: JSX.Element[];
	className?: string;
	droppableId?: string;
	onDragEnd?: (source: number, destination: number) => void;
}
export const BlockEditorWrapper = (props: BlockEditorWrapperProps) => {
	const dragEnd = (result: DropResult) => {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		props.onDragEnd && props.onDragEnd(result.source.index, result.destination.index);
	};

	return (
		<DragDropContext onDragEnd={dragEnd}>
			<Droppable droppableId={props.droppableId || 'block-editor'}>
				{provided => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className={['block-editor-wrapper', props.className].join(' ')}
					>
						{props.children}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

/**
 * A block wrapper
 */
interface BlockProps {
	children?: JSX.Element;
	className?: string;
	block: IBlock;
	index: number;
	dragHandle: JSX.Element;
}
export const Block = (props: BlockProps) => {
	return (
		<Draggable key={props.block.id} draggableId={props.block.id} index={props.index}>
			{(provided, snapshot) => (
				<div
					className={
						[
							'block-editor-block',
							snapshot.isDragging && 'is-dragging',
							snapshot.draggingOver && 'is-dragging-over',
							props.className
						].join(' ')
					}
				>
					<div {...provided.dragHandleProps}>
						{props.dragHandle}
					</div>
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
					>
						{props.children}
					</div>
				</div>
			)}
		</Draggable>
	);
};
