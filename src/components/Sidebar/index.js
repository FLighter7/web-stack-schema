import {marked} from 'marked';
import {Element} from '../../utils';
import {BtnClose} from './BtnClose';

/**
 * Sidebar
 */
export class Sidebar {
	constructor() {
		this._el = Element.getById('sidebar');
		this._loader = Element.getById('loader');
		this._content = Element.getById('content');

		if (!this._el || !this._loader || !this._content) {
			return;
		}

		new BtnClose(this);
		this._currentId = null;
		this._transition = 0.5 * 1000;// from css (fade-in/fade-out animation of the loader and content)

		// Add transition for sidebar
		this._el.classList.add('sidebar_animated');
	}

	open() {
		if (this._el.classList.contains('sidebar_hidden')) {
			this._el.classList.remove('sidebar_hidden');
		}
	}

	close() {
		if (!this._el.classList.contains('sidebar_hidden')) {
			this._el.classList.add('sidebar_hidden');
		}
	}

	/**
	 * Updates sidebar info from server
	 *
	 * @param {string} id
	 */
	render(id) {
		this.open();

		// Prevent loading previously loaded content
		if (this._currentId === id) {
			return;
		}

		this._currentId = id;

		// On the first click there are no content in the sidebar
		// But then content exists, so hide it and show loader
		if (this._content.innerHTML) {
			this._content.classList.add('sidebar__content_hidden');
			this._loader.classList.remove('sidebar__loader_hidden');
			// Make the request after animation
			setTimeout(this._updateFromServer.bind(this), this._transition);
		} else {
			// Make the request immediately
			this._updateFromServer();
		}
	}

	get el() {
		return this._el;
	}

	/**
	 * Fetch markdown file by id and set it to content
	 */
	async _updateFromServer() {
		const res = await fetch(`data/${this._currentId}/README.md`);

		this._content.innerHTML = res.ok
			? marked(await res.text())
			: 'Не удалось загрузить ресурс. Пожалуйста, попробуйте ещё раз';

		// Open all links in a new tab
		const links = this._content.getElementsByTagName('a');

		for (const link of links) {
			link.target = '_blank';
			link.rel = 'nofollow noopener noreferrer';
		}

		this._loader.classList.add('sidebar__loader_hidden');
		this._content.classList.remove('sidebar__content_hidden');
	}
}
