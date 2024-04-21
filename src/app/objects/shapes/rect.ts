import { Shape, ShapeProps } from './shape.ts';
import { Size as SizeType } from '../../../types/common.ts';
import { Size } from '../../common/size.ts';

type RectProps = {
	size: SizeType;
};

export class Rect extends Shape {
	private size: Size;

	constructor(props: ShapeProps & RectProps) {
		super(props);

		this.size = new Size({ size: props.size });
	}

	protected drawShape(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.rect(this.coords.x, this.coords.y, this.size.width, this.size.height);
		ctx.fill();
	}
}
