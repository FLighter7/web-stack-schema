/**
 * Helper class
 */
export class Element {
	/**
	 * Sets attributes for a new element
	 *
	 * @param {Element} el
	 * @param {Record<string, string | number>} attrs
	 * @returns {Element}
	 */
	static _setAttributes(el, attrs) {
		if (attrs) {
			Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
		}

		return el;
	}

	/**
	 * Creates a new html element with attributes
	 *
	 * @param {string} tag
	 * @param {Record<string, string | number>} attrs
	 * @returns {HTMLElement}
	 */
	static create(tag, attrs) {
		const el = document.createElement(tag);
		return Element._setAttributes(el, attrs);
	}

	/**
	 * Creates a new svg element with attributes
	 *
	 * @param {string} tag
	 * @param {Record<string, string | number>} attrs
	 * @returns {SVGElement}
	 */
	static createSvg(tag, attrs) {
		const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
		return Element._setAttributes(el, attrs);
	}

	/**
	 * Finds element by id
	 *
	 * @param {string} id
	 * @returns {HTMLElement}
	 */
	static getById(id) {
		return document.getElementById(id);
	}
}
