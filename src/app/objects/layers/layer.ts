import { Container } from '../groups/container.ts';
import { Canvas } from '../../canvas.ts';
import { EventHandler } from '../../events/eventHandler.ts';

type LayerProps = {
	rootNodeId: string;
	container: Container;
};

export class Layer {
	private container: Container;
	readonly canvas: Canvas;
	eventHandler: EventHandler;

	constructor(props: LayerProps) {
		this.container = props.container;
		this.canvas = new Canvas(props.rootNodeId);
		this.eventHandler = new EventHandler({ canvas: this.canvas });
	}

	render = () => {
		requestAnimationFrame(() => {
			this.canvas.ctx.reset();

			this.container.shapes.forEach((shape) => {
				shape.draw(this);
			});
		});
	};
}
