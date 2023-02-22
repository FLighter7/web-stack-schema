import {Element} from '../../utils';

/**
 * @typedef {object} Point
 * @prop {number} x
 * @prop {number} y
 * @prop {number} [r]
 */

/**
 * @typedef {object} Constructor
 * @prop {string} colorType
 * @prop {Point} center
 * @prop {Point} pointA
 * @prop {Point} pointB
 */

/**
 * Arrow line between nodes
 */
export class Line {
	/**
	 * @param {Constructor}
	 */
	constructor({colorType, center, pointA, pointB}) {
		const {start, end} = this._getPoints(pointA, pointB);

		this._line = Element.createSvg('line', {
			class: `line line_${colorType}`,
			'marker-end': `url(#arrow-${colorType})`,
			x1: center.x + start.x,
			y1: center.y + start.y,
			x2: center.x + end.x,
			y2: center.y + end.y,
		});
	}

	get el() {
		return this._line;
	}

	/**
	 * Finds the start and end points of a line
	 *
	 * @param {Point} pointA
	 * @param {Point} pointB
	 * @returns {{start: Point; end: Point}}
	 */
	_getPoints(pointA, pointB) {
		const {x: x1, y: y1, r: r1} = pointA;
		const {x: x2, y: y2, r: r2} = pointB;
		const diffX = x2 - x1;
		const diffY = y2 - y1;

		// 90 & 270
		if (!diffX) {
			return {
				start: {x: x1, y: y1 + (diffY > 0 ? r1 : -r1)},
				end: {x: x2, y: y2 + (diffY > 0 ? -r2 : r2)},
			}
		}

		// 0 & 180
		if (!diffY) {
			return {
				start: {y: y1, x: x1 + (diffX > 0 ? r1 : -r1)},
				end: {y: y2, x: x2 + (diffX > 0 ? -r2 : r2)},
			}
		}

		// Other angles
		const {b: angle} = this._getAngles(Math.abs(diffX), Math.abs(diffY));

		return {
			start: this._findPointThroughSector({x1, y1, x2, y2, r: r1, angle}),
			end: this._findPointThroughSector({
				x1: x2,
				y1: y2,
				x2: x1,
				y2: y1,
				r: r2,
				angle,
			}),
		}
	}

	/**
	 * Finds angles of a triangle
	 *
	 * @param {number} a
	 * @param {number} b
	 * @returns {{a: number; b: number; c: number}}
	 */
	_getAngles(a, b)
	{
		const c = Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2) );// hypotenuse

		return {
			a: 180 * Math.acos( (b * b + c * c - a * a) / (2 * b * c) ) / Math.PI,
			b: 180 * Math.acos( (a * a + c * c - b * b) / (2 * a * c) ) / Math.PI,
			c: 180 * Math.acos( (a * a + b * b - c * c) / (2 * a * b) ) / Math.PI,
		};
	}

	_findPointThroughSector({x1, y1, x2, y2, angle, r}) {
		// Try to get points
		let x = 0;

		if(x2 > x1) {
			// Right
			x = x1 + r;
			angle = y2 < y1 ? -angle : angle;// top (0-90) | bottom (270-360)
		} else {
			// Left
			x = x1 - r;
			angle = y2 < y1 ? angle : -angle;// top (90-180) | bottom (180-270)
		}

		return this._findPoint({
			center: {x: x1, y: y1},// center of the circle
			point: {x: x, y: y1},// some point on the circle
			angle,
		});
	}

	/**
	 * Gets coordinates of the point on the arc
	 *
	 * @param {{center: Point; point: Point; angle: number}}
	 * @return {Point}
	 */
	_findPoint({center, point, angle}) {
		const angleRad = angle * Math.PI / 180;
		const rx = point.x - center.x;
		const ry = point.y - center.y;
		const cos = Math.cos(angleRad);
		const sin = Math.sin(angleRad);
		const x = center.x + rx * cos - ry * sin;
		const y = center.y + rx * sin + ry * cos;

		return {x, y};
	}
}
