import {Element} from '../../utils';
import {Layout} from '../Layout';
import {Line} from '../Line';
import {Node} from '../Node';
import {Sidebar} from '../Sidebar';

/**
 * Svg root
 */
export class Svg {
	constructor() {
		this._svg = Element.getById('svg');
		this._svgLines = Element.createSvg('g');
		this._svgNodes = Element.createSvg('g');
		this._centerX = Math.round(this._svg.clientWidth / 2);// center of the area X
		this._centerY = Math.round(this._svg.clientHeight / 2);// center of the area Y

		this._sidebar = new Sidebar();

		// Choosed node
		this._currentNode = null;
	}

	/**
	 * Draw nodes and lines
	 */
	init(data) {
		data.forEach(this._draw.bind(this));
		return this;
	}

	/**
	 * Mount to DOM
	 */
	mount() {
		this._layoutEl = Element.createSvg('g', {class: 'layout'});

		this._layoutEl.appendChild(this._svgLines);
		this._layoutEl.appendChild(this._svgNodes);
		this._svg.appendChild(this._layoutEl);

		this._layout = new Layout(this._svg);

		this._layout.onNodeClick((node) => {
			const {id} = node.dataset;

			// Focus on node and remove old focus
			this._currentNode && this._currentNode.classList.remove('node_focused');
			node.classList.add('node_focused');
			this._currentNode = node;

			this._sidebar.render(id);
		});
	}

	/**
	 * Draws svg with nodes
	 * See build-data.js structure
	 */
	_draw(o) {
		const prevX = o.x;
		const prevY = o.y;
		const id = o.id.split('/')[1];

		// Create and add node
		const node  = new Node({x: this._centerX, y: this._centerY}, o);
		const prevR = node.radius;

		this._svgNodes.appendChild(node.el);

		// Walk on children
		if (o.children && o.children.length) {
			o.children.forEach((child) => {
				const childX = prevX + child.x;
				const childY = prevY + child.y;
				const childR = 20 * (child.scale || 1);

				this._draw({
						...child,
						x: childX,
						y: childY,
				});

				// Create and add line
				this._svgLines.appendChild( new Line({
					colorType: id,
					center: {x: this._centerX, y: this._centerY},
					pointA: {x: prevX, y: prevY, r: prevR},// start point
					pointB: {x: childX, y: childY, r: childR},// end point
				}).el );
			});
		}
	}
}
