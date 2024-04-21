import { DEFAULT_LINE_WIDTH } from '../../../constants/shape.ts';
import { Container } from '../groups/container.ts';
import { Coords, Point } from '../../../types/common.ts';
import { Layer } from '../layers/layer.ts';

export type ShapeProps = {
	coords: Coords;
	color: string;
	container?: Container;
	lineWidth?: number;
};

export abstract class Shape {
	private _coords: Coords;
	color: string;

	private container: Container | null;
	private readonly lineWidth: number;

	constructor(props: ShapeProps) {
		this._coords = props.coords;
		this.color = props.color;
		this.lineWidth = props.lineWidth ?? DEFAULT_LINE_WIDTH;
		this.container = props.container || null;
	}

	protected abstract drawShape(ctx: CanvasRenderingContext2D): void;

	protected get coords() {
		return {
			x: this._coords.x + (this.container?.coords.x ?? 0),
			y: this._coords.y + (this.container?.coords.y ?? 0),
		};
	}

	// Преобразует абсолютную точку в относительную(либо контейнера, либо канваса)
	protected transformToRelativePoint = (point: Point): Point => {
		return { x: point.x + this.coords.x, y: point.y + this.coords.y };
	};

	setContainer = (container: Container) => {
		this.container = container;
	};

	draw = (layer: Layer) => {
		// нужно сбрасывать контекст отрисовки для каждой фигуры
		layer.canvas.ctx.lineWidth = this.lineWidth;
		layer.canvas.ctx.strokeStyle = this.color;
		layer.canvas.ctx.fillStyle = this.color;

		this.drawShape(layer.canvas.ctx);

		// TODO - разделить логику отрисовки основного холста и хит графа
		// надо установить цвет отрисовки соответствующий фигуре
		const colorKey = layer.eventHandler.hitGraph.colorKeyByShape.get(this) ?? '';

		layer.eventHandler.hitGraph.ctx.fillStyle = colorKey;
		layer.eventHandler.hitGraph.ctx.strokeStyle = colorKey;

		this.drawShape(layer.eventHandler.hitGraph.ctx);

		// eventHandler.hitGraph.ctx.fill();
	};
}
