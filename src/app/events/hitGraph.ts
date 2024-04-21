import { Shape } from '../objects/shapes/shape.ts';
import { getColorKeyByPixel, getRandomColorKey } from '../../utils/color.ts';
import { Point } from '../../types/common.ts';

export class HitGraph {
	ctx: CanvasRenderingContext2D;
	private shapeByColorKey: Map<string, Shape>;

	constructor() {
		const hitCanvasNode = document.createElement('canvas');

		hitCanvasNode.width = window.innerWidth;
		hitCanvasNode.height = window.innerHeight;

		const hitCtx = hitCanvasNode.getContext('2d');

		if (hitCtx === null) {
			throw new Error('Context is null');
		}

		this.ctx = hitCtx;
		this.shapeByColorKey = new Map();
	}

	addShapeToHash = (shape: Shape) => {
		while (true) {
			const randomColor = getRandomColorKey();

			if (!this.shapeByColorKey.has(randomColor)) {
				this.shapeByColorKey.set(randomColor, shape);

				break;
			}
		}
	};

	getShapeByPoint = (point: Point) => {
		const pixel = this.ctx.getImageData(point.x, point.y, 1, 1).data;
		const colorKey = getColorKeyByPixel(pixel);

		return this.shapeByColorKey.get(colorKey);
	};

	get colorKeyByShape() {
		return new Map(Array.from(this.shapeByColorKey.entries()).map(([shape, colorKey]) => [colorKey, shape]));
	}
}
