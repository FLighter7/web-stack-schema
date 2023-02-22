import {Element} from '../../utils';

/**
 * @typedef {object} Point
 * @prop {number} x
 * @prop {number} y
 * @prop {number} [r]
 */

/**
 * @typedef {object} Data
 * @prop {string} id
 * @prop {string} text
 * @prop {number} x
 * @prop {number} y
 * @prop {number} [scale]
 * @prop {boolean} [isGroup]
 * @prop {Options[]} [children]
 */

/**
 * Node (circle + text)
 */
export class Node {
	/**
	 * @param {Point} center
	 * @param {Data} data
	 */
	constructor(
		center,
		{
			id,
			text: string,
			x,
			y,
			scale,
			isGroup,
		},
	) {
		isGroup  === undefined && (isGroup  = false);

		x = center.x + x;
		y = center.y + y;

		const defaultRadius = 20;
		const radius = defaultRadius * (scale || 1);
		const group = this.createGroup(id, isGroup);
		const circle = this.createCircle(id, {x, y, radius});
		const text = this.createText({x, y, string});

		group.appendChild(circle);
		group.appendChild(text);

		this._node = group;
		this._radius = radius;
	}

	get el() {
		return this._node;
	}

	get radius() {
		return this._radius;
	}

	/**
	 * Creates group element
	 *
	 * @param {string}  id
	 * @param {boolean} isGroup
	 * @return {SVGElement}
	 */
	createGroup(id, isGroup)
	{
		return Element.createSvg('g', {
			'data-id': id,
			class: `node${isGroup ? '' : ' node_animated'}`,
		});
	}

	/**
	 * @typedef {object} O
	 * @prop {number} x
	 * @prop {number} y
	 * @prop {number} radius
	 *
	 * @param {string} id
	 * @param {O}
	 * @return {SVGElement}
	 */
	createCircle(id, {x, y, radius})
	{
		return Element.createSvg('circle', {
			class: `node__circle node__circle_${id.split('/')[1]}`,
			cx: x,
			cy: y,
			r: radius,
		});
	}

	/**
	 * @typedef {object} O
	 * @prop {number} x
	 * @prop {number} y
	 * @prop {string} string
	 *
	 * @param {O}
	 * @return {SVGElement}
	 */
	createText({x, y, string})
	{
		const oneLetterWidth = 6.5;
		const fontHeight = 10;
		const el = Element.createSvg('text', {
			class: 'node__text',
			x: x - (oneLetterWidth * string.length / 2),
			y: y + (fontHeight / 2),
		});
		el.textContent = string;

		return el;
	}
}
