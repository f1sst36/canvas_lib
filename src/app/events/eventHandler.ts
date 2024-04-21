import { UserEvent, UserEvents } from '../../constants/event.ts';
import { AnyFunction } from '../../types/common.ts';
import { HitGraph } from './hitGraph.ts';
import { Shape } from '../objects/shapes/shape.ts';
import { EventEmitters } from './eventEmitters.ts';
import { Canvas } from '../canvas.ts';

type EventHandlerProps = {
	canvas: Canvas;
};

export class EventHandler {
	eventsHandlers: Map<UserEvent, Map<Shape, AnyFunction>>;
	hitGraph: HitGraph;
	eventEmitters: EventEmitters;

	constructor(props: EventHandlerProps) {
		this.hitGraph = new HitGraph();
		this.eventsHandlers = new Map(UserEvents.map((event) => [event, new Map()]));
		this.eventEmitters = new EventEmitters({ eventHandler: this });

		this.initEventListeners(props.canvas);
	}

	initEventListeners = (canvas: Canvas) => {
		canvas.node.addEventListener('click', (e) => {
			this.eventEmitters.emitClickEvent({ x: e.clientX, y: e.clientY });
		});

		canvas.node.addEventListener('mousemove', (e) => {
			this.eventEmitters.emitMouseLeaveEvent({ x: e.clientX, y: e.clientY });
			this.eventEmitters.emitMouseEnterEvent({ x: e.clientX, y: e.clientY });
		});
	};

	addEventListener = (shape: Shape, event: UserEvent, callback: AnyFunction) => {
		this.eventsHandlers.get(event)?.set(shape, callback);

		this.hitGraph.addShapeToHash(shape);
	};
}
