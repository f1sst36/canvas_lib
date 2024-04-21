import { Container } from './app/objects/groups/container.ts';
import { Rect } from './app/objects/shapes/rect.ts';
import { UserEvent } from './constants/event.ts';
import { Layer } from './app/objects/layers/layer.ts';

const container = new Container({
	coords: {
		x: 0,
		y: 0,
	},
});

const layer = new Layer({
	container: container,
	rootNodeId: 'app',
});

const rects: Rect[] = [];

let start = performance.now();

for (let i = 0; i < 500; i++) {
	const randomX = Math.random() * window.innerWidth;
	const randomY = Math.random() * window.innerHeight;

	const rect = new Rect({ color: 'tomato', coords: { x: randomX, y: randomY }, size: { width: 50, height: 8 } });

	rects.push(rect);

	layer.eventHandler.addEventListener(rect, UserEvent.mouseenter, () => {
		rect.color = 'green';

		layer.render();
	});

	layer.eventHandler.addEventListener(rect, UserEvent.mouseleave, () => {
		rect.color = 'tomato';

		layer.render();
	});

	layer.eventHandler.addEventListener(rect, UserEvent.click, () => {
		console.log('click rect');
	});
}

container.setShapes(rects);

layer.render();

console.log('performance', performance.now() - start);
