import { UserEvent } from '../../constants/event.ts';
import { Point } from '../../types/common.ts';
import { EventHandler } from './eventHandler.ts';
import { Shape } from '../objects/shapes/shape.ts';

type EventEmittersProps = {
	eventHandler: EventHandler;
};

export class EventEmitters {
	private eventHandler: EventHandler;

	private mouseEnterShape: Shape | null;

	constructor(props: EventEmittersProps) {
		this.eventHandler = props.eventHandler;
		this.mouseEnterShape = null;
	}

	emitClickEvent = (point: Point) => {
		const callbackByShapeForEvent = this.eventHandler.eventsHandlers.get(UserEvent.click);

		if (!callbackByShapeForEvent) {
			return;
		}

		const shape = this.eventHandler.hitGraph.getShapeByPoint(point);

		if (!shape) {
			return;
		}

		const callback = callbackByShapeForEvent.get(shape);

		callback?.();
	};

	emitMouseEnterEvent = (point: Point) => {
		const callbackByShapeForEvent = this.eventHandler.eventsHandlers.get(UserEvent.mouseenter);

		if (!callbackByShapeForEvent) {
			return;
		}

		const shape = this.eventHandler.hitGraph.getShapeByPoint(point);

		if (!shape) {
			return;
		}

		if (this.mouseEnterShape === shape) {
			return;
		}

		const callback = callbackByShapeForEvent.get(shape);

		this.mouseEnterShape = shape;

		callback?.();
	};

	emitMouseLeaveEvent = (point: Point) => {
		const callbackByShapeForEvent = this.eventHandler.eventsHandlers.get(UserEvent.mouseleave);

		if (!callbackByShapeForEvent) {
			return;
		}

		const shape = this.eventHandler.hitGraph.getShapeByPoint(point);

		if (!shape || this.mouseEnterShape !== shape) {
			if (this.mouseEnterShape) {
				const callback = callbackByShapeForEvent.get(this.mouseEnterShape);

				callback?.();

				this.mouseEnterShape = null;
			}
		}
	};
}
