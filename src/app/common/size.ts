import { Size as SizeType } from '../../types/common.ts';

type SizeProps = {
	size: SizeType;
};

export class Size {
	private size: SizeType;

	constructor(props: SizeProps) {
		this.size = props.size;
	}

	get width() {
		return this.size.width;
	}

	get height() {
		return this.size.height;
	}
}
