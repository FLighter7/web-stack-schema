const get = id => document.getElementById(id);

/**
 * Creates an SVG element with the given attributes
 * @param {string} tag
 * @param {any} attrs
 * 
 * @return {SVGSVGElement}
 */
export function createElement(tag, attrs)
{
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    attrs && Object.keys(attrs).forEach(key => element.setAttribute(key, attrs[key]));
    return element;
}

export const svg         = get('svg');
export const layout      = createElement('g', {class: 'layout'});
export const layoutLines = createElement('g');
export const layoutData  = createElement('g');
export const sidebar     = get('sidebar');
export const close       = get('close');
export const loader      = get('loader');
export const content     = get('content');
export const centerX     = Math.round(svg.clientWidth  / 2);// center of the area X
export const centerY     = Math.round(svg.clientHeight / 2);// center of the area Y
export const transition  = 0.5;// from css (fade-in/fade-out animation of the loader and content)
