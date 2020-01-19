import {
    layoutLines,
    layoutData,
    centerX,
    centerY,
} from './store/store';
import Node from './elements/Node';
import Line from './elements/Line';

/**
 *  Draws layout with nodes
 * @param {Data} o // see buildData.js structure
 */
export default function draw(o)
{
    const prevX = o.x,
          prevY = o.y;
    // Create and add node
    const node  = new Node({x: centerX, y: centerY}, o),
          prevR = node.radius;
    layoutData.appendChild(node.node);
    // Walk on children
    if(o.children && o.children.length)
    {
        o.children.forEach(child =>
        {
            const childX = prevX + child.x,
                  childY = prevY + child.y,
                  childR = 20 * (child.scale || 1);
            draw({
                ...child,
                x: childX,
                y: childY,
            });
            // Create and add line
            layoutLines.appendChild( new Line(
                {x: centerX, y: centerY},
                {x: prevX,   y: prevY,  r: prevR}, // start point
                {x: childX,  y: childY, r: childR},// end point
            ) );
        });
    }
}
