export class Canvas {
	ctx: CanvasRenderingContext2D;
	node: HTMLCanvasElement;

	constructor(rootNodeId: string) {
		const rootNode = document.getElementById(rootNodeId);
		this.node = document.createElement('canvas');

		if (rootNode === null) {
			throw new Error('Cannot find root node');
		}

		this.node.width = window.innerWidth;
		this.node.height = window.innerHeight;

		rootNode.append(this.node);

		const ctx = this.node.getContext('2d');

		if (ctx === null) {
			throw new Error('Context is null');
		}

		this.ctx = ctx;
	}
}
