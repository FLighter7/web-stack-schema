import {Element} from '../../../utils';

/**
 * Sidebar close button
 */
export class BtnClose {
	/**
	 * @param {import('../index').Sidebar} sidebar
	 */
	constructor(sidebar) {
		this._sidebar = sidebar;
		this._el = Element.getById('close');

		if (!this._el || !sidebar) {
			return;
		}

		this._setEvent();
	}

	_setEvent() {
		this._el.onclick = this._close.bind(this);// on btn click
		document.body.onclick = this._close.bind(this);// on empty space click
		this._sidebar.el.onclick = (e) => e.stopPropagation();// prevent on body close on sidebar click
	}

	_close() {
		this._sidebar.close();
	}
}
