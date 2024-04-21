import { Shape, ShapeProps } from './shape.ts';
import { Point } from '../../../types/common.ts';

type PolygonProps = {
	points: Point[];
};

export class Polygon extends Shape {
	private points: Point[] = [];

	constructor(props: ShapeProps & PolygonProps) {
		super(props);

		this.points = props.points;
	}

	get relativePoints() {
		return this.points.map(this.transformToRelativePoint);
	}

	protected drawShape(ctx: CanvasRenderingContext2D): void {
		if (!this.relativePoints.length) {
			return;
		}

		ctx.beginPath();

		this.relativePoints.forEach((point) => {
			ctx.lineTo(point.x, point.y);
		});

		ctx.closePath();
		ctx.stroke();
	}
}
