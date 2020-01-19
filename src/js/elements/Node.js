import {createElement} from '../store/store';

/**
 * One node (circle + text)
 */
export default class Node
{
    /**
     * @typedef {Center}
     * @property {number} x
     * @property {number} y
     * 
     * @typedef {Data}
     * @property {string}  id
     * @property {string}  text
     * @property {number}  x
     * @property {number}  y
     * @property {number}  [scale]
     * @property {boolean} [isGroup]
     * @property {Data[]}  [children]
     * 
     * @param {Center} center
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
    )
    {
        isGroup  === undefined && (isGroup  = false);

        x = center.x + x;
        y = center.y + y;

        const defaultRadius = 20;
        const radius = defaultRadius * (scale || 1),
              group  = this.createGroup(id, isGroup),
              circle = this.createCircle({x, y, radius}),
              text   = this.createText({x, y, string});
        group.appendChild(circle);
        group.appendChild(text);
        return {node: group, radius};
    }

    /**
     * Creates group element
     * @param {string}  id
     * @param {boolean} isGroup
     * 
     * @return {SVGSVGElement}
     */
    createGroup(id, isGroup)
    {
        return createElement('g',
        {
            'data-id': id,
            class: `node${isGroup ? '' : ' animated'}`,
        });
    }

    /**
     * @typedef {O}
     * @property {number} x
     * @property {number} y
     * @property {number} scale
     * 
     * @param {O} arg
     * 
     * @return {SVGSVGElement}
     */
    createCircle({x, y, radius})
    {
        return createElement('circle',
        {
            class:  'circle',
            cx:     x,
            cy:     y,
            r:      radius,
        });
    }

    /**
     * @typedef {O}
     * @property {number} x
     * @property {number} y
     * @property {string} string
     * 
     * @param {O} arg
     * 
     * @return {SVGSVGElement}
     */
    createText({x, y, string})
    {
        const oneLetterWidth = 6.5,
              fontHeight     = 10,
              text           = createElement('text',
              {
                class:  'text',
                x:      x - (oneLetterWidth * string.length / 2),
                y:      y + (fontHeight / 2),
              });
        text.textContent = string;
        return text;
    }
}
