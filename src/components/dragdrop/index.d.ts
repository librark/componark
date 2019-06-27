import { Component } from "../component";

export class DragDrop extends Component {
    static launch(context, parent?): DragDrop
    droppableEnter(draggable): void
    droppableLeave(): void
    droppableDrop(draggable): void
    generateDataTransfer(): void
    draggableStart(): void
    draggableEnd(): void
    draggableEnter(draggable, dataTransfer): void
    draggableLeave(): void
    draggableDrop(draggable)
}
