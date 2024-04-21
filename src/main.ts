import { Container } from './app/objects/groups/container.ts';
import { Polygon } from './app/objects/shapes/polygon.ts';
import { Rect } from './app/objects/shapes/rect.ts';
import { UserEvent } from './constants/event.ts';
import { Layer } from './app/objects/layers/layer.ts';

const polygon = new Polygon({
	color: 'black',
	coords: {
		x: 100,
		y: 120,
	},
	points: [
		{ x: 10, y: 10 },
		{ x: 125, y: 10 },
		{ x: 60, y: 125 },
		{ x: 15, y: 120 },
		{ x: -26, y: 80 },
	],
});

const polygon2 = new Polygon({
	color: 'tomato',
	coords: {
		x: 500,
		y: 80,
	},
	points: [
		{ x: 10, y: 10 },
		{ x: 125, y: 10 },
		{ x: 60, y: 125 },
		{ x: 15, y: 120 },
		{ x: -26, y: 80 },
	],
});

const rect = new Rect({ color: 'tomato', coords: { x: 40, y: 10 }, size: { width: 50, height: 8 } });

const container = new Container({
	coords: {
		x: 0,
		y: 0,
	},
});

container.setShapes([polygon, polygon2, rect]);

const layer = new Layer({
	container: container,
	rootNodeId: 'app',
});

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

layer.render();
