import { Shape } from '../shapes/shape.ts';
import { Coords } from '../../../types/common.ts';

type ContainerProps = {
	coords: Coords;
	shapes?: Shape[];
	parentContainer?: Container;
};

export class Container {
	shapes: Shape[];

	private readonly _coords: Coords;
	private readonly parentContainer: Container | null;

	constructor(props: ContainerProps) {
		this.shapes = props.shapes ?? [];
		this._coords = props.coords;
		this.parentContainer = props.parentContainer ?? null;
	}

	get coords(): Coords {
		if (this.parentContainer === null) {
			return this._coords;
		}

		return {
			x: this._coords.x + this.parentContainer.coords.x,
			y: this._coords.y + this.parentContainer.coords.y,
		};
	}

	setShapes = (shapes: Shape[]) => {
		shapes.forEach((shape) => {
			shape.setContainer(this);
		});

		this.shapes = shapes;
	};
}
