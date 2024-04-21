export const getColorKeyByPixel = (pixel: Uint8ClampedArray) => {
	return `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
};

export const getRandomColorKey = () => {
	const r = Math.round(Math.random() * 255);
	const g = Math.round(Math.random() * 255);
	const b = Math.round(Math.random() * 255);

	return getColorKeyByPixel(new Uint8ClampedArray([r, g, b]));
};
